import { Express, Request, Response } from "express";
import URLController from "../controller/url.controller";


export default function routes(app: Express) {
  app.post("/", URLController.createURL);
  app.get("/geturls", URLController.getURLs);
  app.get("/:shortUrl", URLController.getURL);
}
