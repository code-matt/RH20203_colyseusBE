"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MyRoom = void 0;
const colyseus_1 = require("colyseus");
const MyRoomState_1 = require("./schema/MyRoomState");
class MyRoom extends colyseus_1.Room {
    onCreate(options) {
        this.setState(new MyRoomState_1.MyRoomState());
        this.onMessage("transform_update", (client, message) => {
            const player = this.state.players.get(client.sessionId);
            player.transformData.pX = message.pX;
            player.transformData.pY = message.pY;
            player.transformData.pZ = message.pZ;
            player.transformData.rX = message.rX;
            player.transformData.rY = message.rY;
            player.transformData.rZ = message.rZ;
            player.transformData.rW = message.rW;
        });
        this.onMessage("hand_update", (client, { hand, data: { pX, pY, pZ } }) => {
            const player = this.state.players.get(client.sessionId);
            let transformData;
            switch (hand) {
                case 'left':
                    transformData = player.transformDataLeftHand;
                    break;
                case 'right':
                    transformData = player.transformDataRightHand;
                    break;
                default:
                    break;
            }
            transformData.pX = pX;
            transformData.pY = pY;
            transformData.pZ = pZ;
        });
        this.onMessage("vr_enabled", (client, { vrEnabled }) => {
            const player = this.state.players.get(client.sessionId);
            player.isVREnabled = vrEnabled;
        });
    }
    onJoin(client, options) {
        console.log(client.sessionId, "joined!");
        const player = new MyRoomState_1.Player();
        player.sessionId = client.sessionId;
        this.state.players.set(client.sessionId, player);
    }
    onLeave(client, consented) {
        console.log(client.sessionId, "left!");
        const player = this.state.players.get(client.sessionId);
        this.state.players.delete(client.sessionId);
    }
    onDispose() {
        console.log("room", this.roomId, "disposing...");
    }
}
exports.MyRoom = MyRoom;
