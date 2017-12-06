var express = require('express');
var router = express.Router();

var message = require('./message.dao');

router.get('/controllers/getMessage', message.getAllMessages);

router.post('/controllers/postMessage', message.createMessage);

router.put('/controllers/putMessage/:id', message.updateMessage);

router.delete('/controllers/removeMessage/:id', message.deleteMessage);

router.get('/controllers/getMessageById/:id', message.getMessage);

module.exports = router;