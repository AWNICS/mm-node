import DoctorDao from './doctor.dao';
import sequelize from '../../util/conn.mysql';
import log from '../../config/log4js.config';
import VisitorAppointmentDao from '../visitor/visitor-appointment.dao';
import DoctorSchedule from './doctor-schedule.dao';
import UserService from '../user/user.service';
import DoctorMediaDao from './doctor-media.dao';
import DoctorStoreDao from './doctor-store.dao';
import doctorMediaModel from './index';
import doctorStoreModel from './index';
import doctorScheduleModel from './index';
import DoctorActivityDao from './doctor-activities.dao';
import DoctorReviewDao from './doctor-reviews.dao';
import moment from 'moment';

var doctorDao = new DoctorDao();
var visitorAppoinmentDao = new VisitorAppointmentDao();
var userService = new UserService();
var doctorScheduleDao = new DoctorSchedule();
var doctorMediaDao = new DoctorMediaDao();
var doctorStoreDao = new DoctorStoreDao();
var doctorActivityDao = new DoctorActivityDao();
var doctorReviewDao = new DoctorReviewDao();

class DoctorService {

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
                createdBy: userCreated.id,
                updatedBy: userCreated.id,
                termsAccepted: doctor.termsAccepted
            };
            //create entry into doctor_schedule
            var doctorSchedule = {
                doctorId: userCreated.id,
                status: userCreated.status,
                activity: 'Available',
                waitTime: 5,
                slotId: 2,
                startTime: Date.now(),
                endTime: moment(Date.now()).add(5, 'days'),
                duration: 15,
                createdBy: userCreated.id,
                updatedBy: userCreated.id
            };
            this.createDoctorSchedule(doctorSchedule, (doctorScheduleCreated) => {
                log.info('Doctor schedule created ', doctorScheduleCreated);
            });
            return doctorDao.insert(newDoctor, (doctorCreated) => {
                callback(doctorCreated);
            });
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
            //create doctor_content and doctor_content_store
            //iterate for languages
            if (doctor.language) {
                doctor.language.map((language) => {
                    var doctorStore = {
                        userId: doctor.userId,
                        type: 'Language',
                        value: language
                    }
                    this.createDoctorStore(doctorStore, (doctorStoreCreated) => {});
                });
            }

            //iterate for location
            if (doctor.location) {
                doctor.location.map((location) => {
                    var doctorStore = {
                        userId: doctor.userId,
                        type: 'Location',
                        value: location
                    }
                    this.createDoctorStore(doctorStore, (doctorStoreCreated) => {});
                });
            }

            //iterate for qualification
            if (doctor.qualification) {
                doctor.qualification.map((qualification) => {
                    var doctorStore = {
                        userId: doctor.userId,
                        type: 'Qualification',
                        value: qualification
                    }
                    this.createDoctorStore(doctorStore, (doctorStoreCreated) => {});
                });
            }

            //iterate for consultationMode
            if (doctor.consultationMode) {
                doctor.consultationMode.map((consultationMode) => {
                    var doctorStore = {
                        userId: doctor.userId,
                        type: 'Consultation mode',
                        value: consultationMode
                    }
                    this.createDoctorStore(doctorStore, (doctorStoreCreated) => {});
                });
            }
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
        return visitorAppoinmentDao.insert(consultation, (consultationCreated) => {
            callback(consultationCreated);
        });
    }

    getAllConsultation(callback) {
        return visitorAppoinmentDao.readAll((allConsultations) => {
            callback(allConsultations);
        });
    }

    getByIdConsultation(id, callback) {
        return visitorAppoinmentDao.readById(id, (consultation) => {
            callback(consultation);
        });
    }

    updateConsultation(consultation, callback) {
        return visitorAppoinmentDao.update(consultation, (consultationUpdated) => {
            callback(consultationUpdated);
        });
    }

    deleteConsultation(id, callback) {
        return visitorAppoinmentDao.delete(id, (consultationDeleted) => {
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
            condition = condition + `dst.value = '${location}'`;
        }
        if (speciality) {
            condition = condition + ` AND d.speciality = '${speciality}'`;
        }
        if (time) {
            condition = condition + ` AND ( '${time}' BETWEEN ds.startTime AND ds.endTime )`;
        }
        console.log('condition ', condition);
        return sequelize
            .query(`
            SELECT
                u.firstName,
                u.lastName,
                u.picUrl,
                u.status,
                d.userId,
                d.regNo,
                d.speciality,
                d.experience,
                d.description,
                d.longBio,
                d.shortBio,
                d.videoUrl,
                d.ratingValue,
                d.updatedAt,
                ds.waitTime,
                dst.value
            FROM
                doctor AS d
            LEFT JOIN
                user AS u
            ON
                u.id = d.userId
            LEFT JOIN 
              (
                select * from doctor_schedule group by doctorId ORDER BY endtime DESC 
              ) ds
            ON
                d.userId = ds.doctorId
            LEFT JOIN
                doctor_store AS dst
            ON
                d.userId = dst.userId
            WHERE
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

    getDoctorScheduleByDoctorId(doctorId, callback) {
        doctorScheduleModel.doctor_schedule
            .findAll({ where: { doctorId: doctorId } })
            .then((doctorSchedule) => {
                callback(doctorSchedule);
            }).catch(err => {
                log.error('Error while fetching doctor schedule in doctor service: ', err);
                callback({ message: 'Doctor ID you have entered does not exist' });
            });
    }

    //update status for doctor schedule by doctor id  
    updateDoctorSchedule(status, doctorId, callback) {
        doctorScheduleModel.doctor_schedule
            .update(status, {
                where: {
                    doctorId: doctorId
                }
            })
            .then((updatedSchedule) => {
                callback(updatedSchedule);
            }).catch(err => {
                log.error('Error while updating a doctor schedule in doctor service: ', err);
                callback({ message: 'Doctor ID you have entered does not exist' });
            });
    }

    /* for doctor content */
    createDoctorMedia(doctorMedia, callback) {
        return doctorMediaDao.insert(doctorMedia, (doctorMediaCreated) => {
            callback(doctorMediaCreated);
        });
    }

    getAllDoctorMedia(callback) {
        return doctorMediaDao.readAll((allDoctorMedia) => {
            callback(allDoctorMedia);
        });
    }

    getDoctorMediaById(id, callback) {
        return doctorMediaDao.readById(id, (doctorMedia) => {
            callback(doctorMedia);
        });
    }

    updateDoctorMedia(doctorMedia, id, callback) {
        return doctorMediaDao.update(doctorMedia, id, (doctorMediaUpdated) => {
            callback(doctorMediaUpdated);
        });
    }

    deleteDoctorMedia(id, callback) {
        return doctorMediaDao.delete(id, (doctorMediaDeleted) => {
            callback(doctorMediaDeleted);
        });
    }

    getMediaByDoctorId(doctorId, callback) {
        doctorMediaModel.doctor_media
            .findAll({ where: { userId: doctorId } }) //fetch all records for this doctorId
            .then((doctorMedia) => {
                callback(doctorMedia);
            }).catch(err => {
                log.error('Error while fetching doctor medias in doctor service: ', err);
                callback({ message: 'Doctor ID you have entered does not exist' });
            });
    }

    getLimitedMediaByDoctorId(doctorId, page, size, callback) {
        var offset = ((size * page) - size);
        doctorMediaModel.doctor_media
            .findAll({ where: [{ userId: doctorId }, { type: ['image', 'video'] }], offset: offset, limit: size })
            .then((doctorMedia) => {
                callback(doctorMedia);
            }).catch(err => {
                log.error('Error while fetching doctor medias in doctor service: ', err);
                callback({ message: 'Doctor ID you have entered does not exist' });
            });
    }

    /* for doctor content map*/
    createDoctorStore(doctorStore, callback) {
        return doctorStoreDao.insert(doctorStore, (doctorStoreCreated) => {
            callback(doctorStoreCreated);
        });
    }

    getAllDoctorStores(callback) {
        return doctorStoreDao.readAll((allDoctorStore) => {
            callback(allDoctorStore);
        });
    }

    /*getByIdDoctorStore(id, callback) {
        return doctorStoreDao.readById(id, (doctorStore) => {
            callback(doctorStore);
        });
    }*/

    getByIdDoctorStore(doctorId, callback) {
        doctorStoreModel.doctor_store
            .findAll({ where: { userId: doctorId } }) //fetch all records for this doctorId
            .then((doctorStores) => {
                callback(doctorStores);
            }).catch(err => {
                log.error('Error while fetching doctor stores in doctor service: ', err);
                callback({ message: 'Doctor ID you have entered does not exist' });
            });
    }

    updateDoctorStore(doctorStore, id, type, callback) {
        return doctorStoreDao.update(doctorStore, id, type, (doctorStoreUpdated) => {
            callback(doctorStoreUpdated);
        });
    }

    deleteDoctorStore(id, callback) {
        return doctorStoreDao.delete(id, (doctorStoreDeleted) => {
            callback(doctorStoreDeleted);
        });
    }

    /* for doctor activity */
    createDoctorActivity(doctorActivity, callback) {
        return doctorActivityDao.insert(doctorActivity, (doctorActivityCreated) => {
            callback(doctorActivityCreated);
        });
    }

    getAllDoctorActivities(callback) {
        return doctorActivityDao.readAll((allDoctorActivity) => {
            callback(allDoctorActivity);
        });
    }

    getByIdDoctorActivity(doctorId, callback) {
        return doctorActivityDao.readById(doctorId, (doctorActivity) => {
            //console.log('all activity: ' + JSON.stringify(doctorActivity));
            callback(doctorActivity);
        });
    }

    updateDoctorActivity(doctorActivity, id, doctorId, callback) {
        return doctorActivityDao.update(doctorActivity, id, (doctorActivityUpdated) => {
            callback(doctorActivityUpdated);
        });
    }

    deleteDoctorActivity(id, callback) {
        return doctorActivityDao.delete(id, (doctorActivityDeleted) => {
            callback(doctorActivityDeleted);
        });
    }

    /* for doctor activity */
    createDoctorReview(doctorReview, callback) {
        return doctorReviewDao.insert(doctorReview, (doctorReviewCreated) => {
            callback(doctorReviewCreated);
        });
    }

    getAllDoctorReviews(callback) {
        return doctorReviewDao.readAll((allDoctorReview) => {
            callback(allDoctorReview);
        });
    }

    getByIdDoctorReview(doctorId, callback) {
        return doctorReviewDao.readById(doctorId, (doctorReview) => {
            //console.log('all review: ' + JSON.stringify(doctorReview));
            callback(doctorReview);
        });
    }

    updateDoctorReview(doctorReview, id, callback) {
        return doctorReviewDao.update(doctorReview, id, (doctorReviewUpdated) => {
            callback(doctorReviewUpdated);
        });
    }

    deleteDoctorReview(id, callback) {
        return doctorReviewDao.delete(id, (doctorReviewDeleted) => {
            callback(doctorReviewDeleted);
        });
    }
}

export default DoctorService;