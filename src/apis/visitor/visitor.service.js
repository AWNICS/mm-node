import VisitorHealthDao from './visitor-health.dao';
import VisitorDiagnosticDao from './visitor-diagnostic.dao';
import VisitorReportDao from './visitor-report.dao';
import VisitorPrescriptionDao from './visitor-prescription.dao';
import VisitorHistoryDao from './visitor-history.dao';
import VisitorMediaDao from './visitor-media.dao';
import VisitorAppointmentDao from './visitor-appointment.dao';
import VisitorStoreDao from './visitor-store.dao';
import visitorStoreModel from './index';
import visitorAppointmentModel from './index';
import log from '../../config/log4js.config';
import visitorModel from './index';
import VisitorTimelineDao from './visitor-timeline.dao';

const moment = require('moment');
const Op = require('sequelize').Op;
const visitorHealthDao = new VisitorHealthDao();
const visitorDiagnosticDao = new VisitorDiagnosticDao();
const visitorReportDao = new VisitorReportDao();
const visitorPrescriptionDao = new VisitorPrescriptionDao();
const visitorHistoryDao = new VisitorHistoryDao();
const visitorMediaDao = new VisitorMediaDao();
const visitorAppointmentDao = new VisitorAppointmentDao();
const visitorStoreDao = new VisitorStoreDao();
const visitorTimelineDao = new VisitorTimelineDao();

/**
 * VisitorService 
 */
class VisitorService {

    //for visitor-health
    createHealth(visitorHealth, callback) {
        visitorHealthDao.insert(visitorHealth, (visitorHealthCreated) => {
            callback(visitorHealthCreated);
        });
    }

    readAllHealth(callback) {
        visitorHealthDao.readAll((allVisitorHealth) => {
            callback(allVisitorHealth);
        });
    }

    readByVisitorIdHealth(visitorId, callback) {
        visitorHealthDao.readById(visitorId, (visitorHealth) => {
            callback(visitorHealth);
        });
    }

    //for visitor-prescription
    createPrescription(visitorPrescription, callback) {
        visitorPrescriptionDao.insert(visitorPrescription, (visitorPrescriptionCreated) => {
            callback(visitorPrescriptionCreated);
        });
    }

    readAllPrescription(callback) {
        visitorPrescriptionDao.readAll((allVisitorPrescription) => {
            callback(allVisitorPrescription);
        });
    }

    readByVisitorIdPrescription(visitorId, callback) {
        visitorPrescriptionDao.readById(visitorId, (visitorPrescription) => {
            callback(visitorPrescription);
        });
    }

    //for visitor-diagnostic
    createDiagnostic(visitorDiagnostic, callback) {
        visitorDiagnosticDao.insert(visitorDiagnostic, (diagnosticCreated) => {
            callback(diagnosticCreated);
        });
    }

    readAllDiagnostic(callback) {
        visitorDiagnosticDao.readAll((allDiagnostic) => {
            callback(allDiagnostic);
        });
    }

    //for visitor-reports
    createReport(visitorReport, callback) {
        visitorReportDao.insert(visitorReport, (visitorReportCreated) => {
            callback(visitorReportCreated);
        });
    }

    readAllReport(callback) {
        visitorReportDao.readAll((allReports) => {
            callback(allReports);
        });
    }

    readByVisitorIdReport(visitorId, callback) {
        visitorReportDao.readById(visitorId, (report) => {
            callback(report);
        });
    }

    updateVisitorReport(visitorReport, callback) {
        visitorReportDao.update(visitorReport, (visitorReportUpdated) => {
            callback(visitorReportUpdated);
        });
    }

    //for visitor-history
    createHistory(visitorHistory, callback) {
        visitorHistoryDao.insert(visitorHistory, (visitorHistoryCreated) => {
            callback(visitorHistoryCreated);
        });
    }

    readAllHistory(callback) {
        visitorHistoryDao.readAll((allVisitorHistory) => {
            callback(allVisitorHistory);
        });
    }

    //for visitor-media
    createMedia(visitorMedia, callback) {
        visitorMediaDao.insert(visitorMedia, (visitorMediaCreated) => {
            callback(visitorMediaCreated);
        });
    }

    readAllMedia(callback) {
        visitorMediaDao.readAll((allVisitorMedia) => {
            callback(allVisitorMedia);
        });
    }

    //for visitor-appointment
    createAppointment(visitorAppointment, callback) {
        visitorAppointmentDao.insert(visitorAppointment, (visitorAppointmentCreated) => {
            callback(visitorAppointmentCreated);
        });
    }

    readAllAppointment(callback) {
        visitorAppointmentDao.readAll((allVisitorAppointment) => {
            callback(allVisitorAppointment);
        });
    }

