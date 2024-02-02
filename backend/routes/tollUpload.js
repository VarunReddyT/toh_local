const express = require('express');
const router = express.Router();
const multer = require('multer');
const TollData = require('../models/TollDataSch');
const auth = require('../middleware/tollAuth');
const cors = require('cors');
const axios = require('axios');
const blobUtil = require('blob-util');
const cookieparser = require('cookie-parser')
const dotenv = require('dotenv');
router.use(cookieparser());

// ^ CORS 
router.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
}));

// & Multer config for TollUpload
const TollUp = multer.memoryStorage();
const Tollupload = multer({ storage: TollUp, limits: { fieldSize: 25 * 1024 * 1024 } })

//! TollUpload Route
router.post('/tollupload', auth, Tollupload.any(), async (req, res) => {
    console.log("TollUpload Route");
    const { vehicleNumber, userMobileNumber, date, tollPlaza } = req.body;
    const tollBlobArray = [];
    const files = req.files;
    const b64Array = [];
    for (let i = 0; i < files.length; i++) {
        b64Array.push(files[i].buffer.toString('base64'));
    }
    // console.log(b64Array[0]);
    for (let i = 0; i < files.length; i++) {
        const tollImageBuffer = files[i].buffer;
        const tollBlob = blobUtil.createBlob([tollImageBuffer], { type: 'image/jpeg/jpg/png' });
        tollBlobArray.push(tollBlob);
    }
    const tollFlaskRequestData = new FormData();
    tollBlobArray.forEach((tollBlob) => {
        tollFlaskRequestData.append('image', tollBlob, 'TolluploadImage.jpg');
    });
    const tollFlaskResponse = [];
    try {
        console.log("Sending file to flask api. . . ");
        const tollResponse_flask = await axios.post('http://127.0.0.1:5000/classify', tollFlaskRequestData)
        for (let i = 0; i < files.length; i++) {
            tollFlaskResponse.push(tollResponse_flask.data[i]);
        }
        if (tollFlaskResponse["error"]) {
            console.log("Bad response from flask api");
            return res.status(500).send('Bad response from flask api');
        }
        try {
            const tollData = new TollData({
                date: date,
                vehicleNumber: vehicleNumber,
                userMobileNumber: userMobileNumber,
                userTyre64: b64Array,
                tyreStatus: tollFlaskResponse,
                tollPlaza: tollPlaza,
            });
            let msgs = '';
            await tollData.save();
            for(let i = 0; i<tollFlaskResponse.length; i++){
                msgs = msgs + `Tyre ${i+1}: ${tollFlaskResponse[i].class}\n`;
            }
            sendSMS(date,vehicleNumber,userMobileNumber,tollPlaza,msgs);
            console.log('Data saved to MongoDB');
            // res.send(Data saved to MongoDB: ${JSON.stringify(tollData, null, 2)});
            res.send("Data saved to MongoDB");
        } catch (err) {
            console.error('Error saving data to MongoDB:', err);
            res.status(500).send('Error saving data to MongoDB');
        }
    } catch (error) {
        console.error("Error sending file to flask_api :", error);
        res.status(500).send('Error sending file to flask_api');

    }
    function sendSMS(date,vehicleNumber,userMobileNumber,tollPlaza,msgs) {
        const accountSid = `${process.env.TWILIO_ACCOUNT_SID}`;
        const authToken = `${process.env.TWILIO_AUTH_TOKEN}`;
        const client = require('twilio')(accountSid, authToken);
        userMobileNumber = '+91'+String(userMobileNumber);
        console.log(userMobileNumber);
        client.messages
            .create({
                body: `Date: ${date}\nVehicle Number: ${vehicleNumber}\nToll Plaza: ${tollPlaza}\nTyre Status: ${msgs}`,
                from: '+13344543086',
                to: userMobileNumber,
            })
    }
}
);

module.exports = router;