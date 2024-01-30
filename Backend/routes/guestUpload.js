const fs = require('fs').promises;
const fp = require('fs');
const express = require('express');
const path = require('path');
const axios = require('axios');
const blobUtil = require('blob-util');
const router = express.Router();
const multer = require('multer');

const GuestUp = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'GuestUploads/');
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '.jpg');
  }
});
const Guestupload = multer({ storage: GuestUp, limits: { fieldSize: 25 * 1024 * 1024 } })
// ! GuestUpload Route
router.post('/guestUp', Guestupload.any(), async (req, res) => {
  host = req.hostname;

  // originalUrl = req.originalUrl;
  // console.log(req.hostname);
  // console.log(req.originalUrl);
  // console.log(req.protocol + '://' + req.get('host') + req.originalUrl);

  console.log("GuestUpload Route");
  // * reading image file from uploads folder in buffer and converting to blob

  const guestBlobArray = [];

  const folderPath = path.join('D:\\Programming\\PS\\toh_local_29_01\\backend', 'Guestuploads');
  // * Read the contents of the folder
  try {
    const files = await fs.readdir(folderPath);

    const imageFiles = files.filter(file => ['.jpg', '.png', '.jpeg'].includes(path.extname(file).toLowerCase()));
    const noOfImages = imageFiles.length;
    console.log("No of images : ", noOfImages);

    for (let i = 0; i < noOfImages; i++) {
      const guestImagePath = path.join(folderPath, imageFiles[i]); //* Use the actual filename from the filtered list
      const guestImageBuffer = await fs.readFile(guestImagePath);
      const guestBlob = blobUtil.createBlob([guestImageBuffer], { type: 'image/jpeg' });
      guestBlobArray.push(guestBlob);
    }

    // * sending blob to flask api
    const guestFlaskRequestData = new FormData();
    guestBlobArray.forEach((guestBlob) => {
      guestFlaskRequestData.append('image', guestBlob, 'guestTireImage.jpg');
    });

    const guestFlaskResponse = [];

    try {
      console.log("Sending file to flask api. . . ");
      // const guestResponse_flask = await axios.post(`https://pvrkmsbunny-7d36142f-d772-471e-bad2-ac78ca7ae3ad.socketxp.com/classify`, guestFlaskRequestData)
      const guestResponse_flask = await axios.post(`http://127.0.0.1:5000/classify`, guestFlaskRequestData)
      // const guestResponse_flask = await axios.post(` https://pvrkmsbunny-cf7ed4b3-e1b9-47ef-bfcf-885f50f91624.socketxp.com`, guestFlaskRequestData)
      for (let i = 0; i < noOfImages; i++) {
        guestFlaskResponse.push(guestResponse_flask.data[i]);
      }

      // * checking if flask api returned error
      if (guestFlaskResponse["error"]) {
        console.log("Bad response from flask api");
        return res.status(500).send('Bad response from flask api');
      }


      // * deleting tire image from GuestUploads folder

        // * Check if the file exists
        for(let i = 0; i < noOfImages; i++) {
          const guestImagePath = path.join(folderPath, imageFiles[i]);
        if (fp.existsSync(guestImagePath)) {
          //* Deleting the image and handling the errors
          fp.unlink(guestImagePath, (err) => {
            if (err) {
              console.error(`Error deleting file${i+1}:`, err);
            } else {
              console.log(`File${i+1} deleted successfully.`);
            }
          });
        } else {
          console.log(`File${i+1} not found`);
        }}

      return res.send(guestFlaskResponse);
    }
    // * error handling in sending file to flask api
    catch (error) {
      console.error("Error sending file to flask_api :", error);
      return res.status(500).send('Error sending file to flask_api');
    }
  } catch (err) {
    console.error('Error reading folder:', err);
    return res.status(500).send('Error reading folder');
  }
});

module.exports = router;