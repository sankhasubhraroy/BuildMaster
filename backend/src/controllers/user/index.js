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

module.exports = { getUserById };
