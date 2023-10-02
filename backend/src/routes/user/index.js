const router = require("express").Router();
const {
  getUserById,
  getUserProfile,
  updateUserDetails,
  updatePassword,
} = require("../../controllers/user");
const authUser = require("../../middlewares/auth");
const upload = require("../../middlewares/upload");

router.get("/profile", authUser, getUserProfile);

router.get("/:id", getUserById);

router.put("/", authUser, upload.single("avatar"), updateUserDetails);

router.post("/password", authUser, updatePassword);

module.exports = router;
