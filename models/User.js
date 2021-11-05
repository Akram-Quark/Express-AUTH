const mongoose = require("mongoose");
var User = mongoose.Schema({
  name: {
    type: "string",
    required: true,
    maxLength: 255,
    minLength: 3,
  },
  email: {
    type: "string",
    required: true,
    maxLength: 255,
    minLength: 6,
  },
  password: {
    type: "string",
    maxLength: 255,
    minLength: 6,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
});
module.exports = mongoose.model("User", User);
