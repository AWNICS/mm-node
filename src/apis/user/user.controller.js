/**
 * controllers for user api
 */

var express = require('express');
var userRouter = express.Router();

var user = require('../apis/user/userDetails.controller');

userRouter.get('/controllers/getUserDetails', user.get);
userRouter.post('/controllers/postUserDetails', user.post);
userRouter.put('/controllers/putUserDetails/:id', user.put);
userRouter.delete('/controllers/removeUserDetails/:id', user.delete);

module.exports = userRouter;