const router = require("express").Router();

// Auth route
router.use("/auth", require("./auth"));

// Projects route
router.use("/projects", require("./projects"));

module.exports = router;
