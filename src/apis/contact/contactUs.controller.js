import express from 'express';
import ContactService from './contactUs.service';

var router = express.Router();
var contactService = new ContactService();

//for creating a new contact
router.post('/controllers/createContact', function(req, res) {
    var contact = req.body;
    contactService.create(contact, (result) => {
        res.send('Contact created: ' + JSON.stringify(result));
    });
});

//for getting all contacts
router.get('/controllers/getContacts', function(req, res) {
    contactService.getAll((result) => {
        res.send('All contact lists: ' + JSON.stringify(result));
    });
});

//getting contacts based on id
router.get('/controllers/getContactById/:id', function(req, res) {
    var id = req.params.id;
    contactService.getById(id, (result) => {
        res.send('Read contact by id: ' + JSON.stringify(result));
    });
});

//update contact
router.put('/controllers/putContact', function(req, res) {
    var contact = req.body;
    contactService.update(contact, (result) => {
        res.send('Contact updated' + JSON.stringify(result));
    });
});

//delete contact
router.delete('/controllers/deleteContact/:id', function(req, res) {
    var id = req.params.id;
    contactService.delete(id, (result) => {
        res.send('User deleted: ' + JSON.stringify(result));
    });
});

module.exports = router;