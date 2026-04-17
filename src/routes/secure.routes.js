const router = require("express").Router();
const {
  getAdmin,
  getSecure,
  deleteUser,
  restoreUser,
} = require("../controllers/secure.controller");
const {
  verifyToken,
  verifyAdmin,
  verifyUser,
} = require("../middleware/auth.middleware");
router.get("/admin", verifyToken, verifyAdmin, getAdmin);
router.get("/user", verifyToken, verifyUser, getSecure);
router.post("/delete", verifyToken, verifyAdmin, deleteUser);
router.post("/restore", verifyToken, verifyAdmin, restoreUser);
module.exports = router;
