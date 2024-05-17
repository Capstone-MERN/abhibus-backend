const { cities } = require("../endpoints.js");
const router = require("express").Router();
const { findCities } = require("../services/citiesServices.js");

router.get(cities, async (req, resp) => {
  try {
    const cities = await findCities();
    return resp.status(200).json({ cities });
  } catch (error) {
    return resp.status(500).json({ message: error.message });
  }
});

module.exports = router;
