import express from 'express';
import ContactCareerService from './contact-career.service';

var router = express.Router();
var contactCareerService = new ContactCareerService();

//send contact us query email to the admin and a confirmation mail to the visitor
router.post('/contacts/email', function(req, res) {
    contactCareerService.contactEmail(req.body, (res) => {
        res.send({ message: "Contact email sent" });
    });
});

//send career mail to admin with pdf as attachment and a confirmation mail to the visitor
router.post('/careers/email', function(req, res) {
    contactCareerService.careerEmail(req.body, (res) => {
        res.send({ message: "Career email sent" });
    });
});

module.exports = router;