const router = require("express").Router();
const {
  getLogin,
  postLogin,
  getRegister,
  postRegister,
  logout,
} = require("../controllers/auth.controller");
const { verifyToken } = require("../middleware/auth.middleware");
router.get("/login", getLogin);
router.post("/login", postLogin);
router.get("/register", getRegister);
router.post("/register", postRegister);
router.get("/logout",verifyToken, logout);
module.exports = router;
    