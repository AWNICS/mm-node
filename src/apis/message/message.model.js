/**
 * Message api models
 */

//Require Mongoose
var mongoose = require('mongoose');

//Define a schema
var Schema = mongoose.Schema;

var MessageSchema = new Schema({
    id: { type: Date, default: Date.now },
    receiverId: String,
    senderId: String,
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
});

// Compile model from schema
var Message = mongoose.model('Message', MessageSchema);

module.exports = Message;