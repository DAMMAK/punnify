import mongoose from "mongoose";
import { nanoid } from "nanoid";

export interface URLData extends Document {
  fullUrl: string;
  shortUrl: String;
  visited: number;
}

const schema = new mongoose.Schema({
  fullUrl: {
    type: String,
    unique: true,
    required: true,
  },

  shortUrl: {
    type: String,
    required: true,
    unique: true,
  },

  visited: {
    type: Number,
    default: 0,
  },
});

export default mongoose.model<URLData>("urlData", schema);
