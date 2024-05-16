const { getTours } = require("../endpoints");

const {findTours, findStopPointsByCityId, findCityName } = require("../services/tourService.js");
  
const router = require("express").Router();

//Endpoint to fetch tours
router.post(getTours, async (req, res) => {
  const { sourceCityId, destinationCityId, date } = req.body;

    try{

      const sourceCity = await findCityName(sourceCityId) 

      const destinationCity = await findCityName(destinationCityId)

      const tours = await findTours(sourceCityId, destinationCityId, date);

      const sourceStopPoints = await findStopPointsByCityId(sourceCityId);

      const destinationStopPoints = await findStopPointsByCityId(destinationCityId);

      const response = {
        sourceCity, 
        destinationCity,
        boardingPoints: sourceStopPoints,
        droppingPoints: destinationStopPoints,
        tours: tours
      };
  
      res.status(200).json(response);

    } catch (error) {
      console.error('Error fetching tours:', error);
      res.status(500).send('Internal Server Error');
    }
 }
)
