const router = require("express").Router();
const { createAdmin, login } = require("../../controllers/auth/adminAuth");
const authUser = require("../../middlewares/auth");

router.post("/", authUser, createAdmin);

router.post("/login", login);

module.exports = router;
