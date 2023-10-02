const crypto = require("crypto");
const { generateUsername, generateJWT } = require("../../helpers/generate");
const { isNameValid } = require("../../helpers/validations");
const { encryptData, decryptData } = require("../../helpers/encryption");
const { DEFAULT_AVATAR } = require("../../helpers/constants");
const Admin = require("../../models/admin");

const createAdmin = async (req, res) => {
  try {
    const name = req.body.name;

    // validations
    if (req.user.role !== "admin") {
      return res.status(401).json({
        success: false,
        message: "You have to be an admin to create an admin",
      });
    } else if (!isNameValid(name)) {
      return res.status(400).json({
        success: false,
        message: "Please enter a valid name",
      });
    }

    // Generating a username
    const username = await generateUsername(Admin, name);
    // Generating a password
    const password = crypto.randomBytes(8).toString("hex");
    // Encrypting the password
    const hashedPassword = await encryptData(password);

    // Creating a new Admin account
    const admin = await new Admin({
      name,
      username,
      password: hashedPassword,
      avatar: DEFAULT_AVATAR(name),
    }).save();

    // Creating a payload to store it on JWT
    const payload = { id: admin.id, role: "admin" };

    // Generating a JWT token to validate the admin
    const token = await generateJWT(payload);

    res.status(200).json({
      success: true,
      message: "Successfully created an admin account",
      secret: {
        username,
        password,
      },
      token,
      admin,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    // validations
    if (!username || !password) {
      return res.status(400).send({
        success: false,
        message: "username and password is required",
      });
    }

    // Fetching admin data
    const admin = await Admin.findOne({ username });
    // If there is no admin by that username
    if (!admin) {
      return res.status(400).send({
        success: false,
        message: "Account dose not exist",
      });
    }

    // Comparing the password
    const isMatch = await decryptData(password, admin.password);

    if (!isMatch) {
      return res.status(400).send({
        success: false,
        message: "Wrong password",
      });
    }

    // Creating a payload to store it on JWT
    const payload = { id: admin.id, role: "admin" };

    // Generating a JWT token and sending it
    const token = await generateJWT(payload);

    res.status(200).send({
      success: true,
      message: "Successfully Logged in",
      token,
      admin,
    });
  } catch (error) {
    return res.status(400).send({
      success: false,
      message: error.message,
    });
  }
};

module.exports = { createAdmin, login };
