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
import visitorModel from '../visitor/index';
import fs from 'fs';
import bucket from '../../config/gcp.config';


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
            //checks the duplicate entry for doctors
            if (userCreated.error === "DUP_ENTRY") {
                return callback({
                    "error": "DUP_ENTRY",
                    "message": "Doctor already registered with this email and Phonenumber. Please try logging into your account"
                }); //check for dup entry for email and phoneNo
            }
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
                log.info('Doctor schedule created');
            });

            return doctorDao.insert(newDoctor, (doctorCreated) => {
                log.info("New doctor created successfully with UserId " + userCreated.id);
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
        return doctorDao.readById(id, (doctorDetails) => {
            doctorStoreModel.doctor_store.findAll({
                where: {
                    userId: id
                }
            }).then((doctorStores) => {
                callback({
                    'doctorDetails': doctorDetails,
                    'doctorStores': doctorStores
                });
            });
        });
    }

    update(doctor, callback) {
        return doctorDao.update(doctor, (doctorUpdated) => {
            //create doctor_content and doctor_content_store
            //iterate for languages
            if (doctor.language) {
                this.updateDoctorStoreByDoctorId(doctor.userId, 'Language', doctor.language, (doctorStore) => {
                    log.info('Doctor store updated of Language');
                });
            }

            //iterate for location
            if (doctor.location) {
                this.updateDoctorStoreByDoctorId(doctor.userId, 'Location', doctor.location, (doctorStore) => {
                    log.info('Doctor store updated of Location');
                });
            }

            //iterate for qualification
            if (doctor.qualification) {
                this.updateDoctorStoreByDoctorId(doctor.userId, 'Qualification', doctor.qualification, (doctorStore) => {
                    log.info('Doctor store updated of Qualification');
                });
            }

            //iterate for consultationMode
            if (doctor.consultationMode) {
                this.updateDoctorStoreByDoctorId(doctor.userId, 'Consultation mode', doctor.consultationMode, (doctorStore) => {
                    log.info('Doctor store updated of Consultation mode');
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
            condition = condition + `dst.value LIKE CONCAT('%','${location}','%') AND `;
        }
        if (speciality) {
            condition = condition + `d.speciality LIKE CONCAT('%','${speciality}','%') AND `;
        }
        if (time) {
            condition = condition + `('${time}' BETWEEN ds.startTime AND ds.endTime)`;
        }
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
                `, {
                type: sequelize.QueryTypes.SELECT
            })
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
            .findAll({
                where: {
                    doctorId: doctorId
                }
            })
            .then((doctorSchedule) => {
                callback(doctorSchedule);
            }).catch(err => {
                log.error('Error while fetching doctor schedule in doctor service: ', err);
                callback({
                    message: 'Doctor ID you have entered does not exist'
                });
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
                callback({
                    message: 'Doctor ID you have entered does not exist'
                });
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
            .findAll({
                where: {
                    userId: doctorId
                }
            }) //fetch all records for this doctorId
            .then((doctorMedia) => {
                callback(doctorMedia);
            }).catch(err => {
                log.error('Error while fetching doctor medias in doctor service: ', err);
                callback({
                    message: 'Doctor ID you have entered does not exist'
                });
            });
    }

    getLimitedMediaByDoctorId(doctorId, page, size, callback) {
        var offset = ((size * page) - size);
        doctorMediaModel.doctor_media
            .findAll({
                where: [{
                    userId: doctorId
                }, {
                    type: ['image', 'video']
                }],
                offset: offset,
                limit: size
            })
            .then((doctorMedia) => {
                callback(doctorMedia);
            }).catch(err => {
                log.error('Error while fetching doctor medias in doctor service: ', err);
                callback({
                    message: 'Doctor ID you have entered does not exist'
                });
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

    getDoctorStoreById(doctorId, callback) {
        doctorStoreModel.doctor_store
            .findAll({
                where: {
                    userId: doctorId
                }
            }) //fetch all records for this doctorId
            .then((doctorStores) => {
                callback(doctorStores);
            }).catch(err => {
                log.error('Error while fetching doctor stores in doctor service: ', err);
                callback({
                    message: 'Doctor ID you have entered does not exist'
                });
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

    updateDoctorStoreByDoctorId(id, type, value, callback) {
        doctorStoreModel.doctor_store.findAll({
            where: {
                userId: id,
                type: type
            }
        }).then((doctorstore) => {
            if (doctorstore.length === 0) {
                var doctorStore = {
                    userId: id,
                    type: type,
                    value: value
                };
                this.createDoctorStore(doctorStore, (doctorStoreCreated) => {
                    callback(doctorStoreCreated)
                });
            } else {
                doctorStoreModel.doctor_store.update({
                    value: value
                }, {
                    where: {
                        userId: id,
                        type: type
                    }
                }).then((doctorStoreUpdated) => {
                    callback(doctorStoreUpdated);
                }).catch(err => {
                    log.error("Error while updating doctor store ", err);
                });

            }
        }).catch(err => {
            log.error('Error while fetching doctor store ', err);
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

    async getConsutationDetails(doctorId, callback) {
        var visitorAppointments = visitorModel.visitor_appointment.findAll({ where: { doctorId: doctorId } });
        var consultationDetails = await this.consultationDetails(visitorAppointments);
        callback(consultationDetails);
    }

    async consultationDetails(visitorAppointments) {
        var daily = 0,
            weekly = 0,
            monthly = 0;
        await visitorAppointments.map((visitorAppointment) => {
            var month = moment(visitorAppointment.startTime).month();
            var currentMonth = moment().month();
            if (moment(visitorAppointment.startTime).year() === moment().year()) {
                if (++month === ++currentMonth) {
                    monthly = monthly + 1;
                    if (moment(visitorAppointment.startTime).date() === moment().date()) {
                        daily = daily + 1;
                    }
                    if (moment(visitorAppointment.startTime).week() === moment().week()) {
                        weekly = weekly + 1;
                    }
                }
            }
        });
        return ({ "today": daily, "week": weekly, "month": monthly });
    }

    generatePdf(pdfData, callback) {
        let name = Date.now() + Date.now() + '.pdf';
        fs.writeFile('./tmp/' + name, pdfData, 'binary', (err) => {
            if (err) {
                log.info('Error writing pdf data to file ' + err);
            }
        });
        bucket.upload('./tmp/' + name, { destination: name }, (err, file) => {
            if (err) {
                log.info('Error while  uploading pdf ' + err);
            } else {
                log.info('Uploading PDF success');
                fs.unlink('./tmp/' + name);
                callback({ "fileName": name });
            }
        })

    }
}

export default DoctorService;