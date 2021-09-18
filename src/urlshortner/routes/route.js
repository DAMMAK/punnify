"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const url_controller_1 = __importDefault(require("../controller/url.controller"));
function routes(app) {
    app.post("/", url_controller_1.default.createURL);
    app.get("/geturls", url_controller_1.default.getURLs);
    app.get("/:shortUrl", url_controller_1.default.getURL);
}
exports.default = routes;
