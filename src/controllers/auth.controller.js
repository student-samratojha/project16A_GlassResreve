const userModel = require("../db/models/user.model");
const auditModel = require("../db/models/audit.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
async function auditLog(req, action, user) {
  try {
    const userId = req && req.user ? req.user._id : user ? user._id : null;
    await auditModel.create({
      user: userId,
      route: req.originalUrl,
      method: req.method,
      ip: req.ip,
      action: action,
    });
  } catch (err) {
    console.log(err);
  }
}

async function getRegister(req, res) {
  res.render("register", { title: "Register" });
}

async function postRegister(req, res) {
  try {
    const { username, email, password } = req.body;
    const user = await userModel.findOne({ email });
    if (user) {
      await auditLog(
        req,
        "Failed registration attempt - user already exists",
        user,
      );
      return res.status(400).json({ message: "User already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await userModel.create({
      username,
      email,
      password: hashedPassword,
    });
    await auditLog(req, "Successful registration", newUser);
    res.redirect("/auth/login?success=1");
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
}

async function getLogin(req, res) {
  res.render("login", { title: "Login" });
}

async function postLogin(req, res) {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });
    if (!user) {
      await auditLog(req, "Failed login attempt - user not found", null);
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      await auditLog(req, "Failed login attempt - invalid password", user);
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" },
    );
    await auditLog(req, "Successful login", user);
    res.cookie("token", token, { httpOnly: true });
    res.redirect(`/secure/${user.role}?Welcome=${user.username}`);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
}

async function logout(req, res) {
  try {
    res.clearCookie("token");
    await auditLog(req, "Successful logout", req.user);
    res.redirect("/auth/login?logout=1");
  } catch (err) {
    console.log(err);
  }
}

module.exports = {
  getRegister,
  postRegister,
  auditLog,
  getLogin,
  postLogin,
  logout,
};
