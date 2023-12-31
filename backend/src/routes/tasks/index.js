const router = require("express").Router();
const {
  getTaskbyId,
  createTask,
  updateTask,
  deleteTask,
  getAllTasks,
} = require("../../controllers/tasks");
const authUser = require("../../middlewares/auth");

router.get("/", getAllTasks);

router.get("/:taskId", authUser, getTaskbyId);

router.post("/", authUser, createTask);

router.put("/", authUser, updateTask);

router.delete("/:taskId", authUser, deleteTask);

module.exports = router;
