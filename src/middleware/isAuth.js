const jwt = require("jsonwebtoken");
const User = require("../models/UserSchema");

const isAuth = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];

    const verify = jwt.verify(token, process.env.SECRET_KEy);

    const userDb = await User.findOne({ email: verify.email });

    if (userDb) {
      req.user = userDb;
      next();
    } else {
      throw new Error("Unauthorized");
    }
  } catch (error) {
    res.status(401).json({
      message: error.message,
    });
  }
};

module.exports = isAuth;
