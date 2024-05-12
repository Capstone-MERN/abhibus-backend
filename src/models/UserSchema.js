const mongoose = require("mongoose");

const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const phoneRegex = /^\+(?:[0-9] ?){6,14}[0-9]$/;

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: emailRegex,
  },
  phoneNumber: {
    type: String,
    required: true,
    unique: true,
    match: phoneRegex,
  },
  gender: {
    type: String,
    enum: ["M", "F"],
    required: true,
  },
  dob: {
    type: Number,
    required: true,
  },
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
