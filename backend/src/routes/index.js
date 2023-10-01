const router = require("express").Router();

// Auth route
router.use("/auth", require("./auth"));

// Projects route
router.use("/projects", require("./projects"));

// Taks route
router.use("/tasks", require("./tasks"));

// User route
router.use("/user", require("./user"));

// Blueprints route
router.use("/blueprints", require("./blueprints"));

module.exports = router;
