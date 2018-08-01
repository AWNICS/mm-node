/*
DAO for audit api
*/

import Audit from './audit.model';
import log from '../../config/log4js.config';

exports.create = (audit, callback) => {
    console.log('audit details: ' + JSON.stringify(audit));
    var auditData = new Audit(audit);
    //create a new audit
    auditData.save((err, audit) => {
        if (err) {
            callback(err);
        } else {
            callback(audit);
        }
    });
}

exports.getAll = (callback) => {
    // get all the audit info
    Audit.find({}, (err, audits) => {
        if (err) {
            callback(err);
        } else {
            callback(audits);
        }
    });
}

exports.getById = (id, callback) => {
    // get a specific the audit
    Audit.find({ _id: id }, (err, audit) => {
        if (err) {
            callback(err);
        } else {
            callback(audit);
        }
    });
}

exports.update = (audit, id, callback) => {
    var condition = { _id: id };
    var options = { new: true }; //multi: true, upsert: true

    Audit.findOneAndUpdate(condition, audit, options, (err, audit) => {
        if (err) {
            callback({ error: err });
        } else {
            callback({ message: 'Audit updated successfully' });
        }
    });
}

exports.delete = (id, callback) => {
    var condition = { _id: id };
    Audit.remove(condition, (err, audit) => {
        if (err) {
            callback({ error: err });
        } else {
            callback({ message: 'Audit deleted successfully' });
        }
    });
}