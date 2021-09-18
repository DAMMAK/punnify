import mongoose from "mongoose";

const dbConnect = async () => {
  var dbURI = process.env.MONGODB_URI as string;
  try {
    await mongoose
      .connect(dbURI, <mongoose.ConnectOptions>{
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then(() => console.log("Connected to MongoDB"));
  } catch (ex) {}
};

export default dbConnect;
