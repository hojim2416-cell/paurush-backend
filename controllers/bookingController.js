const Booking = require("../models/Booking");

// Book a Session
const createBooking = async (req, res) => {
  try {
    const { session } = req.body;

    // Check if already booked
    const existingBooking = await Booking.findOne({
      user: req.user.id,
      session,
    });

    if (existingBooking) {
      return res.status(400).json({
        success: false,
        message: "You have already booked this session.",
      });
    }

    const booking = await Booking.create({
      user: req.user.id,
      session,
    });

    res.status(201).json({
      success: true,
      message: "Session booked successfully",
      booking,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get My Bookings
const getMyBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user.id })
      .populate("session")
      .populate("user", "-password");

    res.status(200).json({
      success: true,
      count: bookings.length,
      bookings,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createBooking,
  getMyBookings,
};