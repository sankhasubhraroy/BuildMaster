const router = require("express").Router();

router.use("/user", require("./userAuth"));

router.use("/admin", require("./adminAuth"));

module.exports = router;
