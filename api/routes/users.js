import express from "express";
import bcrypt from "bcrypt";
import User from "../models/User.js";

const router = express.Router();

// Register

router.post("/register", async (req, res) => {
  try {
    // Check if user already exists
    const { username, email, password } = req.body;
    const user = await User.findOne({ username });
    const emailUser = await User.findOne({ email });

    if (user) {
      res.status(400).send("User already exists");
      return;
    }

    if (emailUser) {
      res.status(400).send("User already exists");
      return;
    }

    if (password.length < 6) {
      res.status(400).json("Password must be at least 6 characters");
      return;
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    // Save user to database
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
