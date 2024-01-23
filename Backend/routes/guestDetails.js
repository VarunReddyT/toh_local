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
      console.log("Input : VehicleNo : ", vehicleNumber);
      const tollData = await TollData.find({ vehicleNumber: vehicleNumber });
      console.log("Output : PhoneNo : ", tollData[0].userMobileNumber);
      console.log("Output : TyreStatus : ", tollData[0].tyreStatus);
      console.log("Output : TollPlaza : ", tollData[0].tollPlaza);
      console.log("Output : Date : ", tollData[0].date);
      console.log("Over")
      res.send(tollData);
    }
    catch (err) {
      console.error('Error getting data from MongoDB:', err);
      // res.status(500).send('Internal Server Error');
      res.send("No Data Found");
    }
  });
module.exports = router;
