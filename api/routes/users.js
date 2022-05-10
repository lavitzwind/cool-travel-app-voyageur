import express from "express";
import bcrypt from "bcrypt";
import User from "../models/User.js";

const router = express.Router();

// Register

router.post("/register", async (req, res) => {
  try {
    // Generate new password
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(req.body.password, salt);

    // Create new user
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hash,
    });

    // Save user
    const savedUser = await newUser.save();
    res.status(200).json(savedUser._id);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Login
router.post("/login", async (req, res) => {
  try {
    // Find user
    const user = await User.findOne({ username: req.body.username });
    if (!user) {
      res.status(401).json({ message: "Wrong username or password!" });
    } else {
      // Check password
      const validPassword = await bcrypt.compare(
        req.body.password,
        user.password
      );
      if (!validPassword) {
        res.status(401).json({ message: "Wrong username or password!" });
      } else {
        // Send response
        res.status(200).json({ _id: user._id, username: user.username });
      }
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

export default router;
