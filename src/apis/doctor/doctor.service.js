import DoctorDao from './doctor.dao';
import log from '../../config/log4js.config';
import ConsultationDao from './consultation-schedule.dao';
import UserService from '../user/user.service';

var doctorDao = new DoctorDao();
var consultationDao = new ConsultationDao();
var userService = new UserService();

class DoctorService {
    constructor() {}

    /**
     * for doctor
     */
    create(doctor, callback) {
        userService.register(doctor, (userCreated) => {
            var newDoctor = {
                userId: userCreated.id,
                regNo: doctor.regNo,
                speciality: doctor.speciality,
                experience: doctor.experience,
                description: doctor.description,
                videoUrl: doctor.videoUrl,
                appearUrl: doctor.appearUrl,
                createdBy: doctor.createdBy,
                updatedBy: doctor.updatedBy,
                termsAccepted: doctor.termsAccepted
            }
            return doctorDao.insert(newDoctor, (doctorCreated) => {
                callback(doctorCreated);
            })
        });
    }

    getAll(callback) {
        return doctorDao.readAll((allDoctors) => {
            callback(allDoctors);
        });
    }

    getById(id, callback) {
        return doctorDao.readById(id, (doctorById) => {
            callback(doctorById);
        });
    }

    update(doctor, callback) {
        return doctorDao.update(doctor, (doctorUpdated) => {
            callback(doctorUpdated);
        });
    }

    delete(id, callback) {
        return doctorDao.delete(id, (doctorDeleted) => {
            callback(doctorDeleted);
        });
    }

    /**
     * for consultation schedule
     */
    createConsultation(consultation, callback) {
        return consultationDao.insert(consultation, (consultationCreated) => {
            callback(consultationCreated);
        });
    }

    getAllConsultation(callback) {
        return consultationDao.readAll((allConsultations) => {
            callback(allConsultations);
        });
    }

    getByIdConsultation(id, callback) {
        return consultationDao.readById(id, (consultation) => {
            callback(consultation);
        });
    }

    updateConsultation(consultation, callback) {
        return consultationDao.update(consultation, (consultationUpdated) => {
            callback(consultationUpdated);
        });
    }

    deleteConsultation(id, callback) {
        return consultationDao.delete(id, (consultationDeleted) => {
            callback(consultationDeleted);
        });
    }
}

export default DoctorService;