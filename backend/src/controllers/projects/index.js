const Project = require("../../models/project");

const createProject = async (req, res) => {
  try {
    const { name, description, location, price, startDate, endDate, images } =
      req.body;

    // Input validations
    if (!name || !price) {
      return res.status(400).json({
        success: false,
        message: "Please provide all the required fields",
      });
    } else if (price <= 0) {
      return res.status(400).json({
        success: false,
        message: "Price must be greater than 0",
      });
    }

    // Get current logged in user
    const currentUser = req.user;
    // Creating new project to database
    const project = await new Project({
      name,
      description,
      location,
      price,
      startDate,
      endDate,
      manager: currentUser.id,
      images,
    }).save();

    res.status(201).json({
      success: true,
      message: "Project created successfully",
      project,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = { createProject };
