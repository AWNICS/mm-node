/**
 * Message api models
 */

//Require Mongoose
var mongoose = require('mongoose');

//Define a schema
var Schema = mongoose.Schema;

var MessageSchema = new Schema({
    receiverId: Number,
    receiverType: String, // group or individual
    senderId: Number, //userId
    senderName: String, //message sender name
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
    createdBy: { type: Number, default: null },
    updatedBy: { type: Number, default: null },
    createdTime: { type: Date, default: Date.now() },
    updatedTime: { type: Date }
}, { collection: 'message' });

// Compile model from schema
var Message = mongoose.model('Message', MessageSchema);

module.exports = Message;