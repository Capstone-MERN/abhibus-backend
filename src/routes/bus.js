const { layout } = require("../endpoints");
const {
  findBusById,
  getBookedSeats,
  getSeatPrices,
  getSeatLayout,
} = require("../services/busService");

const router = require("express").Router();

//Endpoint for the seatLayout
router.get(layout, async (req, resp) => {
  const { tourId } = req.query;
  if (!tourId) {
    return resp.status(400).json({ message: "Invalid request" });
  }
  try {
    resp.status(200).json(await getSeatLayout(tourId));
  } catch (error) {
    resp.status(500).json({ message: error.message });
  }
});

module.exports = router;
