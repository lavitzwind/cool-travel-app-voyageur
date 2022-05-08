import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
const app = express();

dotenv.config();

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log(err);
  });

app.listen(8800, () => {
  console.log("Server is running on port 8800");
});
