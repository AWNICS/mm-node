import fs from 'fs';
import DoctorDao from './doctor.dao';
import sequelize from '../../util/conn.mysql';
import log from '../../config/log4js.config';
import VisitorAppointmentDao from '../visitor/visitor-appointment.dao';
import DoctorSchedule from './doctor-schedule.dao';
import UserService from '../user/user.service';
import DoctorMediaDao from './doctor-media.dao';
import DoctorStoreDao from './doctor-store.dao';
import doctorMediaModel from './index';
import doctorModel from './index';
import doctorStoreModel from './index';
import doctorActivityModel from './index';
import doctorScheduleModel from './index';
import DoctorActivityDao from './doctor-activities.dao';
import DoctorReviewDao from './doctor-reviews.dao';
import moment from 'moment';
import visitorModel from '../visitor/index';
import FileService from '../file/file.service';
import bucket from '../../config/gcp.config';
import billingModel from '../billing/index';
import GroupDao from '../group/group.dao';
import GroupModel from '../group/index';

const Op = require('sequelize').Op;
var doctorDao = new DoctorDao();
var visitorAppoinmentDao = new VisitorAppointmentDao();
var userService = new UserService();
var fileService = new FileService();
var doctorScheduleDao = new DoctorSchedule();
var doctorMediaDao = new DoctorMediaDao();
var doctorStoreDao = new DoctorStoreDao();
var doctorActivityDao = new DoctorActivityDao();
var doctorReviewDao = new DoctorReviewDao();
var groupDao = new GroupDao();

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

    getDoctorsLists(userId, location, speciality, gps, time, page, size, callback) {
        var offset = ((size * page) - size);
        var condition = '';
        if (location) {
            condition = condition + `dstloc.value LIKE CONCAT('%','${location}','%') `;
        }
        if (speciality) {
            condition = condition + ` AND d.speciality LIKE CONCAT('%','${speciality}','%')`;
        }
        // if (time) {
        //     condition = condition + ` AND ('${time}' BETWEEN ds.startTime AND ds.endTime)`;
        // }
        return sequelize
            .query(`
            SELECT
                u.firstName,
                u.lastName,
                u.picUrl,
                ds.status,
                d.userId,
                d.regNo,
                d.speciality,
                d.experience,
                d.description,
                cp.price,
                va.count,
                d.longBio,
                d.shortBio,
                d.videoUrl,
                d.ratingValue,
                d.updatedAt,
                ds.waitTime,
                dstloc.value as location,
                dstqual.value as qualification,
                dstcon.value as consultationMode
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
                doctor_store AS dstloc
            ON
                d.userId = dstloc.userId AND dstloc.type="Location"
            LEFT JOIN
                doctor_store AS dstcon
            ON
                d.userId = dstcon.userId AND dstcon.type="Consultation mode"
            LEFT JOIN
                doctor_store AS dstqual
            ON
                d.userId = dstqual.userId AND dstqual.type="Qualification"
            LEFT JOIN
                consultation_price  AS cp
            ON
                cp.doctorId = d.userId AND cp.speciality = '${speciality}'
            LEFT JOIN
                (select count(id) as count, doctorId from visitor_appointment group by doctorId) va
            ON  d.userId = va.doctorId
            WHERE
            ${condition}
            ORDER BY
                FIELD(ds.status, "Online","Busy","Offline") , u.firstname 
            LIMIT
                ${offset},
                ${size};
                `, {
                type: sequelize.QueryTypes.SELECT
            })
            .then((result, err) => {
                GroupModel.consultation_group.findAll({
                    where: {
                        userId: userId
                    }
                }).then((pastConsultations) => {
                    let consultations = { doctorId: [] };
                    let inactiveGroups = { groups: [] };
                    pastConsultations.map((consultation) => {
                        if (consultation.phase === 'inactive' || consultation.phase === 'botInactive') {
                            inactiveGroups.groups.push({ 'doctorId': consultation.doctorId, 'groupId': consultation.id });
                        }
                        consultations.doctorId.push(consultation.doctorId);
                    })
                    if (err) {
                        log.error('Error while fetching doctors list ', err);
                        callback(err);
                    } else {
                        result = { "doctors": result, "consultations": consultations, "inactiveGroups": inactiveGroups }
                        callback(result);
                    }
                })
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
                where: [{
                    userId: doctorId
                }, {
                    type: ['video','honour','award']
                }]
            }) //fetch all records for this doctorId
            .then((doctorMedia) => {
                if(doctorMedia.length > 0){
                let video = [];
                let honour = [];
                let award = [];
                doctorMedia.map((media) => {
                    if(media.type === 'video'){
                        video.push(media);
                    } else if(media.type === 'honour'){
                        honour.push(media);
                    } else if(media.type === 'award'){
                        award.push(media);
                    }
                })
                callback({"videos": video, "honours": honour, "awards": award});
            } else {
                callback({"videos": 0, "honours": 0, "awards": 0})
            }
            }).catch(err => {
                log.error('Error while fetching doctor medias in doctor service: ', err);
                callback({
                    message: 'Doctor ID you have entered does not exist'
                });
            });
    }

    getDigitalSignatureByDoctorId(doctorId, callback) {
        doctorMediaModel.doctor_media
            .find({
                where: [{
                    userId: doctorId
                }, {
                    type: ['signature']
                }]
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

    async getConsultationDetails(doctorId, callback) {
        // var visitorAppointments = await visitorModel.visitor_appointment.COUNT({ where: { doctorId: doctorId, status: 'Success' } });
        var billings = await billingModel.billing.findAll({ where: { doctorId: doctorId, status: 'Success' } });
        // var noOfPatients = this.consultationDetails(billings);
        let result = this.patientsAndMoneyOfDoctor(billings);
        callback(result);
    }

    /**
     * money earned by doctor (need to modify based on the amount column structure(inside billing table))
     */
    patientsAndMoneyOfDoctor(billings) {
        var bills = {
            daily : 0,
            weekly : 0,
            monthly : 0,
            yearly : 0
        }
        var patients = {
            daily : 0,
            weekly : 0,
            monthly : 0,
            yearly : 0
        }
            if (billings) {
                billings.map((billing) => {
                var month = moment(billing.createdAt).month();
                var currentMonth = moment().month();
                if (moment(billing.createdAt).year() === moment().year()) {
                    bills.yearly +=  billing.amount;
                    patients.yearly += 1;
                    if (++month === ++currentMonth) {
                        bills.monthly += billing.amount;
                        patients.monthly += 1;
                        if (moment(billing.createdAt).date() === moment().date()) {
                            bills.daily += billing.amount;
                            patients.daily += 1;
                        }
                        if (moment(billing.createdAt).week() === moment().week()) {
                            bills.weekly += billing.amount;
                            patients.weekly += 1;
                        }
                    }
                }
            });
            return ({earning: { "today": bills.daily, "week": bills.weekly, "month": bills.monthly, "year": bills.yearly },
                     noOfPatients: { "today": patients.daily, "week": patients.weekly, "month": patients.monthly, "year": patients.yearly }});
        } else {
            return ({earning: { "today": bills.daily, "week": bills.weekly, "month": bills.monthly, "year": bills.yearly },
                     noOfPatients: { "today": patients.daily, "week": patients.weekly, "month": patients.monthly, "year": patients.yearly }});
        }
    }

    // consultationDetails(billings) {
    //     var daily = 0,
    //         weekly = 0,
    //         monthly = 0,
    //         yearly = 0;
    //     if (billings) {
    //         billings.map((billing) => {
    //             var month = moment(billing.startTime).month();
    //             var currentMonth = moment().month();
    //             if (moment(visitorAppointment.startTime).year() === moment().year()) {
    //                 yearly = yearly + 1;
    //                 if (++month === ++currentMonth) {
    //                     monthly = monthly + 1;
    //                     if (moment(visitorAppointment.startTime).date() === moment().date()) {
    //                         daily = daily + 1;
    //                     }
    //                     if (moment(visitorAppointment.startTime).week() === moment().week()) {
    //                         weekly = weekly + 1;
    //                     }
    //                 }
    //             }
    //         });
    //         return ({ "today": daily, "week": weekly, "month": monthly, "year": yearly });
    //     } else {
    //         return ({ "today": daily, "week": weekly, "month": monthly, "year": yearly });
    //     }
    // }

    generatePdf(pdfData, groupId, callback) {
        var date = moment().utcOffset(330).format('DD-MM-YYYYTHH-mm-ss-SSS');
        var fileName = pdfData.userId + '-' + date + '.pdf';
        fs.writeFileSync('./tmp/' + fileName, pdfData.data, 'binary', (err) => {
            if (err) {
                log.info('Error writing pdf data to file ' + err);
            }
        });
        fileService.pdfUpload(fileName, bucket, (fileName) => {
            visitorModel.visitor_prescription.find({
                where: {
                    consultationId: pdfData.consultationId,
                    visitorId: pdfData.userId
                }
            }).then((prescription) => {
                var prescription = {
                    url: fileName.fileName,
                    analysis: prescription.analysis,
                    medication: prescription.medication,
                    diagnostic: prescription.diagnostic,
                    prescription: prescription.prescription
                }   
                visitorModel.visitor_prescription.update(prescription, {
                    where: {
                        consultationId: pdfData.consultationId,
                        visitorId: pdfData.userId
                    }
                }).then(() => {});
            });
            callback(fileName);
            groupDao.readById((pdfData.groupId), (groupDetails) => {
                groupDao.update({ id: pdfData.groupId, details: groupDetails.details, prescription_generated: true }, (p) => {
                        log.info('Prescription generated for group with Id: ' + pdfData.groupId);
                })
            });
        });
    }

    getAllEssentialDoctorDetails(limit, offset, callback){
        sequelize.query(`
        select d.userId, u.name, d.workHistory, da.title as activity, dm.url as sigUrl, ds.value as profSocieties from doctor as d
        left join (select concat(firstname,' ',lastname)as name, id  from user) u on d.userId = u.id
        left join (select title, doctorId from doctor_activities) da on d.userId = da.doctorId
        left join (select url, userId from doctor_media where type='signature') dm on dm.userId = d.userId
        left join (select value, userId from doctor_store where type='ProfessionalSocieties') ds on ds.userId = d.userId
        limit ${limit}
        offset ${offset * limit}
        `,
        {type: sequelize.QueryTypes.SELECT}).then((result, error) => {
            if(error){
                log.error('Error while getting doctors list and details for admin dashboard '+error);
            } else {
                callback(result);
            }
        })
    }
    
    updateEssentialDoctorDetails(doctorId, body, callback){
        let groupUpdate = [];
        if(body.workHistory){
            let workHistory = () => {
                return doctorModel.doctor.update({'workhistory': body.workHistory},{where : { userId: doctorId}, sideEffects: false }).then((out)=>{
                }).catch(err => log.info(err));
            }
            groupUpdate.push(workHistory);
        }
        if(body.activity){
            let activity = () => {
                if(body.activity.operation==='update'){
                    return doctorActivityModel.doctor_activities.update({
                        'title': body.activity.value,
                        'mediaUrl': body.activity.url
                    },{where : { doctorId: doctorId} }).then((out)=>{
                    }).catch(err => log.info(err));
                } else {    
                    return doctorActivityModel.doctor_activities.create({
                        'title': body.activity.value,
                        'doctorId': doctorId,
                        'mediaType': 'image',
                        'mediaUrl' : body.activity.url
                    }).then((out)=>{
                    }).catch(err => log.info(err));
                }
            }
            groupUpdate.push(activity);
        }
        if(body.signature){
            let signature = () => {
                if(body.signature.operation==='update'){
                    return doctorMediaModel.doctor_media.update({'title': body.signature.url},{where : { doctorId: doctorId, type: 'signature'} }).then((out)=>{
                    }).catch(err => log.info(err));
                } else {    
                    return doctorMediaModel.doctor_media.create({
                        'userId': doctorId,
                        'url': body.signature.url,
                        'type': 'signature'
                    }).then((out)=>{
                    }).catch(err => log.info(err));
                }
            }
            groupUpdate.push(signature);
        }
        if(body.professionalSocieties){
            let profSocieties = () => {
                if(body.professionalSocieties.operation==='update'){
                    return doctorStoreModel.doctor_store.update({'value': body.professionalSocieties.value},{where : { userId: doctorId, type: 'ProfessionalSocieties'} }).then((out)=>{
                    }).catch(err => log.info(err));
                } else {    
                    return doctorActivityModel.doctor_activities.create({
                        'userId': doctorId,
                        'type': 'ProfessionalSocieties',
                        'value': body.professionalSocieties.value,
                    }).then((out)=>{
                    }).catch(err => log.info(err));
                }
            }
            groupUpdate.push(profSocieties);
        }
        Promise.all([workHistory(),activity()]).then((res)=>{
            callback('Success');
        })
    }

    setAllEssentialDoctorDetails(params, data, callback){
        sequelize.query(`
        select d.userId, d.workHistory, da.title, dm.url, ds.value from doctor as d
        left join (select title, doctorId from doctor_activities) da on d.userId = da.doctorId
        left join (select url, userId from doctor_media where type='signature') dm on dm.userId = d.userId
        left join (select value, userId from doctor_store where type='ProfessionalSocieties') ds on ds.userId = d.userId
        limit 20
        offset ${offset}
        `,
        {type: sequelize.QueryTypes.SELECT}).then((result, error) => {
            if(error){
                log.info(error);
            } else {
                callback(result);
            }
        })
    }
}

export default DoctorService;