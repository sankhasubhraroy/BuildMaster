const jwt = require("jsonwebtoken");

const generateUsername = async (User, name) => {
  let username = name.replace(/\s/g, "").toLowerCase();
  let baseUsername = username;
  let count = 0;
  while (await User.findOne({ username })) {
    username = baseUsername + count++;
  }
  return username;
};

const generateJWT = async (payload) => {
  return new Promise((resolve, reject) => {
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_EXPIRES_IN,
      },
      (error, token) => {
        if (error) {
          reject(error);
          throw error;
        }
        resolve(token);
      }
    );
  });
};

module.exports = { generateUsername, generateJWT };
