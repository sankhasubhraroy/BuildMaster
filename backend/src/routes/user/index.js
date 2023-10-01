const router = require("express").Router();
const {
  getUserById,
  getUserProfile,
  updateUserDetails,
} = require("../../controllers/user");
const authUser = require("../../middlewares/auth");

router.get("/profile", authUser, getUserProfile);

router.get("/:id", getUserById);

router.put("/", authUser, updateUserDetails);

module.exports = router;
