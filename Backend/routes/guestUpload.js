const express = require('express');
const router = express.Router();
const multer = require('multer');
const blobUtil = require('blob-util');
const axios = require('axios');

// & Multer config for GuestUpload
const GuestUp = multer.memoryStorage();
const Guestupload = multer({ storage: GuestUp, limits: { fieldSize: 25 * 1024 * 1024 } })


// ! GuestUpload Route
router.post('/guestUp', Guestupload.any(), async (req, res) => {
    console.log("GuestUpload Route");
    try {
      const files = req.files;
      const guestBlobArray = [];
      for (let i = 0; i < files.length; i++) {
        const guestImageBuffer = files[i].buffer;
        const guestBlob = blobUtil.createBlob([guestImageBuffer], { type: 'image/jpeg' });
        guestBlobArray.push(guestBlob);
      }
      const guestFlaskRequestData = new FormData();
      guestBlobArray.forEach((guestBlob) => {
        guestFlaskRequestData.append('image', guestBlob, 'guestTireImage.jpg');
      });
      try {
        const guestFlaskResponse = [];
        const guestResponse_flask = await axios.post("http://localhost:5000/classify", guestFlaskRequestData);
        for (let i = 0; i < files.length; i++) {
          guestFlaskResponse.push(guestResponse_flask.data[i]);
        }
        if (guestFlaskResponse["error"]) {
          return res.status(500).send('Bad response from flask api');
        }
        console.log(guestFlaskResponse);
        return res.send(guestFlaskResponse);
      }
      catch (error) {
        return res.status(500).send('Error sending file to flask_api');
      }
    } catch (err) {
      return res.status(500).send('Error reading files');
    }
  });
  module.exports = router;