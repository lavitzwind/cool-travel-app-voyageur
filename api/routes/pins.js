import express from "express";
import Pin from "../models/Pin.js";

const router = express.Router();

// Create a pin
router.post("/", async (req, res) => {
  const newPin = new Pin(req.body);
  try {
    const savedPin = await newPin.save();
    res.status(201).json(savedPin);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get all pins
router.get("/", async (req, res) => {
  try {
    const pins = await Pin.find();
    res.status(200).json(pins);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Delete a pin
router.delete("/:id", async (req, res) => {
  try {
    const removedPin = await Pin.remove({ _id: req.params.id });
    res.status(200).json(removedPin);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
