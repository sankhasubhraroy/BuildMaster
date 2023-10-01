const router = require("express").Router();
const {
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
  getProjects,
  getProjectsByUserId,
  getCoordinatesOfProject,
} = require("../../controllers/projects");
const authUser = require("../../middlewares/auth");
const upload = require("../../middlewares/upload");

router.get("/", authUser, getProjects);

router.get("/project", authUser, getProjectsByUserId);

router.get("/project/:id", authUser, getProjectById);

router.post("/", authUser, upload.single("image"), createProject);

router.put("/", authUser, upload.single("image"), updateProject);

router.delete("/:id", authUser, deleteProject);

router.get("/coordinates", getCoordinatesOfProject);

module.exports = router;
