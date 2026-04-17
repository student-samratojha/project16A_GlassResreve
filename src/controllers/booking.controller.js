const bookingModel = require("../db/models/booking.model");
const componentModel = require("../db/models/components.model");
const { auditLog } = require("./auth.controller");

async function getAddBookings(req, res) {
    const components = await componentModel.find({ status: "active"});
  res.render("addBooking", { title: "Add Booking" , components});
}

async function postAddBookings(req, res) {
  try {
    const { componentId, startDate, endDate } = req.body;
    const booking = await bookingModel.findOne({
      user: req.user._id,
      component: componentId,
      startDate,
      endDate,
    });
    if (booking) {
      await auditLog(
        req,
        "Failed booking attempt - booking already exists",
        null,
      );
      return res.status(400).json({ message: "Booking already exists" });
    }
    const newBooking = await bookingModel.create({
      user: req.user._id,
      component: componentId,
      startDate,
      endDate,
    });
    await auditLog(req, `Added booking: ${newBooking._id}`, req.user);
    res.redirect("/secure/user?success=1");
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
}

async function cancelBooking(req, res) {
  try {
    const { id } = req.body;
    const booking = await bookingModel.findById(id);
    if (!booking) {
      await auditLog(req, `Failed to cancel booking - not found`, req.user);
      return res.status(404).json({ message: "Booking not found" });
    }
    booking.status = "cancelled";
    await booking.save();
    await auditLog(req, `Cancelled booking: ${booking._id}`, req.user);
    res.redirect(`/secure/${req.user.role}?success=1`);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
}

async function confirmBooking(req, res) {
  try {
    const { id } = req.body;
    const booking = await bookingModel.findById(id);
    if (!booking) {
      await auditLog(req, `Failed to confirm booking - not found`, req.user);
      return res.status(404).json({ message: "Booking not found" });
    }

    booking.status = "confirmed";
    await booking.save();
    await auditLog(req, `Confirmed booking: ${booking._id}`, req.user);
    res.redirect("/secure/admin?success=1");
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
}

async function completeBooking(req, res) {
  try {
    const { id } = req.body;
    const booking = await bookingModel.findById(id);
    if (!booking) {
      await auditLog(req, `Failed to complete booking - not found`, req.user);
      return res.status(404).json({ message: "Booking not found" });
    }
    booking.status = "completed";
    await booking.save();
    await auditLog(req, `Completed booking: ${booking._id}`, req.user);

    res.redirect("/secure/admin?success=1");
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
}

module.exports = {
  getAddBookings,
  postAddBookings,
  confirmBooking,
  completeBooking,
  cancelBooking,
};
