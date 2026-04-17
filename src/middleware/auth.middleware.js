const jwt = require("jsonwebtoken");
const userModel = require("../db/models/user.model");
async function verifyToken(req, res, next) {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.redirect("/auth/login");
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await userModel.findById(decoded.userId);
    if (!user) {
      res.clearCookie("token");
      return res.redirect("/auth/login");
    }
    req.user = user;
    next();
  } catch (error) {
    res.clearCookie("token");
    return res.redirect("/auth/login");
  }
}

async function verifyAdmin(req, res, next) {
  try {
    if (req.user && req.user.role === "admin") {
      return next();
    } else {
      res.clearCookie("token");
      return res.redirect("/auth/login");
    }
  } catch (error) {
    res.clearCookie("token");
    return res.redirect("/auth/login");
  }
}

async function verifyUser(req, res, next) {
  try {
    if (req.user && req.user.role === "user") {
      return next();
    } else {
      res.clearCookie("token");
      return res.redirect("/auth/login");
    }
  } catch (error) {
    res.clearCookie("token");
    return res.redirect("/auth/login");
  }
}
module.exports = {
  verifyToken,
  verifyAdmin,
  verifyUser,
};
