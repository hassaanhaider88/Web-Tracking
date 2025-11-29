const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const route = express.Router();

route.post("/", async (req, res) => {
  const { wt_token } = req.body;
  const decoded = jwt.verify(wt_token, process.env.JWT_SECRET);
  const _id = decoded.userId;
  const UserData = await User.findById({ _id });
  res.json({
    success: true,
    userData: UserData,
  });
});

module.exports = route;
