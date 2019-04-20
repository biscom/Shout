const mongoose = require('mongoose');
var Int32 = require('mongoose-int32');
const Schema = mongoose.Schema;

var modSchema = new mongoose.Schema({
   post_id: {
    type: Number,
    ref: Post
   },
    user_class: {
        type: String,
        required: true,
        default: 'Standard'
    },
    msg_volume: {
        type: Number,
        default: 0,
        required: true
    },
    univid: {
        type: Int32,
        ref: University,
        required: true
    },
    flagged: {
        type: Number,
        required: true
    },
    email: {
                                    
    },
    user_id: {
                                    
    }
                                    
})


var Moderation = mongoose.model('Moderation', modSchema);

module.exports = Moderation;