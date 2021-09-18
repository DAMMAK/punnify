import { Request, Response } from "express";
import URLShortnerService from "../service/url.service";
import urlData, { URLData } from "../model/url.model";

export default class URLController {
  static createURL = async (req: Request, res: Response) => {
    console.log("New Request");
    
    var { url } = req.body;
    var urlService = new URLShortnerService();
    try {
      var isValid = await urlService.checkIfUrlValid(url);
      if(url.substring(0,3) !== "http") url=`http://${url}` ;
    } catch (ex) {
      console.log("Catch block => ", ex);
      res.status(400).send({
        message: "Invalid url",
      });
    }
    var urlExist = await urlData.findOne({ fullUrl: url }).lean();
    if (urlExist) {
      let { fullUrl, shortUrl } = urlExist;
      return res.send({ fullUrl, shortUrl }).status(200);
    }

    const { fullUrl, shortUrl } = await urlData.create({ fullUrl: url });
    res
      .send({
        fullUrl,
        shortUrl,
      })
      .status(200);
  };

  static getURL = async (req: Request, res: Response) => {
    var foundUrl = await urlData.findOne({ shortUrl: req.params["shortUrl"] });
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
  };

  static getURLs = async (req: Request, res: Response) => {
    var data = await urlData.find().sort({ visited: -1 }).limit(100);
    res.status(200).send({
      data,
    });
  };
}
