import { Schema, type, MapSchema } from "@colyseus/schema";


class TransformData extends Schema {
  @type("float32") rX: number = 0.0;
  @type("float32") rY: number = 0.0;
  @type("float32") rZ: number = 0.0;
  @type("float32") rW: number = 0.0;
  @type("float32") pX: number = 0.0;
  @type("float32") pY: number = 1.6;
  @type("float32") pZ: number = 0.0;
}

class TransformDataLeftHand extends Schema {
  @type("float32") pX: number = 0.0;
  @type("float32") pY: number = 0.0;
  @type("float32") pZ: number = 0.0;
}

class TransformDataRightHand extends Schema {
  @type("float32") pX: number = 0.0;
  @type("float32") pY: number = 0.0;
  @type("float32") pZ: number = 0.0;
}


export class Player extends Schema {
  @type(TransformData) transformData: TransformData = new TransformData()
  @type(TransformDataLeftHand) transformDataLeftHand: TransformDataLeftHand = new TransformDataLeftHand()
  @type(TransformDataRightHand) transformDataRightHand: TransformDataRightHand = new TransformDataRightHand()
  @type("string") sessionId: string = ""
  @type("string") name: string = "Player"
  @type("boolean") isVREnabled: boolean = false
}


export class MyRoomState extends Schema {

  @type("string") mySynchronizedProperty: string = "Hello world";
  @type({ map: Player }) players = new MapSchema<Player>();
}
