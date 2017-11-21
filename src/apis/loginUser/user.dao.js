// Require model
var User = require('./user.model');
const log = require('../../config/log4js.config');

var user = new User({
    name: 'Jack Dawson',
    password: 'titanic',
    admin: true
});

exports.createUser = (req, res) => {
    user.save(function(err) {
        if (err) throw err;

        log.info('User saved successfully');
        res.json({ success: true });
    });
}

exports.getUsers = (req, res) => {
    User.find({}, function(err, users) {
        if (err) throw err;

        log.info('Users called successfully');
        res.json(users);
    });
}