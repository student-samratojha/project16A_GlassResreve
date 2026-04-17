const router = require("express").Router();
const {
  getAddBookings,
  postAddBookings,
  confirmBooking,
  completeBooking,
  cancelBooking,
} = require("../controllers/booking.controller");
const {
  verifyToken,
  verifyUser,
  verifyAdmin,
} = require("../middleware/auth.middleware");
router.get("/add", verifyToken, verifyUser, getAddBookings);
router.post("/add", verifyToken, verifyUser, postAddBookings);
router.post("/confirm", verifyToken, verifyAdmin, confirmBooking);
router.post("/complete", verifyToken, verifyAdmin, completeBooking);
router.post("/cancel", verifyToken, cancelBooking);
module.exports = router;
