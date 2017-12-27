/**
 * GroupUserMapClone api models
 */

//Require Mongoose
import mongoose from 'mongoose';

//Define a schema
var Schema = mongoose.Schema;

var GroupUserMapCloneSchema = new Schema({
    id: { type: Date, default: Date.now },
    groupId: String,
    userId: String,
    createdBy: String,
    updatedBy: String,
    createdTime: { type: Date, default: Date.now }, // timestamp
    updatedTime: { type: Date }
});

// Compile model from schema
var GroupUserMapClone = mongoose.model('GroupUserMapClone', GroupUserMapCloneSchema);

module.exports = GroupUserMapClone;