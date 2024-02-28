const mongoose = require('mongoose');

const firstSchema = new mongoose.Schema({
    name : String,
    email : String,
    feedback : String
});

const TollData = mongoose.model('feedback', firstSchema);

module.exports = TollData;