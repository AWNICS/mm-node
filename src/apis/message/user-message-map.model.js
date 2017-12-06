/**
 * user-message-map api models
 */

//Require Mongoose
import mongoose from 'mongoose';

//Define a schema
var Schema = mongoose.Schema;

var UserMessageMapSchema = new Schema({
    userRId: String,
    userSId: String,
    MessageId: String
});

// Compile model from schema
var UserMessageMap = mongoose.model('UserMessageMap', UserMessageMapSchema);

module.exports = UserMessageMap;