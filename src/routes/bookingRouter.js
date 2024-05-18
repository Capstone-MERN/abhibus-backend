const express = require('express');
const BookingRouter = express.Router();
const isAuth = require('../middleware/isAuth'); 
const { getResponse } = require('../services/bookingService'); 
const endpoints = require('../utils/endpoints')

BookingRouter.post(endpoints.book, isAuth, async (req, res) => {
  try {
    const { tourId, seats } = req.body;

    if (!tourId || !seats || seats.length === 0) {
      return res.status(400).json({
        message: "Invalid request",
      });
    }

    const response = await getResponse(tourId, seats)

    res.status(201).json({
      message: "Booking Successful",
      data: response,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

module.exports = BookingRouter;

