const router = require("express").Router();
const {
  getAddComponent,
  postAddComponent,
  getEditComponent,
  postEditComponent,
  deleteComponent,
  getRestoreComponent,
} = require("../controllers/component.controller");
const { verifyToken, verifyAdmin } = require("../middleware/auth.middleware");
router.get("/add", verifyToken, verifyAdmin, getAddComponent);
router.post("/add", verifyToken, verifyAdmin, postAddComponent);
router.get("/edit/:id", verifyToken, verifyAdmin, getEditComponent);
router.post("/edit", verifyToken, verifyAdmin, postEditComponent);
router.post("/delete", verifyToken, verifyAdmin, deleteComponent);
router.post("/restore", verifyToken, verifyAdmin, getRestoreComponent);

module.exports = router;
