const Project = require("../../models/project");
const Task = require("../../models/task");

const getTaskbyId = async (req, res) => {
  try {
    const { taskId } = req.params;

    // Find the task by Id
    const task = await Task.findById(taskId);
    // Check if the task exists
    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    res.json({
      success: true,
      message: "Task fetched successfully",
      task,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const createTask = async (req, res) => {
  try {
    const { projectId } = req.params;
    const currentUser = req.user;
    const { name, description, assignees, deadline } = req.body;

    // Input validations
    if (!name || !deadline) {
      return res.status(400).json({
        success: false,
        message: "Please provide all the required fields",
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

    // Check if the user is authorized to create task
    if (project.manager.toString() !== currentUser.id.toString()) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized. You are not the project manager",
      });
    }

    // Create a new task associated with the project
    const task = await new Task({
      name,
      description,
      assignees,
      deadline,
      manager: currentUser.id,
    }).save();

    await Project.findByIdAndUpdate(projectId, { $push: { tasks: task.id } });

    res.status(201).json({
      success: true,
      message: "Task created successfully",
      task,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const updateTask = async (req, res) => {
  try {
    const { taskId } = req.params;
    const currentUser = req.user;
    const { name, description, assignees, deadline, status } = req.body;

    // Find the task by ID
    const task = await Task.findById(taskId);
    // Check if the task exists
    if (!task) {
      return res.status(404).json({
        success: fasle,
        message: "Task not found",
      });
    }

    // Check if the user is authorized to update task
    if (task.manager.toString() !== currentUser.id.toString()) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized. You are not the project manager",
      });
    }

    // Update task details from the request body
    task.name = name || task.name;
    task.description = description || task.description;
    task.assignees = assignees || task.assignees;
    task.deadline = deadline || task.deadline;
    task.status = status || task.status;

    await task.save();

    res.json({
      success: true,
      message: "Task updated successfully",
      task,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const deleteTask = async (req, res) => {
  try {
    const { taskId } = req.params;
    const currentUser = req.user;

    // Find the task by ID
    const task = await Task.findById(taskId);
    // Check if the task exists
    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    // Check if the user is authorized to delete task
    if (task.manager.toString() !== currentUser.id.toString()) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized. You are not the project manager",
      });
    }

    // Delete the task
    await Task.findByIdAndDelete(taskId);

    res.status(200).json({
      success: true,
      message: "Task deleted successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = { getTaskbyId, createTask, updateTask, deleteTask };
