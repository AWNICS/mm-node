/**
 * Message api models
 */

//Require Mongoose
var mongoose = require('mongoose');

//Define a schema
var Schema = mongoose.Schema;

var MessageSchema = new Schema({
    _id: { type: Number, auto: true },
    receiverId: String,
    receiverType: String, // group or individual
    senderId: String, //userId
    picUrl: String,
    text: String,
    type: String,
    status: String,
    contentType: String,
    contentData: {
        data: [String]
    },
    responseData: {
        data: [String]
    },
    lastUpdateTime: Date
        /*
        createdBy, updatedBy, createdTime, updatedTime
        */
});

// Compile model from schema
var Message = mongoose.model('Message', MessageSchema);

module.exports = Message;