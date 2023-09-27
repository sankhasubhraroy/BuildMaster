const router = require("express").Router();
const {
  getTaskbyId,
  createTask,
  updateTask,
  deleteTask,
} = require("../../controllers/tasks");
const authUser = require("../../middlewares/auth");

router.get("/:taskId", authUser, getTaskbyId);

router.post("/:projectId/", authUser, createTask);

router.put("/:taskId", authUser, updateTask);

router.delete("/:taskId", authUser, deleteTask);

module.exports = router;
