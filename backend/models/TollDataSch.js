const mongoose = require('mongoose');

const firstSchema = new mongoose.Schema({
    date: {
        type: String,
        default: () => new Date().toISOString().split('T')[0]
    },

    vehicleNumber: String,
    userMobileNumber: String,
    userTyre64: Object,
    tyreStatus: Object,
    tollPlaza : String
});

const TollData = mongoose.model('first', firstSchema);

module.exports = TollData;