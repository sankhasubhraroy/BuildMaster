const Blueprint = require("../../models/blueprint");
const Project = require("../../models/project");

const uploadBlueprint = async (req, res) => {
  try {
    const { projectId, name } = req.body;
    const blueprint = req.file?.filename;
    // Get current logged in user
    const currentUser = req.user;

    // validations
    if (!name) {
      return res.status(400).json({
        success: false,
        message: "Name must be provided",
      });
    } else if (!blueprint) {
      return res.status(400).json({
        success: false,
        message: "Upload a blueprint",
      });
    }

    // Check if the project exists
    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    const bluePrint = await new Blueprint({
      name,
      uploadedBy: currentUser.id,
      fileURL: `http://localhost:5000/uploads/${blueprint}`,
    }).save();

    await Project.findByIdAndUpdate(projectId, {
      $push: { blueprints: bluePrint.id },
    });

    res.status(201).json({
      success: true,
      message: "Uploaded successfully",
      bluePrint,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const deleteBlueprint = async (req, res) => {
  try {
    const blueprintId = req.params.id;

    await Blueprint.findByIdAndDelete(blueprintId);

    res.status(201).json({
      success: true,
      message: "Deleated successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = { uploadBlueprint, deleteBlueprint };
