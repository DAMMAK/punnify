"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const url_service_1 = __importDefault(require("../service/url.service"));
const url_model_1 = __importDefault(require("../model/url.model"));
const nanoid_1 = require("nanoid");
//NB: nanoid generate random which was used to generate the shortUrl
class URLController {
}
exports.default = URLController;
_a = URLController;
URLController.createURL = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var { url } = req.body;
    var urlService = new url_service_1.default();
    // check if url is valid
    var isValid = yield urlService.checkIfUrlValid(url);
    // if not valid return error
    if (!isValid) {
        return res.status(400).send({
            message: "Invalid url",
        });
    }
    // if URL is a valid
    //then check if URL exist in the DB
    //then return the URL data from the DB
    var urlExist = yield url_model_1.default.findOne({ fullUrl: url }).lean();
    if (urlExist) {
        let { fullUrl, shortUrl } = urlExist;
        return res.send({ fullUrl, shortUrl }).status(200);
    }
    // if the URL doesn't exist in the DB then create a new entry in the db
    const { fullUrl, shortUrl } = yield url_model_1.default.create({
        fullUrl: url,
        shortUrl: (0, nanoid_1.nanoid)(8),
    });
    res
        .send({
        fullUrl,
        shortUrl,
    })
        .status(200);
});
URLController.getURL = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var foundUrl = yield url_model_1.default.findOne({ shortUrl: req.params["shortUrl"] });
    if (!foundUrl) {
        return res.status(404).send({ error: "Invalid Short url" });
    }
    const { visited, fullUrl, shortUrl } = foundUrl;
    // update the visited value by 1 in the DB
    foundUrl["visited"] = visited + 1;
    foundUrl.save();
    res
        .send({
        fullUrl,
        shortUrl,
    })
        .status(200);
});
URLController.getURLs = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var data = yield url_model_1.default.find().sort({ visited: -1 }).limit(100);
    res.status(200).send({
        data,
    });
});
//# sourceMappingURL=url.controller.js.map