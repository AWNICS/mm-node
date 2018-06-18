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

    readByVisitorIdAppointment(visitorId, callback) {
        visitorAppointmentDao.readById(visitorId, callback);
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