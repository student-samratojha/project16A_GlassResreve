const userModel = require("../db/models/user.model");
const auditModel = require("../db/models/audit.model");
const componentModel = require("../db/models/components.model");
const bookingModel = require("../db/models/booking.model");
const { auditLog } = require("./auth.controller");

async function getAdmin(req, res) {
  try {
    const user = await userModel.find();
    const audits = await auditModel
      .find()
      .populate("user", "username email")
      .sort({ createdAt: -1 })
      .limit(100);
      const components = await componentModel.find();
      const bookings = await bookingModel.find().populate("user", "username email").populate("component", "name");
    res.render("admin", {
      title: "Admin Dashboard",
      users: user,
      audits,
      components,bookings,
      admin: req.user,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
}

async function getSecure(req, res) {
  try {
    const bookings = await bookingModel.find({ user: req.user._id }).populate("component", "name");
    res.render("secure", { title: "Secure Page", user: req.user, bookings });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
}

async function deleteUser(req, res) {
  try {
    const { id } = req.body;
    const user = await userModel.findById(id);
    if (!user) {
      await auditLog(
        req,
        "Failed user deletion attempt - user not found",
        null,
      );
      return res.status(404).json({ message: "User not found" });
    }
    user.status = "inactive";
    await user.save();
    await auditLog(req, "Successful user deletion", user);
    res.redirect("/secure/admin?success=1");
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
}
async function restoreUser(req, res) {
  try {
    const { id } = req.body;
    const user = await userModel.findById(id);

    if (!user) {
      await auditLog(req, "Failed user restore attempt - user not found", null);
      return res.status(404).json({ message: "User not found" });
    }
    user.status = "active";
    await user.save();
    await auditLog(req, "Successful user restore", user);
    res.redirect("/secure/admin?success=1");
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
}

module.exports = {
  getAdmin,
  getSecure,
  deleteUser,
  restoreUser,
};
