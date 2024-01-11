const mongoose = require('mongoose');

const firstSchema = new mongoose.Schema({
    date : String,
    vehicleNumber: String,
    userMobileNumber: String,
    userTyre64: String,
    tyreStatus : Object,
    tollPlaza : String,
}); 

const TollData = mongoose.model('first', firstSchema);

module.exports = TollData;
