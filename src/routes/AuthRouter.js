const AuthRouter = require("express").Router();
const {
  createNewUser,
  findUser,
  validatePassword,
} = require("../services/AuthServices");
const endpoints = require("../utils/endpoints");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

AuthRouter.post(endpoints.signup, async (req, res) => {
  try {
    const { name, email, phoneNumber, gender, dob, password } = req.body;

    const isValidPassword = validatePassword(password);
    if (
      !name ||
      !email ||
      !phoneNumber ||
      !gender ||
      !dob ||
      !password ||
      !isValidPassword
    ) {
      throw new Error("Invalid request");
    }
    const hashedPassword = await bcrypt.hash(
      password,
      parseInt(process.env.SALT)
    );

    const userInfo = {
      name,
      email,
      phoneNumber,
      gender,
      dob,
      password: hashedPassword,
    };

    await createNewUser(userInfo);

    res.status(201).json({
      message: "Signup Success",
    });
  } catch (error) {
    res.status(400).json({
      message: "Invalid request",
    });
  }
});
AuthRouter.post(endpoints.login, async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Invalid request",
      });
    }

    const userData = await findUser(email);
    const isMatch = await bcrypt.compare(password, userData.password);
    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid request",
      });
    }

    const token = await jwt.sign(
      { userId: userData._id.toString() },
      process.env.SECRET_KEY
    );

    res.status(200).json({
      message: "Login Successful",
      data: {
        token,
      },
    });
  } catch (error) {
    res.status(400).json({
      message: "Invalid credentials",
    });
  }
});

module.exports = AuthRouter;
