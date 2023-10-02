const router = require("express").Router();
const { getDashBoardData } = require("../../controllers/admin");
const authUser = require("../../middlewares/auth");

router.get("/dashboard", authUser, getDashBoardData);

module.exports = router;
