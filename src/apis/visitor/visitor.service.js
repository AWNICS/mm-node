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

        await visitorModel.visitor_prescription.findAll({
            where: {
                visitorId: visitorId
            }
        }).then((visitorVitals) => {
            vitals.fill(0); //initialize the array with the initial value
            visitorVitals.map((vital) => {
                var createdAtMonth = vital.createdAt.getUTCMonth();
                var updatedAtMonth = vital.updatedAt.getUTCMonth();
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

    getAppointmentsByDoctorId(doctorId, page, size, callback) {
        var offset = ((size * page) - size);
        visitorAppointmentModel.visitor_appointment
            .findAll({
                where: {
                    doctorId: doctorId
                },
                offset: offset,
                limit: size
            }).then((visitorAppointments) => {
                callback(visitorAppointments)
            }).catch((err) => {
                log.error('Error while fetching visitor appointments ', err);
                callback({
                    message: 'There was an error while fetching the appointments'
                });
            });
    }

    updateStore(visitor) {
        if (visitor.language) {
            visitorModel.visitor_store.update({
                'value': visitor.language
            }, {
                where: {
                    visitorId: visitor.userId,
                    type: "Language"
                }
            }).then(() => {}).catch(err => {
                log.error('error while updating visitor: ' + err.stack);
            });
        }
        if (visitor.location) {
            visitorModel.visitor_store.update({
                'value': visitor.location
            }, {
                where: {
                    visitorId: visitor.userId,
                    type: "Location"
                }
            }).then(() => {}).catch(err => {
                log.error('error while updating visitor: ' + err.stack);
            });
        }
    }

    updateVisitorPrescription(visitor) {
        this.readByVisitorIdPrescription(visitor.userId, (visitorPrescription) => {
            var description = {
                "symptoms": visitorPrescription[0].description.symptoms,
                "vitals": { "Blood pressure": visitor.bloodPressure, "Heart rate": visitor.heartRate },
                "medications": visitorPrescription[0].description.medications,
                "care_info": visitorPrescription[0].description.care_info,
                "follow ups notes": visitorPrescription[0].description["follow ups notes"]
            };
            var prescription = {
                "visitorId": visitor.userId,
                "description": description,
                "issue": visitorPrescription[0].issue,
                "analysis": visitorPrescription[0].analysis,
                "medication": visitorPrescription[0].medication,
                "prescription": visitorPrescription[0].prescription
            };
            visitorPrescriptionDao.update(prescription, (updatedPrescription) => {
                log.info('Prescription updated ', updatedPrescription);
            });
        });
    }
}

export default VisitorService;