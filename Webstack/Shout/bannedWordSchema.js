const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var bannedWordSchema = new mongoose.Schema({
   word: {
    type: String,
   }
})


var bannedWord = mongoose.model('bannedWord', bannedWordSchema);

module.exports = bannedWord;