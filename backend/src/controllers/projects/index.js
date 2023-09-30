const Project = require("../../models/project");

const getProjects = async (req, res) => {
  try {
    const projects = await Project.find();

    if (projects.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No projects found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Projects fetched successfully",
      projects,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getProjectsByUserId = async (req, res) => {
  try {
    const userId = req.user.id;

    // Fetching projects data from database of the user
    const projects = await Project.find({ manager: userId })
      .populate("manager")
      .populate("tasks");

    // If user dose'nt have any project
    if (projects.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No projects found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Projects fetched successfully",
      projects,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getProjectById = async (req, res) => {
  try {
    const projectId = req.params.id;

    // Fetching the project data from database
    const project = await Project.findById(projectId)
      .populate("manager")
      .populate("tasks");

    // If there is no such project
    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Project fetched successfully",
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

const createProject = async (req, res) => {
  try {
    const { name, description, location, price, startDate, endDate } = req.body;
    const image = req.file.filename;
    console.log(req.file);

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
    } else if (!image) {
      return res.status(400).json({
        success: false,
        message: "Must upload image",
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
      images: [image],
    }).save();

    res.status(200).json({
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

const updateProject = async (req, res) => {
  try {
    const projectId = req.params.id;
    const currentUser = req.user;
    const { name, description, location, price, startDate, endDate, images } =
      req.body;

    // Input validations
    if (price <= 0) {
      return res.status(400).json({
        success: false,
        message: "Price must be greater than 0",
      });
    }

    // Fetching the project data from databse
    const project = await Project.findById(projectId);
    // If the project don't exist
    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    // Check if the user is authorized to update the project
    if (project.manager.toString() !== currentUser.id.toString()) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized. You are not the project manager",
      });
    }

    // Updating the project
    project.name = name || project.name;
    project.description = description || project.description;
    project.location = location || project.location;
    project.startDate = startDate || project.startDate;
    project.endDate = endDate || project.endDate;
    project.images = images || project.images;

    // Saving the updated project
    await project.save();

    res.status(200).json({
      success: true,
      message: "Updated successfully",
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

const deleteProject = async (req, res) => {
  try {
    const projectId = req.params.id;
    const currentUser = req.user;

    // Fetching the project data from databse
    const project = await Project.findById(projectId);
    // If the project don't exist
    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    // Check if the user is authorized to delete the project
    if (project.manager.toString() !== currentUser.id.toString()) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized. You are not the project manager",
      });
    }

    // Delete the project
    await Project.findByIdAndDelete(projectId);

    res.status(200).json({
      success: true,
      message: "Project deleted successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getProjects,
  getProjectsByUserId,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
};
