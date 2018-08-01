/**
 * Audit api models
 */

//Require Mongoose
var mongoose = require('mongoose');

//Define a schema
var Schema = mongoose.Schema;

var AuditSchema = new Schema({
    botId: Number,
    visitorId: Number, //visitor id
    docId: Number,
    mode: String, //for which phase this audit is 
    groupId: Number, //group created info
    visitorEntryTime: Date,
    doctorEntryTime: Date, //when the doctor joined this group
    botEntryTime: { type: Date, default: Date.now() }, //when the bot joined this group
    startTime: Date, //when the consultationPhase started
    endTime: Date, //when the consultationPhase ends
    botLastActiveTime: Date, //when the bot was active
    groupStatus: String, //if no conversation since 2 months(it may very) then set the status of group to closed else open
    doctorLastActiveTime: Date, //when the doctor has responded last
    visitorLastActiveTime: Date,
    visitorExitTime: Date, //when the visitor had exited from this phase
    doctorExitTime: Date, //when the doctor had exited from this phase
    createdBy: { type: Number, default: null },
    updatedBy: { type: Number, default: null },
    createdTime: { type: Date, default: Date.now() },
    updatedTime: { type: Date }
}, { collection: 'audit' });

// Compile model from schema
var Audit = mongoose.model('Audit', AuditSchema);

module.exports = Audit;