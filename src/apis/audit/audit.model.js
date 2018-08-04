/**
 * Audit api models
 */

//Require Mongoose
var mongoose = require('mongoose');

//Define a schema
var Schema = mongoose.Schema;

var AuditSchema = new Schema({
    senderId: Number,
    receiverId: Number, //visitor id
    receiverType: String,
    mode: String, //for which phase this audit is 
    entityName: String, //{ visitor, doc, group },
    entityEvent: String, //{ add, remove },
    groupId: Number, //group created info
    createdBy: { type: Number, default: null },
    updatedBy: { type: Number, default: null },
    createdTime: { type: Date, default: Date.now() },
    updatedTime: { type: Date }
}, { collection: 'audit' });

// Compile model from schema
var Audit = mongoose.model('Audit', AuditSchema);

module.exports = Audit;