import DoctorDao from './doctor.dao';
import doctorModel from './index';
import sequelize from '../../util/conn.mysql';
import log from '../../config/log4js.config';
import ConsultationDao from './consultation-schedule.dao';
import DoctorSchedule from './doctor-schedule.dao';
import UserService from '../user/user.service';

var doctorDao = new DoctorDao();
var consultationDao = new ConsultationDao();
var userService = new UserService();
var doctorScheduleDao = new DoctorSchedule();

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

    createDoctorSchedule(doctorSchedule, callback) {
        return doctorScheduleDao.insert(doctorSchedule, (doctorScheduleCreated) => {
            callback(doctorScheduleCreated);
        });
    }

    getDoctorsLists(location, speciality, gps, time, page, size, callback) {
        var offset = ((size * page) - size);
        var condition = '';
        if (location) {
            condition = condition + `AND d.location = '${location}'`;
        }
        if (speciality) {
            condition = condition + ` AND d.speciality = '${speciality}'`;
        }
        if (time) {
            condition = condition + ` AND ( '${time}' BETWEEN ds.startTime AND ds.endTime )`;
        }
        return sequelize
            .query(`
            SELECT
                u.firstName,
                u.lastName,
                u.picUrl,
                u.rating,
                d.userId,
                d.regNo,
                d.location,
                d.speciality,
                d.experience,
                d.description,
                d.videoUrl,
                ds.status,
                ds.waitTime
            FROM
                doctor AS d
            LEFT JOIN
                user AS u
            ON
                u.id = d.userId
            LEFT JOIN
                doctor_schedule AS ds
            ON
                d.userId = ds.doctorId
            WHERE
                ds.status = 'online'
            ${condition}
            ORDER BY
                ds.waitTime
            LIMIT
                ${offset},
                ${size};
                `, { type: sequelize.QueryTypes.SELECT })
            .then((result, err) => {
                if (err) {
                    log.error('Error while fetching doctors list ', err);
                    callback(err);
                } else {
                    callback(result);
                }
            });
    }
}

export default DoctorService;