const express = require('express');
const router = express.Router();
const TollData = require('../models/TollDataSch');
// const auth = require('../middleware/tollAuth');
const cookieParser = require('cookie-parser');
const cors = require('cors');
router.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
}));
router.use(cookieParser());
// ! CheckRecords Route
router.get('/checkRecords',async (req, res) => {
    try {
        const date = req.query.date;
        const tollPlaza = req.query.tollPlaza;
        console.log(date);
        try {
            const tollData = await TollData.find({ date: date, tollPlaza: tollPlaza });
            console.log(tollData);
            const list1 = [];
            tollData.forEach((data) => {
                list1.push(
                    {
                        'userMobileNumber': data.userMobileNumber,
                        'tyreStatus': data.tyreStatus,
                        'vehicleNumber': data.vehicleNumber,
                    }
                );
            });
            res.send(list1);
        }
        catch (err) {
            console.log(err);
            res.send("No Data Found");
        }
    }
    catch (err) {
        console.log(err);
    }
});

module.exports = router;
