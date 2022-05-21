import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import pinRoute from "./routes/pins.js";
import userRoute from "./routes/users.js";
import cors from "cors";
const app = express();

dotenv.config();

app.use(express.json());
app.use(cors());

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

app.use("/api/pins", pinRoute);
app.use("/api/users", userRoute);

app.listen(process.env.PORT || 8800, () => {
  console.log("Server is running on port 8800");
});
