const express = require('express');
const router = express.Router();
const cors = require('cors');
const axios = require('axios');
const bodyParser = require('body-parser');
const FeedbackData = require('../models/FeedbackSch');

router.use(bodyParser.json());
router.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
}));

router.post('/feedback', async (req, res) => {
    console.log("Feedback Route");
    const { name, email, feedback } = req.body;
    console.log(name, email, feedback); 

    const saveData = new FeedbackData({
        name:name,
        email:email,
        feedback:feedback
    });
    try{
        await saveData.save();
        console.log("Feedback saved successfully");
    }
    catch(e){
        console.log("Error saving feedback: ", e);
    }

});

module.exports = router;