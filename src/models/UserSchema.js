const mongoose = require("mongoose");

const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const phoneRegex = /^(\+91[\-\s]?)?[6-9]\d{9}$/;

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    match: emailRegex,
    unique: true,
  },
  phoneNumber: {
    type: String,
    required: true,
    match: phoneRegex,
    unique: true,
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
  password: {
    type: String,
    required: true,
  },
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
