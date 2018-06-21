import VisitorHealthDao from './visitor-health.dao';
import VisitorDiagnosticDao from './visitor-diagnostic.dao';
import VisitorReportDao from './visitor-report.dao';
import VisitorPrescriptionDao from './visitor-prescription.dao';
import VisitorHistoryDao from './visitor-history.dao';
import VisitorMediaDao from './visitor-media.dao';
import VisitorAppointmentDao from './visitor-appointment.dao';
import VisitorStoreDao from './visitor-store.dao';
import visitorStoreModel from './index';
import log from '../../config/log4js.config';
import visitorModel from './index';

const visitorHealthDao = new VisitorHealthDao();
const visitorDiagnosticDao = new VisitorDiagnosticDao();
const visitorReportDao = new VisitorReportDao();
const visitorPrescriptionDao = new VisitorPrescriptionDao();
const visitorHistoryDao = new VisitorHistoryDao();
const visitorMediaDao = new VisitorMediaDao();
const visitorAppointmentDao = new VisitorAppointmentDao();
const visitorStoreDao = new VisitorStoreDao();

/**
 * VisitorService 
 */
class VisitorService {
    constructor() {}

    //for visitor-health
    createHealth(visitorHealth, callback) {
        visitorHealthDao.insert(visitorHealth, callback);
    }

    readAllHealth(callback) {
        visitorHealthDao.readAll(callback);
    }

    readByVisitorIdHealth(visitorId, callback) {
        visitorHealthDao.readById(visitorId, callback);
    }

    //for visitor-prescription
    createPrescription(visitorPrescription, callback) {
        visitorPrescriptionDao.insert(visitorPrescription, callback);
    }

    readAllPrescription(callback) {
        visitorPrescriptionDao.readAll(callback);
    }

    readByVisitorIdPrescription(visitorId, callback) {
        visitorPrescriptionDao.readById(visitorId, callback);
    }

    //for visitor-diagnostic
    createDiagnostic(visitorDiagnostic, callback) {
        visitorDiagnosticDao.insert(visitorDiagnostic, callback);
    }

    readAllDiagnostic(callback) {
        visitorDiagnosticDao.readAll(callback);
    }

    //for visitor-reports
    createReport(visitorReport, callback) {
        visitorReportDao.insert(visitorReport, callback);
    }

    readAllReport(callback) {
        visitorReportDao.readAll(callback);
    }

    readByVisitorIdReport(visitorId, callback) {
        visitorReportDao.readById(visitorId, callback);
    }

    //for visitor-history
    createHistory(visitorHistory, callback) {
        visitorHistoryDao.insert(visitorHistory, callback);
    }

    readAllHistory(callback) {
        visitorHistoryDao.readAll(callback);
    }

    //for visitor-media
    createMedia(visitorMedia, callback) {
        visitorMediaDao.insert(visitorMedia, callback);
    }

    readAllMedia(callback) {
        visitorMediaDao.readAll(callback);
    }

    //for visitor-appointment
    createAppointment(visitorAppointment, callback) {
        visitorAppointmentDao.insert(visitorAppointment, callback);
    }

    readAllAppointment(callback) {
        visitorAppointmentDao.readAll(callback);
    }

    readByIdAppointment(visitorId, callback) {
        visitorAppointmentDao.readById(visitorId, callback);
    }

    async readAppointmentHistory(visitorId, callback) {
        var consultations = new Array(12);
        var reports = new Array(12);
        var vitals = new Array(12);

        await visitorModel.visitor_appointment.findAll({ where: { visitorId: visitorId } }).then((visitorAppointment) => {
            consultations.fill(0); //initialize the array with the initial value
            visitorAppointment.map((appointment) => {
                var startMonth = appointment.startTime.getUTCMonth();
                var endMonth = appointment.endTime.getUTCMonth();
                for (var i = startMonth; i <= endMonth; i++) {
                    consultations[i] = consultations[i] + 1;
                }
            });
        });

        await visitorModel.visitor_report.findAll({ where: { visitorId: visitorId } }).then((visitorReport) => {
            reports.fill(0); //initialize the array with the initial value
            visitorReport.map((report) => {
                var createdAtMonth = report.createdAt.getUTCMonth();
                var updatedAtMonth = report.updatedAt.getUTCMonth();
                for (var i = createdAtMonth; i <= updatedAtMonth; i++) {
                    reports[i] = reports[i] + 1;
                }
            });
        });

        await visitorModel.visitor_prescription.findAll({ where: { visitorId: visitorId } }).then((visitorVitals) => {
            vitals.fill(0); //initialize the array with the initial value
            visitorVitals.map((vital) => {
                var createdAtMonth = vital.createdAt.getUTCMonth();
                var updatedAtMonth = vital.updatedAt.getUTCMonth();
                for (var i = createdAtMonth; i <= updatedAtMonth; i++) {
                    vitals[i] = vitals[i] + 1;
                }
            });
        });
        //send the required history details to fill the graph
        callback({ "consultations": { "monthly": consultations }, "reports": { "monthly": reports }, "vitals": { "monthly": vitals } });
    }

    //for visitor-store
    createStore(visitorStore, callback) {
        visitorStoreDao.insert(visitorStore, callback);
    }

    readAllStore(callback) {
        visitorStoreDao.readAll(callback);
    }

    getVisitorById(visitorId, callback) {
        visitorStoreModel.visitor_store
            .findAll({ where: { visitorId: visitorId } }) //fetch all the records for the visitorId
            .then((visitorStores) => {
                callback(visitorStores);
            }).catch(err => {
                log.error('Error while fetching visitor stores in visitor service: ', err);
                callback({ message: 'Visitor ID you have entered does not exist' });
            });
    }
}

export default VisitorService;