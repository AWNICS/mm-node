/**
 * Message api models
 */

//Require Mongoose
var mongoose = require('mongoose');

//Define a schema
var Schema = mongoose.Schema;

var UserDetailsSchema = new Schema({
    id: Number,
    name: String,
    email: String,
    phoneNo: Number,
    picUrl: String,
    briefDescription: {
        description: String
    },
    status: String,
    waitingTime: Number,
    rating: Number,
    lastUpdateTime: Date
});

// Compile model from schema
var UserDetails = mongoose.model('UserDetails', UserDetailsSchema);

module.exports = UserDetails;