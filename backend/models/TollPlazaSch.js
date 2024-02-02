const mongoose = require('mongoose');

const PlazaSchema = new mongoose.Schema({
    username : String,
    password : {
        type : String,
        select : true
    }
}); 

const TollPlaza = mongoose.model('user', PlazaSchema);

module.exports = TollPlaza;