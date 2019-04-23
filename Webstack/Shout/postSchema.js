const mongoose = require('mongoose');
var Int32 = require('mongoose-int32');
const Schema = mongoose.Schema;
var User = require('./userSchema');

var postSchema = new mongoose.Schema({
   user_id: {
    type: mongoose.Schema.Types.ObjectId,
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
    comments: {
        type: Array
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
        default: 0
    },
    dislikes: {
        type: Number,
        default: 0
    },
    likes_by_user: {
        type: Array
    },
    dislikes_by_user: {
        type: Array
    },
})

var Post = mongoose.model('Post', postSchema);

module.exports = Post;