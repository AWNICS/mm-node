/**
 * group-message-map api models
 */

//Require Mongoose
import mongoose from 'mongoose';

//Define a schema
var Schema = mongoose.Schema;

var GroupMessageMapSchema = new Schema({
    messageId: { type: Date, default: null },
    groupId: String,
    userSId: String,
    createdBy: String,
    updatedBy: String,
    createdTime: { type: Date, default: Date.now },
    updatedTime: { type: Date, default: Date.now }
});

// Compile model from schema
var GroupMessageMap = mongoose.model('GroupMessageMap', GroupMessageMapSchema);

module.exports = GroupMessageMap;