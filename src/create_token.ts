import { Connection, PublicKey, Signer, SystemProgram, Transaction, TransactionConfirmationStrategy, sendAndConfirmTransaction, LAMPORTS_PER_SOL, TransactionInstruction, Keypair } from '@solana/web3.js';
import { createInitializeMintInstruction, getOrCreateAssociatedTokenAccount, createMintToInstruction, TOKEN_PROGRAM_ID, MINT_SIZE } from '@solana/spl-token';
import { createCreateMetadataAccountInstruction, PROGRAM_ID} from '@metaplex-foundation/mpl-token-metadata';

const connection = new Connection('https://api.devnet.solana.com', 'confirmed');
const mint = Keypair.generate();
const mintAuthority = Keypair.generate();

async function createToken(tokenUri: string) {
    const airdrop_sig = await connection.requestAirdrop(mintAuthority.publicKey, 1*LAMPORTS_PER_SOL);

    console.log(airdrop_sig)

    const token_transaction = new Transaction();

    const createMintAccountInstruction = SystemProgram.createAccount({
        fromPubkey: mintAuthority.publicKey,
        newAccountPubkey: mint.publicKey,
        lamports: await connection.getMinimumBalanceForRentExemption(MINT_SIZE),
        space: MINT_SIZE,
        programId: TOKEN_PROGRAM_ID,
    });
    token_transaction.add(createMintAccountInstruction);

    const initializeMintInstruction = createInitializeMintInstruction(
        mint.publicKey,
        9,
        mintAuthority.publicKey,
        mintAuthority.publicKey,
    );
    token_transaction.add(initializeMintInstruction);

    const createMetadataInstruction = createCreateMetadataAccountInstruction(
        {
            metadata: PublicKey.findProgramAddressSync(
                [ Buffer.from('metadata'), PROGRAM_ID.toBuffer(), mint.publicKey.toBuffer() ],
                PROGRAM_ID,
            )[0],
            mint: mint.publicKey,
            mintAuthority: mintAuthority.publicKey,
            payer: mintAuthority.publicKey,
            updateAuthority: mintAuthority.publicKey,
        },
        {
            createMetadataAccountArgs: {
                data: {
                    creators: null,
                    name: 'SOULSYNC',
                    symbol: 'SNC',
                    uri: tokenUri,
                    sellerFeeBasisPoints: 0,
                },
                isMutable: true,
            }
        }
    );
    token_transaction.add(createMetadataInstruction);
    token_transaction.feePayer = mintAuthority.publicKey;

    console.log('Created transactions');
    
    const signer:Signer = { publicKey: mintAuthority.publicKey, secretKey: mintAuthority.secretKey};
    const mint_signer:Signer = { publicKey: mint.publicKey, secretKey: mint.secretKey};

    console.log(`Mint Authority Pubkey: ${mintAuthority.publicKey} Secretkey: ${mintAuthority.secretKey}`)
    console.log(`Mint Pubkey: ${mint.publicKey} Secretkey: ${mint.secretKey}`)

    const signature = await sendAndConfirmTransaction(connection, token_transaction, [signer, mint_signer])
    console.log(`Mint account created with the signature: ${signature}`)
}

createToken('https://i.imgur.com/meV9QeO.png')