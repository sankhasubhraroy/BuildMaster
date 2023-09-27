const router = require("express").Router();
const { createProject } = require("../../controllers/projects");
const authUser = require("../../middlewares/auth");

// router.get("/",authUser,)

// router.get("/:id",authUser,)

router.post("/", authUser, createProject);

// router.put("/:id",authUser,)

// router.delete("/:id",authUser,)

module.exports = router;
