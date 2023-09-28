const router = require("express").Router();
const { getUserById } = require("../../controllers/user");

router.get("/:id", getUserById);

module.exports = router;
