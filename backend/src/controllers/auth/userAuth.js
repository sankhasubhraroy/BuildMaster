const User = require("../../models/user");
const {
  isNameValid,
  isEmailValid,
  isPhoneValid,
  isPasswordValid,
} = require("../../helpers/validations");
const { encryptData } = require("../../helpers/encryption");
const { generateUsername, generateJWT } = require("../../helpers/generate");
const { DEFAULT_AVATAR } = require("../../helpers/constants");

const register = async (req, res) => {
  try {
    const { name, email, phone, password } = req.body;

    // Input Validations
    if (!isNameValid(name)) {
      return res.status(400).json({
        success: false,
        message: "Please enter a valid name",
      });
    }
    if (!isEmailValid(email)) {
      return res.status(400).json({
        success: false,
        message: "Please enter a valid email address",
      });
    }
    if (!isPhoneValid(phone)) {
      return res.status(400).json({
        success: false,
        message: "Please enter a valid phone number",
      });
    }
    if (!isPasswordValid(password)) {
      return res.status(400).json({
        success: false,
        message:
          "Password must contain at least 8 characters, one letter, one number and a special character",
      });
    }

    // Checking if the user exists
    const exisingUser = await User.findOne({ $or: [{ email }, { phone }] });

    if (exisingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    // Encrypting the password
    const hashedPassword = await encryptData(password);
    // Generating a username
    const username = await generateUsername(User, name);
    // Generating an avatar
    const avatar = DEFAULT_AVATAR(name);

    // Creating new user to database
    const user = await new User({
      name,
      email,
      username,
      phone,
      password: hashedPassword,
      avatar,
    }).save();

    // Payload for JWT
    const payload = { id: user.id };
    // Generating JWT Token
    const token = await generateJWT(payload);

    res.status(200).json({
      success: true,
      message: "User Register Successfully",
      token,
      user,
    });
  } catch (error) {
    console.error(error.message);
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = register;
