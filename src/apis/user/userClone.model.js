/**
 * Message api models
 */

import mongoose from 'mongoose';

//Define a schema
var Schema = mongoose.Schema;

var UserCloneSchema = new Schema({
<<<<<<< HEAD
=======
    //id: Number,
>>>>>>> ae25a406aeb3072a3e91d49609f44fa826d4954c
    id: { type: Date, default: Date.now },
    name: String,
    email: String,
    phoneNo: Number,
    picUrl: String,
    description: String,
    status: String,
    waitingTime: Number,
    rating: Number,
    createdTime: Date,
    createdBy: String,
    updatedTime: Date,
    updatedBy: String
});

// Compile model from schema
var UserClone = mongoose.model('UserClone', UserCloneSchema);

module.exports = UserClone;