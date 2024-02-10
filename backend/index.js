const express = require('express');
const router = express.Router();
const cors = require('cors');
const mongoose = require('mongoose');
const guestDetails = require('./routes/guestDetails.js');
const guestUpload = require('./routes/guestUpload.js'); 
const tollCheckRecords = require('./routes/tollCheckRecords.js');
const tollLogin = require('./routes/tollLogin.js');
const tollLogout = require('./routes/tollLogout.js');
const tollUpload = require('./routes/tollUpload.js');
const tollChRcImages = require('./routes/tollChRcImages.js');
const statistics = require('./routes/statistics.js')
const app = express();
const dotenv = require('dotenv').config;

// ^ defining port
const port = 4000;

// ^ CORS 
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
}));

// & MongoDB connection
mongoose.connect('mongodb://127.0.0.1:27017/myFirst')
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Error connecting to MongoDB:', err));

// ^ Express config for parsing request body as JSON
app.use(express.urlencoded({ extended: true }));  
app.use(router);

router.get('/guestDet' ,guestDetails);
router.post('/guestUp', guestUpload);
router.get('/checkRecords', tollCheckRecords);
router.post('/login', tollLogin);
router.get('/logout', tollLogout);
router.post('/tollupload', tollUpload);
router.get('/getIm', tollChRcImages);
router.get('/stats', statistics);

// ^ Server listening on port 4000
app.listen(port, () => console.log(`Server is listening on port ${port}`));