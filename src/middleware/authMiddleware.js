const jwt = require("jsonwebtoken");
const User = require("../models/UserSchema");

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const claims = jwt.verify(token, process.env.SECRET_KEY);
    req.userId = claims.userId;
    next();
  } catch (error) {
    res.status(401).json({
      message: error.message,
    });
  }
};

module.exports = authMiddleware;
