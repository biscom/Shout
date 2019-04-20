const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
University = require('./uniSchema'); 

var userSchema = mongoose.Schema({
   _id: mongoose.Schema.Types.ObjectId,
   username: {
    type: String,
    unique: true,
    index: {
        unique: true
    }
    },
    password: {
        type: String
    },
    nickname: {
        type: String
    },
    anon_status: {
        type: Boolean,
        default: true
    },
    univid: {
        type: Number,
        ref: University
    },
    flagged_num: {
        type: Number,
        default: 0
    },
    created: {
        type: Date.
    },
    user_type: {
        type: String,
        default: 'Standard User'
    },
    email: {
        type: String
    }
})

var User = mongoose.model('User', userSchema);

module.exports = User;