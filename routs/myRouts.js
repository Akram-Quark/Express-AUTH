const express = require("express");
const router = express.Router();
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const crypto = require("bcrypt");
const { register_Validation, login_Validation } = require("../validation");

//todo getuser req 🔽 :::::::

router.get("/register", function (req, res) {
  res.send("ready");
});
//*::postuser req 🔼::::::::::::::::::::
router.post("/register", async (req, res) => {
  const { error } = register_Validation(req.body);
  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }
  const eExists = await User.findOne({ email: req.body.email });
  if (eExists) {
    return res.status(400).send("Emaile already exists");
  }
  const salt = await crypto.genSalt(10);
  const hash = await crypto.hash(req.body.password, salt);

  const new_user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hash,
  });
  try {
    const saved_user = await new_user.save();

    res.status(200).json({ message: "user successfully added" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
//://////////////////////////////////////////////////////////////////////
router.post("/login", async (req, res) => {
  const valid_logged = login_Validation(req.body);
  const error = valid_logged.error;
  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    res.status(400).send("email or passord is wrong 👎!");
    return;
  }
  const validPass = await crypto.compare(req.body.password, user.password);
  if (!validPass) {
    res.status(400).send("email or  password is wrong");
    return;
  }
  var token = await jwt.sign({ _id: user._id }, process.env.KEY_SECRET);
  res.header("auth-token", token).send(user.name);
});
module.exports = router;
