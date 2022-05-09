import express from "express";
import bcrypt from "bcrypt";

const router = express.Router();

// Register

router.post("/register", async (req, res) => {
  try {
    // Generate new password
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(req.body.password, salt);

    // Create new user
    const newUser = new User({
      name: req.body.name,
      email: req.body.email,
      password: hash,
    });

    // Save user
    const savedUser = await newUser.save();
    res.status(200).json(user._id);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Login

export default router;
