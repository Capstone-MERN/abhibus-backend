const jwt = require("jsonwebtoken");
const User = require("../models/UserSchema");

const authMiddleware = async (req, res, next) => {
  try {
    console.log(req.user);
    const token = req.headers.authorization.split(" ")[1];

    const verify = jwt.verify(token, process.env.SECRET_KEY);

    const userDb = await User.findOne({ _id: verify.userId });

    if (userDb) {
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

module.exports = authMiddleware;
