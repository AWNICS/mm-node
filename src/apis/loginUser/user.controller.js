var express = require('express');
var router = express.Router();

var user = require('./user.dao');
var auth = require('./user.service');

router.get('/controllers/newUser', user.createUser);
router.post('/authenticate', auth.auth);

router.use(auth.middleWare);

router.get('/controllers/getUsers', user.getUsers);
module.exports = router;