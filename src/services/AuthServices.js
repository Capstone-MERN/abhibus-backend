const User = require("../models/UserSchema");
const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,12}$/;

const validatePassword = (password) => {
  return passwordRegex.test(password);
};

const createNewUser = async (userInfo) => {
  await User.create(userInfo);
};

const findUser = async (email) => {
  const userData = await User.findOne({ email });

  if (!userData) {
    throw new Error("Unauthorized");
  }
  return userData;
};

module.exports = { createNewUser, findUser, validatePassword };
