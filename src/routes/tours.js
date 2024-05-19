const { getTours } = require("../utils/endpoints");

const { getResponse } = require("../services/tourService.js");

const router = require("express").Router();

//Endpoint to fetch tours
router.post(getTours, async (req, res) => {
  const { sourceCityId, destinationCityId, date } = req.body;

  try {
    res
      .status(200)
      .json(await getResponse(sourceCityId, destinationCityId, date));
  } catch (error) {
    console.error("Error fetching tours:", error);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
});

module.exports = router;
