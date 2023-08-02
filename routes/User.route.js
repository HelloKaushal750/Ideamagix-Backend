const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const { UserModel } = require("../models/user.model");

const UserController = express.Router();

UserController.post("/signup", (req, res) => {
  try {
    const { name, email, password } = req.body;
    bcrypt.hash(password, 8, async function (err, hash) {
      if (err) {
        res.status(404).json({ message: err });
      } else {
        const user = new UserModel({
          name,
          email,
          password: hash,
        });
        await user.save();
        res.status(200).json({ message: "Registration Successfull" });
      }
    });
  } catch (error) {
    res.status(404).json({ message: error });
  }
});

UserController.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });
    bcrypt.compare(password, user.password, function (err, result) {
      if (err) {
        res.status(404).json({ message: err });
      }
      if (result) {
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
        res.status(200).json({ message: "Login Successful", token, user });
      } else {
        res.status(404).json({
          message: "Invalid Credentials, please signup if you haven't",
        });
      }
    });
  } catch (error) {
    res.status(404).json({ message: error });
  }
});


module.exports = {UserController};