const router = require("express").Router();
const {
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
  getProjects,
} = require("../../controllers/projects");
const authUser = require("../../middlewares/auth");

router.get("/", authUser, getProjects);

router.get("/:id", authUser, getProjectById);

router.post("/", authUser, createProject);

router.put("/:id", authUser, updateProject);

router.delete("/:id", authUser, deleteProject);

module.exports = router;
