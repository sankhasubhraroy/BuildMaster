const router = require("express").Router();
const {
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
  getProjects,
  getProjectsByUserId,
} = require("../../controllers/projects");
const authUser = require("../../middlewares/auth");

router.get("/", authUser, getProjects);

router.get("/project", authUser, getProjectsByUserId);

router.get("/project/:id", authUser, getProjectById);

router.post("/", authUser, createProject);

router.put("/:id", authUser, updateProject);

router.delete("/:id", authUser, deleteProject);

module.exports = router;
