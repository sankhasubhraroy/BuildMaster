const Admin = require("../../models/admin");
const Project = require("../../models/project");
const Task = require("../../models/task");
const User = require("../../models/user");

const getDashBoardData = async (req, res) => {
  try {
    const { id } = req.user;

    // Validations
    if (req.user.role !== "admin") {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const admin = await Admin.findById(id).select("-password");
    // If no user exists
    if (!admin) {
      return res.status(400).json({
        success: false,
        message: "Admin dosen't exists",
      });
    }

    // Fetching all the data from database
    const users = await User.find();
    const projects = await Project.find();
    const tasks = await Task.find();

    res.status(200).json({
      success: true,
      message: "Data fetched successfully",
      admin,
      users,
      projects,
      tasks,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

module.exports = { getDashBoardData };
