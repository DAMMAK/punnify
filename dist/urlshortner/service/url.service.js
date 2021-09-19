"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dns_1 = __importDefault(require("dns"));
const url_1 = require("url");
class URLShortnerService {
    constructor() {
        this.checkIfUrlValid = (url) => {
            var newUrl = null;
            // if url does not contain protocol default it to http://
            if (url.substring(0, 3) !== "http")
                newUrl = `http://${url}`;
            var urlObj = new url_1.URL(newUrl !== null && newUrl !== void 0 ? newUrl : url);
            return new Promise((resolve) => {
                dns_1.default.lookup(urlObj.host, (error, address) => {
                    if (error) {
                        return resolve(false);
                    }
                    resolve(true);
                });
            });
        };
    }
}
exports.default = URLShortnerService;
//# sourceMappingURL=url.service.js.map