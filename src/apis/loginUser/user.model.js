var mongoose = require('mongoose');

// User Schema
var UserSchema = mongoose.Schema({
    name: String,
    password: String,
    admin: Boolean
});

var User = module.exports = mongoose.model('User', UserSchema);