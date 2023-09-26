const router = require("express").Router();

// Auth route
router.use("/auth", require("./auth"));

module.exports = router;
