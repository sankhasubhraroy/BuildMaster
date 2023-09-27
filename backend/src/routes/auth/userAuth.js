const router = require("express").Router();
const register = require("../../controllers/auth/userAuth");

router.post("/register", register);

module.exports = router;
