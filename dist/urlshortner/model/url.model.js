"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const nanoid_1 = require("nanoid");
const schema = new mongoose_1.default.Schema({
    fullUrl: {
        type: String,
        unique: true,
        required: true,
    },
    shortUrl: {
        type: String,
        required: true,
        unique: true,
        default: (0, nanoid_1.nanoid)(8),
    },
    visited: {
        type: Number,
        default: 0,
    },
});
exports.default = mongoose_1.default.model("urlData", schema);
//# sourceMappingURL=url.model.js.map