/**
 * Message api models
 */

//Require Mongoose
var mongoose = require('mongoose');

//Define a schema
var Schema = mongoose.Schema;

var MessageSchema = new Schema({
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
    lastUpdateTime: Date,
    createdBy: String,
    updatedBy: String,
    createdBy: { type: Date, default: Date.now() },
    updatedTime: { type: Date }
});

// Compile model from schema
var Message = mongoose.model('Message', MessageSchema);

module.exports = Message;