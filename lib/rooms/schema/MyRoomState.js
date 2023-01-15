"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MyRoomState = exports.Player = void 0;
const schema_1 = require("@colyseus/schema");
class TransformData extends schema_1.Schema {
    constructor() {
        super(...arguments);
        this.rX = 0.0;
        this.rY = 0.0;
        this.rZ = 0.0;
        this.rW = 0.0;
        this.pX = 0.0;
        this.pY = 1.6;
        this.pZ = 0.0;
    }
}
__decorate([
    (0, schema_1.type)("float32")
], TransformData.prototype, "rX", void 0);
__decorate([
    (0, schema_1.type)("float32")
], TransformData.prototype, "rY", void 0);
__decorate([
    (0, schema_1.type)("float32")
], TransformData.prototype, "rZ", void 0);
__decorate([
    (0, schema_1.type)("float32")
], TransformData.prototype, "rW", void 0);
__decorate([
    (0, schema_1.type)("float32")
], TransformData.prototype, "pX", void 0);
__decorate([
    (0, schema_1.type)("float32")
], TransformData.prototype, "pY", void 0);
__decorate([
    (0, schema_1.type)("float32")
], TransformData.prototype, "pZ", void 0);
class TransformDataLeftHand extends schema_1.Schema {
    constructor() {
        super(...arguments);
        this.pX = 0.0;
        this.pY = 0.0;
        this.pZ = 0.0;
    }
}
__decorate([
    (0, schema_1.type)("float32")
], TransformDataLeftHand.prototype, "pX", void 0);
__decorate([
    (0, schema_1.type)("float32")
], TransformDataLeftHand.prototype, "pY", void 0);
__decorate([
    (0, schema_1.type)("float32")
], TransformDataLeftHand.prototype, "pZ", void 0);
class TransformDataRightHand extends schema_1.Schema {
    constructor() {
        super(...arguments);
        this.pX = 0.0;
        this.pY = 0.60;
        this.pZ = 0.0;
    }
}
__decorate([
    (0, schema_1.type)("float32")
], TransformDataRightHand.prototype, "pX", void 0);
__decorate([
    (0, schema_1.type)("float32")
], TransformDataRightHand.prototype, "pY", void 0);
__decorate([
    (0, schema_1.type)("float32")
], TransformDataRightHand.prototype, "pZ", void 0);
class Player extends schema_1.Schema {
    constructor() {
        super(...arguments);
        this.transformData = new TransformData();
        this.transformDataLeftHand = new TransformDataLeftHand();
        this.transformDataRightHand = new TransformDataRightHand();
        this.sessionId = "";
        this.name = "Player";
    }
}
__decorate([
    (0, schema_1.type)(TransformData)
], Player.prototype, "transformData", void 0);
__decorate([
    (0, schema_1.type)(TransformDataLeftHand)
], Player.prototype, "transformDataLeftHand", void 0);
__decorate([
    (0, schema_1.type)(TransformDataRightHand)
], Player.prototype, "transformDataRightHand", void 0);
__decorate([
    (0, schema_1.type)("string")
], Player.prototype, "sessionId", void 0);
__decorate([
    (0, schema_1.type)("string")
], Player.prototype, "name", void 0);
exports.Player = Player;
class MyRoomState extends schema_1.Schema {
    constructor() {
        super(...arguments);
        this.mySynchronizedProperty = "Hello world";
        this.players = new schema_1.MapSchema();
    }
}
__decorate([
    (0, schema_1.type)("string")
], MyRoomState.prototype, "mySynchronizedProperty", void 0);
__decorate([
    (0, schema_1.type)({ map: Player })
], MyRoomState.prototype, "players", void 0);
exports.MyRoomState = MyRoomState;
