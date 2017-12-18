import express from 'express';
import ContactDao from './contactUs.dao';
var router = express.Router();
var contactDao = new ContactDao();

router.post('/controllers/createContact', contactDao.insert);

router.get('/controllers/getContacts', contactDao.readAll);

module.exports = router;