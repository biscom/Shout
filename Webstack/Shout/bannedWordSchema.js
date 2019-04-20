const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var bannedWordSchema = new mongoose.Schema({
   _id: mongoose.Schema.Types.ObjectId,
   word: {
    type: String,
   }
})


var bannedWord = mongoose.model('bannedWord', bannedWordSchema);

module.exports = bannedWord;