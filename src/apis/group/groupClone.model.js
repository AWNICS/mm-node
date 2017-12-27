/**
 * GroupClone api models
 */

//Require Mongoose
import mongoose from 'mongoose';

//Define a schema
var Schema = mongoose.Schema;

var GroupCloneSchema = new Schema({
    id: { type: Date, default: Date.now },
    userIds: String,
    createdBy: String,
    updatedBy: String,
    createdTime: { type: Date, default: Date.now }, // timestamp
    updatedTime: { type: Date }
});

// Compile model from schema
var GroupClone = mongoose.model('GroupClone', GroupCloneSchema);

module.exports = GroupClone;