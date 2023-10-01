const {
  isNameValid,
  isPhoneValid,
  isEmailValid,
  isUsernameValid,
} = require("../../helpers/validations");
const User = require("../../models/user");

const getUserById = async (req, res) => {
  try {
    const id = req.params.id;

    const user = await User.findById(id).select("-password");

    // If no user exists
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User dosen't exists",
      });
    }

    res.status(200).json({
      success: true,
      message: "User fetched successfully",
      user,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

const getUserProfile = async (req, res) => {
  try {
    const id = req.user.id;

    const user = await User.findById(id).select("-password");

    // If no user exists
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User dosen't exists",
      });
    }

    res.status(200).json({
      success: true,
      message: "User fetched successfully",
      user,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

const updateUserDetails = async (req, res) => {
  try {
    const { name, email, username, phone } = req.body;
    const avatar = req.file?.filename;
    const { id } = req.user;

    // Input Validations
    if (!isNameValid(name)) {
      return res.status(400).json({
        success: false,
        message: "Please enter a valid name",
      });
    } else if (!isUsernameValid(username)) {
      return res.status(400).json({
        success: false,
        message: "Please enter a valid username",
      });
    } else if (!isEmailValid(email)) {
      return res.status(400).json({
        success: false,
        message: "Please enter a valid email address",
      });
    } else if (!isPhoneValid(phone)) {
      return res.status(400).json({
        success: false,
        message: "Please enter a valid phone number",
      });
    }

    // Checking if the credentials already exists
    const exisingUser = await User.findOne({
      $or: [{ username }, { email }, { phone }],
    });

    if (exisingUser) {
      return res.status(400).json({
        success: false,
        message: "username & email & phone should be unique",
      });
    }

    const user = await User.findById(id);
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User dosen't exist",
      });
    }

    user.name = name || user.name;
    user.email = email || user.email;
    user.username = username || user.username;
    user.phone = phone || user.phone;
    user.avatar = avatar || user.avatar;

    await user.save();

    res.status(201).json({
      success: true,
      message: "Updated successfully",
      user,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

module.exports = { getUserById, getUserProfile, updateUserDetails };
