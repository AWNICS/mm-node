import log from '../config/log4js.config';
import DoctorService from '../apis/doctor/doctor.service';
import expect from 'expect.js';

var doctorService = new DoctorService();

describe('doctorDao', function() {
    describe('#insert()', function() {
        xit('creates a doctor', function() {
            var doctor = {
                id: null,
                name: 'John',
                email: 'jhon@gmail.com',
                picUrl: 'jhon',
                speciality: 'dental',
                experience: 7
            };
            return doctorService.create(doctor, (res) => {
                //log.info('value after insert: ' + JSON.stringify(res));
            }).then((result) => {
                //expect(res.id).to.be.greaterThan(0);
                doctorService.delete(result.id, (result) => {});
            });
        });
    });

    describe('#update()', function() {
        xit('doctor updated', function() {
            var doctor = {
                id: 9,
                name: 'John doe',
                email: 'jhon@gmail.com',
                picUrl: 'jhon',
                speciality: 'dental',
                experience: 7
            };
            return doctorService.update(doctor, (result) => {}).then(() => {
                doctorService.delete(doctor.id, (result) => {});
            });
        });
    });

    describe('#readAll()', function() {
        xit('Get all doctors', function() {
            return doctorService.getAll((result) => {
                //log.info('all data from doctor: ' + JSON.stringify(result));
            });
        });
    });

    describe('#readById()', function() {
        xit('Get doctor by id', function() {
            return doctorService.getById(1, () => {}).then((res) => {
                //log.info('get doctor data by id:' + JSON.stringify(res));
            });
        });
    });

    describe('#delete()', function() {
        xit('Doctor deleted', function() {
            return doctorService.delete(10, () => {}).then((res) => {
                //log.info('deleted doctor');
            });
        });
    });
});