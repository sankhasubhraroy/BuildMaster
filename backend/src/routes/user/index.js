const router = require("express").Router();
const { getUserById, getUserProfile } = require("../../controllers/user");
const authUser = require("../../middlewares/auth");

router.get("/profile", authUser, getUserProfile);

router.get("/:id", getUserById);

module.exports = router;
