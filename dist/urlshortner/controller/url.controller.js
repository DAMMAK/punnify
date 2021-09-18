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
class URLController {
}
exports.default = URLController;
_a = URLController;
URLController.createURL = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("New Request");
    var { url } = req.body;
    var urlService = new url_service_1.default();
    try {
        var isValid = yield urlService.checkIfUrlValid(url);
        if (url.substring(0, 3) !== "http")
            url = `http://${url}`;
    }
    catch (ex) {
        console.log("Catch block => ", ex);
        res.status(400).send({
            message: "Invalid url",
        });
    }
    var urlExist = yield url_model_1.default.findOne({ fullUrl: url }).lean();
    if (urlExist) {
        let { fullUrl, shortUrl } = urlExist;
        return res.send({ fullUrl, shortUrl }).status(200);
    }
    const { fullUrl, shortUrl } = yield url_model_1.default.create({ fullUrl: url });
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
    foundUrl["visited"] = visited + 1;
    foundUrl.save();
    res
        .send({
        fullUrl,
        shortUrl,
    })
        .status(200);
    // res.redirect("http://blog.dammak.dev");
});
URLController.getURLs = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var data = yield url_model_1.default.find().sort({ visited: -1 }).limit(100);
    res.status(200).send({
        data,
    });
});
//# sourceMappingURL=url.controller.js.map