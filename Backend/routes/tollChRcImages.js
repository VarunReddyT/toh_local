const express = require('express');
const router = express.Router();
const TollData = require('../models/TollDataSch');
const auth = require('../middleware/tollAuth');
const cookieParser = require('cookie-parser');
const cors = require('cors');
router.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
}));
router.use(cookieParser());
// ! CheckRecords GetImage Route
router.get('/getIm', auth, async (req, res) => {
    try {
        const { date, tollPlaza, vehicleNumber } = req.query;
        console.log(date);
        const list = [];
        try {
            const tollData = await TollData.findOne({ date: date, tollPlaza: tollPlaza, vehicleNumber: vehicleNumber });
            // console.log(tollData.vehicleNumber);
            const imgSrc = tollData.userTyre64;
            const status = tollData.tyreStatus;
            list.push(imgSrc);
            list.push(status);
            res.send(list);
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