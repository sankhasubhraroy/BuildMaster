const bcrypt = require("bcryptjs");

const encryptData = async (data) => {
  try {
    const saltRounds = Number(process.env.SALT_ROUNDS);
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedData = await bcrypt.hash(data, salt);
    return hashedData;
  } catch (error) {
    console.error(error.message);
  }
};

const decryptData = async (data, hashedData) => {
  return bcrypt.compare(data, hashedData);
};

module.exports = { encryptData, decryptData };
