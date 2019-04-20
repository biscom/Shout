const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var User = require('./userSchema');

var postSchema = new mongoose.Schema({
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
    univid: {
        type: Int32,
        ref: User
    },
    comment_of: {
        type: Array
    }
    },
    archived: {
        type: Boolean,
        default: false,
        required: true
    },
    flagged: {
        type: Number,
        default: false,
        required: 0
    },
    likes: {
        type: Number,
        default: 0,
        required: true
    },
    dislikes: {
        type: Number,
        default: 0,
        required: true
    },
})
})


var Post = mongoose.model('Post', postSchema);

module.exports = Post;