    readByIdAppointment(visitorId, callback) {
        visitorAppointmentDao.readById(visitorId, (visitorAppointment) => {
            callback(visitorAppointment);
        });
    }

    async readAppointmentHistory(visitorId, callback) {
        var consultations = new Array(12);
        var reports = new Array(12);
        var vitals = new Array(12);

        await visitorModel.visitor_appointment.findAll({
            where: {
                visitorId: visitorId
            }
        }).then((visitorAppointment) => {
            consultations.fill(0); //initialize the array with the initial value
            visitorAppointment.map((appointment) => {
                var startMonth = appointment.startTime.getUTCMonth();
                var endMonth = appointment.endTime.getUTCMonth();
                for (var i = startMonth; i <= endMonth; i++) {
                    consultations[i] = consultations[i] + 1;
                }
            });
        });

        await visitorModel.visitor_report.findAll({
            where: {
                visitorId: visitorId
            }
        }).then((visitorReport) => {
            reports.fill(0); //initialize the array with the initial value
            visitorReport.map((report) => {
                var createdAtMonth = report.createdAt.getUTCMonth();
                var updatedAtMonth = report.updatedAt.getUTCMonth();
                for (var i = createdAtMonth; i <= updatedAtMonth; i++) {
                    reports[i] = reports[i] + 1;
                }
            });
        });

        await visitorModel.visitor_health.findAll({
            where: {
                visitorId: visitorId
            }
        }).then((visitorHealth) => {
            vitals.fill(0); //initialize the array with the initial value
            visitorHealth.map((health) => {
                var createdAtMonth = health.createdAt.getUTCMonth();
                var updatedAtMonth = health.updatedAt.getUTCMonth();
                for (var i = createdAtMonth; i <= updatedAtMonth; i++) {
                    vitals[i] = vitals[i] + 1;
                }
            });
        });
        //send the required history details to fill the consultation history graph on visitor-dashboard
        callback({ "consultations": { "monthly": consultations }, "reports": { "monthly": reports }, "vitals": { "monthly": vitals } });
    }

    getSchedules(startTime, endTime) {
        var startTime = new Date(startTime).getUTCHours();
        var ampm = startTime >= 12 ? 'pm' : 'am';
        startTime = startTime % 12;
        startTime = startTime ? startTime : 12; // the hour '0' should be '12'
        var initial = startTime + ampm;

        var endTime = new Date(endTime).getUTCHours();
        ampm = endTime >= 12 ? 'pm' : 'am';
        endTime = endTime % 12;
        endTime = endTime ? endTime : 12; // the hour '0' should be '12'
        var end = endTime + ampm;
        return (initial + ' - ' + end);
    }

    //for visitor-store
    createStore(visitorStore, callback) {
        visitorStoreDao.insert(visitorStore, (visitorStoreCreated) => {
            callback(visitorStoreCreated);
        });
    }

    readAllStore(callback) {
        visitorStoreDao.readAll((allVisitorStore) => {
            callback(allVisitorStore);
        });
    }

    getVisitorStoreById(visitorId, callback) {
        visitorStoreModel.visitor_store
            .findAll({
                where: {
                    visitorId: visitorId
                }
            }) //fetch all the records for the visitorId
            .then((visitorStores) => {
                callback(visitorStores);
            }).catch(err => {
                log.error('Error while fetching visitor stores in visitor service: ', err.stack);
                callback({ message: 'Visitor ID you have entered does not exist' });
            });
    }

    //for visitor-timeline
    createVisitorTimeline(visitorTimeline, callback) {
        visitorTimelineDao.insert(visitorTimeline, (visitorTimelineCreated) => {
            callback(visitorTimelineCreated);
        });
    }

    readTimelineByVisitorId(visitorId, callback) {
        visitorModel.visitor_timeline
            .findAll({
                where: {
                    visitorId: visitorId
                },
                limit: 3,
                order: [
                    [visitorModel, 'timestamp', 'ASC']
                ]
            }).then((visitorTimelines) => {
                callback(visitorTimelines);
            }).catch(err => {
                log.error('Error while fetching visitor timeline in visitor service: ', err);
                callback({
                    message: 'Visitor ID you have entered does not exist'
                });
            });
    }

    async getAppointmentsByDoctorId(doctorId, page, size, callback) {
        var offset = ((size * page) - size);
        var visitorAppointments = await visitorAppointmentModel.visitor_appointment
            .findAll({
                where: {
                    doctorId: doctorId,
                    startTime: {
                        [Op.gte]: Date.now(),
                        [Op.lt]: moment().add(1, 'd')
                    }
                },
                offset: offset,
                limit: size
            });
        var chartDetails = await this.getAppointmentsDetails(visitorAppointments);
        callback({ "visitorAppointments": visitorAppointments, "chartDetails": chartDetails });
    }

