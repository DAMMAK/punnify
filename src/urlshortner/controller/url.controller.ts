import { Request, Response } from "express";
import URLShortnerService from "../service/url.service";
import urlData, { URLData } from "../model/url.model";
import { nanoid } from "nanoid";

//NB: nanoid generate random which was used to generate the shortUrl
export default class URLController {
  static createURL = async (req: Request, res: Response) => {
    var { url } = req.body;
    var urlService = new URLShortnerService();
    // check if url is valid
    var isValid = await urlService.checkIfUrlValid(url);
    // if not valid return error
    if (!isValid) {
      return res.status(400).send({
        message: "Invalid url",
      });
    }

    // if URL is a valid
    //then check if URL exist in the DB
    //then return the URL data from the DB
    var urlExist = await urlData.findOne({ fullUrl: url }).lean();
    if (urlExist) {
      let { fullUrl, shortUrl } = urlExist;
      return res.send({ fullUrl, shortUrl }).status(200);
    }

    // if the URL doesn't exist in the DB then create a new entry in the db
    const { fullUrl, shortUrl } = await urlData.create({
      fullUrl: url,
      shortUrl: nanoid(8),
    });
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
    // update the visited value by 1 in the DB
    foundUrl["visited"] = visited + 1;
    foundUrl.save();

    res
      .send({
        fullUrl,
        shortUrl,
      })
      .status(200);
  };

  static getURLs = async (req: Request, res: Response) => {
    var data = await urlData.find().sort({ visited: -1 }).limit(100);
    res.status(200).send({
      data,
    });
  };
}
