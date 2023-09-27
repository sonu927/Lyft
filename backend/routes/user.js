import express from "express";
import { User } from "../models/userModel.js";

const router = express.Router();

//To creating a new user
router.post("/signup", async (req, res) => {
  const { email, name, password, confirm_password } = req.body;
  if (password != confirm_password) {
    return res.status(400).json({
      success: false,
      message: "Password and Confirm Password don't match",
    });
  }

  const newUser = {
    email,
    password,
    name,
  };

  const user = await User.findOne({ email: email });
  if (!user) {
    const createdUser = await User.create(newUser);
    return res.status(200).json({
      success: true,
      user: createdUser,
      message: "Account created successfully",
    });
  } else {
    return res.status(409).json({
      success: false,
      message: "User already exists with this email",
    });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email: email });
  if (user) {
    if (password === user.password) {
      return res.status(200).json({
        success: true,
        message: "Login successful",
        user: user,
      });
    } else {
      return res.status(401).json({
        success: false,
        message: "Incorrect password",
      });
    }
  } else {
    return res.status(404).json({
      success: false,
      message: "No User exist with this email , please sign up first",
    });
  }
});

//to get a user
router.post("/getUser", async (req, res) => {
  const user = await User.findById(req.body.userId);
  if (user) {
    return res.status(200).json({
      success: true,
      message: "user Found",
      user: user,
    });
  } else {
    return res.status(404).json({
      success: false,
      message: "user Not Found",
    });
  }
});

export default router;
