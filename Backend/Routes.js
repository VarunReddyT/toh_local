// ! red for titles and routes
// ^ yellow for normal comments declarations
// * green for comments in routes
// & pink for APIs and connections
// todo for pending tasks
// ~ for testing
// ? for random


// ! Routes.js
// ^ importing modules
const fs = require('fs').promises;
const fp = require('fs');
const cors = require('cors');
const express = require('express');
const multer = require('multer');
const path = require('path');
const mongoose = require('mongoose');
const axios = require('axios');
const TollData = require('./models/TollDataSch');
const app = express();
const blobUtil = require('blob-util');
// const { hostname } = require('os');
// const twilio = require('twilio');
// const dotenv = require('dotenv').config();

//~ console.log(window.location.pathname);
//~ console.log(window.location.origin);
//~ console.log(window.location.href);
//~ console.log(window.location.host);
//~ console.log(window.location.hostname);

// ^ defining port
const port = 4000;

// ^ CORS 
app.use(cors());

// & Multer config for TollUpload
const TollUp = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'TollUploads/');
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '.jpg');
  }
});
// const TollUp = multer.memoryStorage()
const Tollupload = multer({ storage: TollUp, limits: { fieldSize: 25 * 1024 * 1024 } })

// & Multer config for GuestUpload
const GuestUp = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'GuestUploads/');
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '.jpg');
  }
});
// const GuestUp = multer.memoryStorage()
const Guestupload = multer({ storage: GuestUp, limits: { fieldSize: 25 * 1024 * 1024 } })

// & MongoDB connection

//todo mongoose.connect('mongodb+srv://krishnamanoj:pvr@tires.rjqo4n7.mongodb.net/')
//todo mongo_local_uri = process.env.MONGO_LOCAL_URI;
//todo console.log(mongo_local_uri);
//todo mongo_atlas_uri = process.env.MONGO_ATLAS_URI;
//todo console.log(mongo_atlas_uri);

mongoose.connect("mongodb://127.0.0.1:27017/myFirst")
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Error connecting to MongoDB:', err));

// ^ Express config for parsing request body as JSON and serving static files
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

//! TollUpload Route
app.post('/tollupload', Tollupload.single("TolluploadImage"), async (req, res) => {
  console.log("TollUpload Route");
  // * getting data from request body
  const { vehicleNumber, userMobileNumber, userTyre64,date,tollPlaza } = req.body;

  // * reading image file from uploads folder in buffer and converting to blob
  const tollImagePath = path.join(__dirname, 'TollUploads', 'TolluploadImage.jpg');
  const tollImageBuffer = await fs.readFile(tollImagePath);
  // const file=req.files;
  // const tollImageBuffer = file[0].buffer;
  const tollBlob = blobUtil.createBlob([tollImageBuffer], { type: 'image/jpeg' });
  // * sending blob to flask api
  const tollFlaskRequestData = new FormData();
  tollFlaskRequestData.append('image', tollBlob, 'TolluploadImage.jpg');
  let tollFlaskResponse = null;

  const flask_port = 5000;


  try {
    console.log("Sending file to flask api. . . ");
    const tollResponse_flask = await axios.post(`http://127.0.0.1:${flask_port}/classify`, tollFlaskRequestData)
    classification_result = tollResponse_flask.data;
    console.log("Classification Result : ", classification_result);
    tollFlaskResponse = classification_result;

    // * checking if flask api returned error
    if (tollFlaskResponse["error"]) {
      console.log("Bad response from flask api");
      return res.status(500).send('Bad response from flask api');
    }

    try {

      //* defining schema for mongoDB
      const tollData = new TollData({
        date : date,
        vehicleNumber: vehicleNumber,
        userMobileNumber: userMobileNumber,
        userTyre64: userTyre64,
        tyreStatus: tollFlaskResponse,
        tollPlaza : tollPlaza,
      });

      // * saving to mongoDB
      await tollData.save();
      console.log('Data saved to MongoDB');
      res.send(`Data saved to MongoDB: ${JSON.stringify(tollData, null, 2)}`);
      // * error handling for mongoDB
    } catch (err) {
      console.error('Error saving data to MongoDB:', err);
      res.status(500).send('Error saving data to MongoDB');
    }

    // // * deleting tire image from TollUploads folder

    // //* Check if the file exists
    if (fp.existsSync(tollImagePath)) {
    //   //* Deleting the image and handling the errors
      fp.unlink(tollImagePath, (err) => {
        if (err) {
          console.error('Error deleting file:', err);
        } else {
          console.log('File deleted successfully.');
        }
      });
    } else {
      console.log('File not found');
    }

    // * error handling in sending file to flask api
  } catch (error) {
    console.error("Error sending file to flask_api :", error);
    return res.status(500).send('Error sending file to flask_api');
  }
});

// ! GuestUpload Route
app.post('/guestUp', Guestupload.any(), async (req, res) => {
  host = req.hostname;

  // originalUrl = req.originalUrl;
  // console.log(req.hostname);
  // console.log(req.originalUrl);
  // console.log(req.protocol + '://' + req.get('host') + req.originalUrl);

  console.log("GuestUpload Route");
  // * reading image file from uploads folder in buffer and converting to blob

  const guestBlobArray = [];

  const folderPath = path.join(__dirname, 'GuestUploads');
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

// ! GuestDetails Route
app.get('/guestDet', async (req, res) => {
  console.log("GuestDetails Route");
  try {
    // * getting data from request query parameters
    const vehicleNumber = req.query.vehicleNumber;
    console.log("Input : VehicleNo : ", vehicleNumber);
    // * getting data from mongoDB
    const tollData = await TollData.find({ vehicleNumber: vehicleNumber });
    // ~ console.log(tollData)
    console.log("Output : PhoneNo : ", tollData[0].userMobileNumber);
    console.log("Output : TyreStatus : ", tollData[0].tyreStatus);
    console.log("Output : Date : ",tollData[0].date);
    console.log("Output : TollPlaza : ",tollData[0].tollPlaza);
    console.log("Over")
    // * sending data to client
    res.send(tollData);
  }
  // * error handling in getting data from mongoDB
  catch (err) {
    console.error('Error getting data from MongoDB:', err);
    // res.status(500).send('Internal Server Error');
    res.send("No Data Found");
  }
});


app.get('/checkRecords',async(req,res)=>{
  
  try{
    date = req.query.date;
    tollPlaza = req.query.tollPlaza;
    console.log(date);

    try{
      const tollData = await TollData.find({date:date,tollPlaza:tollPlaza});
      console.log(tollData);
      const list1 = [];
      tollData.forEach((data)=>{
        list1.push(
          {
            'userMobileNumber' : data.userMobileNumber,
            'tyreStatus' : data.tyreStatus,
            'vehicleNumber' : data.vehicleNumber,
            'userTyre64' : data.userTyre64,
          }
        );
      });
      res.send(list1);
    }
    catch(err){
      console.log(err);
      res.send("No Data Found");
    }
  }
  catch(err){
    console.log(err);
  }

});

// ^ Server listening on port 4000
app.listen(port, () => console.log(`Server is listening on port ${port}`));



