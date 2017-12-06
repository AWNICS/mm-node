/**
 * group-message-map api models
 */

//Require Mongoose
import mongoose from 'mongoose';

//Define a schema
var Schema = mongoose.Schema;

var GroupMessageMapSchema = new Schema({
    groupId: String,
    userSId: String,
    messageId: String
});

// Compile model from schema
var GroupMessageMap = mongoose.model('GroupMessageMap', GroupMessageMapSchema);

module.exports = GroupMessageMap;