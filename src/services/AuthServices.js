const User = require("../models/UserSchema");

const createNewUser = async (userInfo) => {
  try {
    await User.create(userInfo);
  } catch (error) {
    throw new Error("invalid request");
  }
};

const findUser = async (email) => {
  return new Promise(async (resolve, reject) => {
    try {
      const userData = await User.findOne({ email });

      if (!userData) {
        throw new Error("Unauthorized");
      }

      resolve(userData);
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = { createNewUser, findUser };
