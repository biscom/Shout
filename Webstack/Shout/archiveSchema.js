const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var archiveSchema = new mongoose.Schema({
   _id: mongoose.Schema.Types.ObjectId,
   user_id: {
    type: String,
    ref: User
   },
    msg_body: {
        type: String,
        required: true
    },
    timestamp: {
        type: Date,
        default: Date.now,
        required: true
    },
    location: {
        
        lat: {
            type: Schema.Types.Mixed,
            required: true
        },
        lon: {
            type: Schema.Types.Mixed,
            required: true
        },                        
        city: {
            type: String,
            required: true
        }, 
        state: {
            type: String,
            required: true
        }, 
        zip: {
            type: String,
            required: true
        }, 
    },
    archived: {
        type: String,
        default: false
        required: true
    },
    flagged: {
        type: String,
        default: false
        required: true
    },
    msg_volume: {
        type: Number,
        default: 0
        required: true
    },
})


var Achive = mongoose.model('Archive', archiveSchema);

module.exports = Archive;