    async getAppointmentsDetails(visitorAppointments) {
        //for getting the doctor dashboard chart details
        var chartDetails = await this.getChartData(visitorAppointments);
        return chartDetails;
    }

    //get the newConsultations and follow ups
    async getChartData(visitorAppointments) {
        var newConsultations = new Array(9);
        var followUps = new Array(9);
        newConsultations.fill(0);
        followUps.fill(0);
        await visitorAppointments.map((visitorAppointment) => {
            var time;
            time = new Date(visitorAppointment.startTime).getUTCHours();
            //indexes will be 9am-0, 10am-1, 11am-2, and so on
            if (visitorAppointment.type === 'New consultation') {
                switch (true) {
                    case (time >= 9 && time < 10):
                        newConsultations[0] = newConsultations[0] + 1;
                        break;
                    case (time >= 10 && time < 11):
                        newConsultations[1] = newConsultations[1] + 1;
                        break;
                    case (time >= 11 && time < 12):
                        newConsultations[2] = newConsultations[2] + 1;
                        break;
                    case (time >= 12 && time < 13):
                        newConsultations[3] = newConsultations[3] + 1;
                        break;
                    case (time >= 13 && time < 14):
                        newConsultations[4] = newConsultations[4] + 1;
                        break;
                    case (time >= 14 && time < 15):
                        newConsultations[5] = newConsultations[5] + 1;
                        break;
                    case (time >= 15 && time < 16):
                        newConsultations[6] = newConsultations[6] + 1;
                        break;
                    case (time >= 16 && time < 17):
                        newConsultations[7] = newConsultations[7] + 1;
                        break;
                    case (time >= 17 && time < 18):
                        newConsultations[8] = newConsultations[8] + 1;
                        break;
                    default:
                        break;
                }
            }
        });
        await visitorAppointments.map((visitorAppointment) => {
            var time;
            time = new Date(visitorAppointment.startTime).getUTCHours();
            //indexes will be 9am-0, 10am-1, 11am-2, and so on
            if (visitorAppointment.type === 'Follow ups') {
                switch (true) {
                    case (time >= 9 && time < 10):
                        followUps[0] = followUps[0] + 1;
                        break;
                    case (time >= 10 && time < 11):
                        followUps[1] = followUps[1] + 1;
                        break;
                    case (time >= 11 && time < 12):
                        followUps[2] = followUps[2] + 1;
                        break;
                    case (time >= 12 && time < 13):
                        followUps[3] = followUps[3] + 1;
                        break;
                    case (time >= 13 && time < 14):
                        followUps[4] = followUps[4] + 1;
                        break;
                    case (time >= 14 && time < 15):
                        followUps[5] = followUps[5] + 1;
                        break;
                    case (time >= 15 && time < 16):
                        followUps[6] = followUps[6] + 1;
                        break;
                    case (time >= 16 && time < 17):
                        followUps[7] = followUps[7] + 1;
                        break;
                    case (time >= 17 && time < 18):
                        followUps[8] = followUps[8] + 1;
                        break;
                    default:
                        break;
                }
            }
        });
        return { "newConsultations": newConsultations, "followUps": followUps };
    }

    updateStore(visitor) {
        if (visitor.language) {
            this.createOrUpdateVisitorStore(visitor, 'Language', visitor.language);
        }
        if (visitor.location) {
            this.createOrUpdateVisitorStore(visitor, 'Location', visitor.location);
        }
    }

    createOrUpdateVisitorStore(visitor, type, value) {
        visitorModel.visitor_store.findAll({ where: { visitorId: visitor.userId, type: type } })
            .then((visitorStore) => {
                if (visitorStore.length === 0) {
                    var visitorStore = { visitorId: visitor.userId, type: type, value: value }
                    this.createStore(visitorStore, () => {});
                } else {
                    visitorModel.visitor_store.update({
                        'value': value
                    }, {
                        where: {
                            visitorId: visitor.userId,
                            type: type
                        }
                    }).then(() => {}).catch(error => {
                        log.error('Error while updating visitor: ' + error.stack);
                    });
                }
            }).catch(error => {
                log.error('Error while creating or updating visitor store: ' + error);
            });
    }

    updateVisitorHealth(visitor) {
        this.readByVisitorIdHealth(visitor.userId, (result) => {
            if (result.length === 0) {
                visitorService.createHealth({
                    "visitorId": visitor.userId,
                    "allergies": visitor.allergies,
                    "vitals": { "bloodPressure": visitor.bloodPressure, "heartRate": visitor.heartRate },
                    "createdBy": visitor.userId,
                    "updatedBy": visitor.userId
                }, (createdVisitorHealth) => {
                    log.info('Visitor health entry created: ', createdVisitorHealth);
                });
            } else {
                return;
            }
        });
    }
}

export default VisitorService;