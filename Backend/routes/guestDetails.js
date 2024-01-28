const express = require('express');
const router = express.Router();
const cors = require('cors');
const TollData = require('../models/TollDataSch');
router.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
}));

// ! GuestDetails Route
router.get('/guestDet', async (req, res) => {
    console.log("GuestDetails Route");
    try {
      const vehicleNumber = req.query.vehicleNumber;

      const tollData = await TollData.findOne({ vehicleNumber: vehicleNumber });
      console.log(tollData);
      if (!tollData) {
        console.log("No Data Found");
        return res.send("No Data Found");
      }
      res.send(tollData);
    }
    catch (err) {
      console.log("Error from MongoDB",err);
      res.send(err);
    }
  });
module.exports = router;