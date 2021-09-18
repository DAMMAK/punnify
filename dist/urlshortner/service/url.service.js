"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dns_1 = __importDefault(require("dns"));
class URLShortnerService {
    constructor() {
        this.checkIfUrlValid = (url) => {
            console.log(url);
            const options = {
                family: 6,
                hints: dns_1.default.ADDRCONFIG | dns_1.default.V4MAPPED,
            };
            return new Promise((resolve, reject) => {
                dns_1.default.lookup(url, options, (error, address) => {
                    console.log(error, address);
                    if (error) {
                        return reject(false);
                    }
                    resolve(true);
                });
            });
        };
    }
}
exports.default = URLShortnerService;
//# sourceMappingURL=url.service.js.map