import mongoose from "mongoose";

const PinSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
      min: 3,
    },
    description: {
      type: String,
      required: true,
      min: 5,
    },
    rating: {
      type: Number,
      required: true,
      min: 0,
      max: 5,
    },
    lat: {
      type: Number,
      required: true,
    },
    lon: {
      type: Number,
      required: true,
    },
    userId: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Pin", PinSchema);
