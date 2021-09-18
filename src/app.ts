import express from "express";
import routes from "./urlshortner/routes/route";
import bodyParser from "body-parser";
import * as dotenv from "dotenv";
import dbConnect from "./urlshortner/service/db.service";
import cors from 'cors';

dotenv.config();

const PORT = process.env.PORT;

const app = express();
app.use(cors());
app.use(bodyParser.json());


app.listen(PORT, async() => {
  console.log(`Application running on port ${PORT}`);
  await dbConnect();
  await routes(app);
});
