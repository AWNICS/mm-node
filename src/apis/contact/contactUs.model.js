/**
 * contact api models
 */

//Require Mongoose
var mongoose = require('mongoose');

//Define a schema
var Schema = mongoose.Schema;

var ContactSchema = new Schema({
    id: { type: Date, default: Date.now },
    name: String,
    picUrl: String,
    regNo: String,
    briefDescription: {
        speciality: String,
        experience: Number,
        description: String
    },
    contact: {
        phone: String,
        email: String
    },
    status: String,
    waitingTime: Number,
    rating: Number,
    videoUrl: String,
    appearUrl: String,
    thumbnailUrl: String,
    lastUpdateTime: Date,
    termsAccepted: Boolean
});

// Compile model from schema
var Contact = mongoose.model('Contact', ContactSchema);

module.exports = Contact;