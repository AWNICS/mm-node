import log from '../config/log4js.config';
import ContactService from '../apis/contact/contactUs.service';
var expect = require('expect.js');

var contactService = new ContactService();

describe('contactDao', function() {
    describe('#insert()', function() {
        xit('creates a contact', function() {
            var contact = {
                id: null,
                name: 'abc',
                regNo: "abc345",
                email: 'xyz@gmail.com',
                phoneNo: 8978567438,
                picUrl: 'nilu',
                description: 'SI',
                speciality: 'neurologist',
                experience: 2,
                status: 'active',
                waitingTime: 10,
                rating: 7
            };
            return contactService.create(contact, (res) => {
                //log.info('value after insert in contact: ' + JSON.stringify(res));
            }).then((result) => {
                expect(result.id).to.be.greaterThan(0);
                contactService.delete(result.id, (result) => {});
            });
        });
    });

    describe('#update()', function() {
        xit('contact updated', function() {
            var contact = {
                id: 22,
                name: 'nilu',
                regNo: "xyz345",
                email: 'xyz@gmail.com',
                phoneNo: 8978567438,
                picUrl: 'nilu',
                description: 'SI',
                speciality: 'neurologist',
                experience: 2,
                status: 'active',
                waitingTime: 10,
                rating: 7
            };
            return contactService.update(contact, (result) => {}).then((res) => {
                //contactService.delete(res.id, (res) => {});
            });
        });
    });

    describe('#readAll()', function() {
        xit('Get all contacts', function() {
            return contactService.getAll((result) => {
                    //log.info('all data: ' + JSON.stringify(result));
                })
                /*.then((result) => {
                                log.info('all data: ' + JSON.stringify(result));
                            })*/
            ;
        });
    });

    describe('#readById()', function() {
        xit('Get contact by id', function() {
            return contactService.getById(1, () => {}).then((res) => {
                //log.info('get by id data:' + JSON.stringify(res));
            });
        });
    });

    describe('#delete()', function() {
        xit('Contact deleted', function() {
            return contactService.delete(4, (result) => {});
        });
    });
});

/*import log from '../config/log4js.config';
import ContactService from '../apis/contact/contactUs.service';
import expect from 'expect.js';

var contactService = new ContactService();

describe('contactDao', function() {
    describe('#insert()', function() {
        it('creates a contact', function() {
            var contact = {
                name: 'santosh',
                picUrl: 'santosh',
                regNo: 'sa123',
                speciality: 'dental surgeon',
                experience: 2,
                description: 'dental problem',
                email: 'santosh@gmail.com',
                phoneNo: 7856745324,
                status: 'active',
                waitingTime: 10,
                rating: 5,
                videoUrl: 'video url',
                appearUrl: 'appear url',
                thumbnailUrl: 'thumbnail url',
                termsAccepted: true
            };
            contactService.create(contact, (result) => {
                log.info('data from test: ' + JSON.stringify(result));
                expect(result.id).to.be.greaterThan(0);
                expect(result.name).to.equal(contact.name);
                //contactService.delete(result.id, (result) => {});
            });
        });
    });

    describe('#update()', function() {
        it('contact updated', function() {
            var contact = {
                id: 1,
                name: 'abc',
                picUrl: 'santosh'
            };
            contactService.update(contact, (result) => {
                expect(result.name).to.equal(contact.name);
                //contactService.delete(contact.id, (result) => {});
            });
        });
    });

    describe('#readAll()', function() {
        it('Get all contacts', function() {
            contactService.getAll((result) => {});
        });
    });

    describe('#readById()', function() {
        it('Get contact by id', function() {
            var contact = {
                id: 1
            };
            contactService.getById(contact.id, (result) => {
                //log.info('Contact data for id ' + contact.id + ' is ' + JSON.stringify(result));
            });
        });
    });

    describe('#delete()', function() {
        it('Contact deleted', function() {
            var contact = {
                id: 1
            };
            contactService.delete(contact.id, (result) => {
                log.info('deleted contact: ' + JSON.stringify(result));
            });
        });
    });
});*/