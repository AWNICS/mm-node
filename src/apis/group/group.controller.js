var express = require('express');
var router = express.Router();

var group = require('./group.dao');

router.get('/controllers/getAllGroups', group.getAllGroups);
router.post('/controllers/postGroup', group.createGroup);
router.put('/controllers/putGroup/:id', group.updateGroup);
router.delete('/controllers/removeGroup/:id', group.deleteGroup);
router.get('/controllers/getGroupById/:id', group.getGroup);

module.exports = router;