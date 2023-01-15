import { Connection, PublicKey, Signer, sendAndConfirmTransaction, Transaction, TransactionConfirmationStrategy, LAMPORTS_PER_SOL, TransactionInstruction, Keypair } from '@solana/web3.js';
import { createMintToCheckedInstruction, getOrCreateAssociatedTokenAccount } from '@solana/spl-token';

const mintAuthPubkey = new PublicKey('DYd5GLLQdaDF24kRKunz9B7e9n1fgCBMopP2kbY8jHV');
const mintAuthPrivkey = ''
const mintPubkey = new PublicKey('HLA3VCQe3JTtn23FLhRS7B12EkaVzAA27FbF96xJF4BY');
const mintPrivkey = ''
const connection = new Connection('https://api.devnet.solana.com', 'confirmed');

async function mintToken(score: number, receiver: PublicKey) {
    const auth_signer:Signer = { publicKey: mintAuthPubkey, secretKey: mintAuthPrivkey};
    const mint_signer:Signer = { publicKey: mintPubkey, secretKey: mintPrivkey};

    const tokenAccount = await getOrCreateAssociatedTokenAccount(connection, auth_signer, mintPubkey, receiver)
    let tx = new Transaction();
    tx.add(
      createMintToCheckedInstruction(
        mintPubkey,
        tokenAccount.address,
        mintAuthPubkey, // mint auth
        score, // amount
        9 // decimals
      )
    );

    console.log(`txhash: ${await sendAndConfirmTransaction(connection, tx, [auth_signer, mint_signer])}`);

  
}

const wallet = Keypair.generate();

mintToken(420, wallet.publicKey);