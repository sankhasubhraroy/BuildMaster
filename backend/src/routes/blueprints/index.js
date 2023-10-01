const router = require("express").Router();
const {
  uploadBlueprint,
  deleteBlueprint,
} = require("../../controllers/blueprints");
const authUser = require("../../middlewares/auth");
const upload = require("../../middlewares/upload");

router.post("/", authUser, upload.single("blueprint"), uploadBlueprint);

router.delete("/:id", authUser, deleteBlueprint);

module.exports = router;
