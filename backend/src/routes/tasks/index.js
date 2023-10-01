const router = require("express").Router();
const {
  getTaskbyId,
  createTask,
  updateTask,
  deleteTask,
} = require("../../controllers/tasks");
const authUser = require("../../middlewares/auth");

router.get("/:taskId", authUser, getTaskbyId);

router.post("/", authUser, createTask);

router.put("/", authUser, updateTask);

router.delete("/:taskId", authUser, deleteTask);

module.exports = router;
