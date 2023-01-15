import { Room, Client } from "colyseus";
import { MyRoomState, Player } from "./schema/MyRoomState";

export class MyRoom extends Room<MyRoomState> {

  onCreate (options: any) {
    this.setState(new MyRoomState())

    this.onMessage("transform_update", (client, message) => {
      const player = this.state.players.get(client.sessionId);
      player.transformData.pX = message.pX;
      player.transformData.pY = message.pY;
      player.transformData.pZ = message.pZ;
      player.transformData.rX = message.rX;
      player.transformData.rY = message.rY;
      player.transformData.rZ = message.rZ;
      player.transformData.rW = message.rW;
    })

    this.onMessage("hand_update", (client, { hand, data: { pX, pY, pZ } }) => {
      const player = this.state.players.get(client.sessionId);
      let transformData
      switch (hand) {
        case 'left':
          transformData = player.transformDataLeftHand
          break
        case 'right':
          transformData = player.transformDataRightHand
          break
        default:
          break
      }
      transformData.pX = pX;
      transformData.pY = pY;
      transformData.pZ = pZ;
    })
  }

  onJoin (client: Client, options: any) {
    console.log(client.sessionId, "joined!")
    const player = new Player()
    player.sessionId = client.sessionId
    this.state.players.set(client.sessionId, player)
  }

  onLeave (client: Client, consented: boolean) {
    console.log(client.sessionId, "left!")
    const player = this.state.players.get(client.sessionId)
    this.state.players.delete(client.sessionId)
  }

  onDispose() {
    console.log("room", this.roomId, "disposing...")
  }

}
