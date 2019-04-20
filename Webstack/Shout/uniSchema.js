const mongoose = require('mongoose');
var Int32 = require('mongoose-int32');
const Schema = mongoose.Schema;

var uniSchema = new mongoose.Schema({
   univid: {
    type: Int32,
    required: true
   },
    uni_name: {
        type: String,
        required: [true, 'University name is required']
    },
    logo_url: {
        type: String,
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
    num_users: {
        type: Int32
    }
})


var University = mongoose.model('University', uniSchema);

module.exports = University;