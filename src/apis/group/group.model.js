/**
 * Group api models
 */

//Require Mongoose
var mongoose = require('mongoose');

//Define a schema
var Schema = mongoose.Schema;

var GroupSchema = new Schema({
    id: { type: Date, default: Date.now },
    userIds: [String],
    createdAt: Date
});

// Compile model from schema
var Group = mongoose.model('Group', GroupSchema);

module.exports = Group;