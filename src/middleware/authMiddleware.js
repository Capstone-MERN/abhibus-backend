const jwt = require("jsonwebtoken");

const authMiddleware = async (req, res, next) => {
  try {
    const authorization = req.headers.authorization;
    if (!authorization) {
      throw new Error("You don't have permissions to perform this action");
    }
    const token = authorization.substring(8); // "Bearer: "
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
