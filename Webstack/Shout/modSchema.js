const mongoose = require('mongoose');
var Int32 = require('mongoose-int32');
const Schema = mongoose.Schema;

var modSchema = new mongoose.Schema({
   _id: mongoose.Schema.Types.ObjectId,
   post_id: {
    type: String,
    ref: Post
   },
    user_class: {
        type: String,
        required: true,
        default: 'Standard'
    },
    msg_volume: {
        type: Number,
        default: 0
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
    univid: {
        type: Int32,
        ref: University,
        required: true
    },
    flagged: {
        type: String,
        default: false
        required: true
    }
})


var Moderation = mongoose.model('Moderation', modSchema);

module.exports = Moderation;