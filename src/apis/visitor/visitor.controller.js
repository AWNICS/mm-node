import express from 'express';
import VisitorService from './visitor.service';

var router = express.Router();
var visitorService = new VisitorService();

//visitor-health
router.post('/visitors/health', (req, res) => {
    visitorService.createHealth(req.body, (result) => {
        res.send(result);
    });
});

router.get('/visitors/health', (req, res) => {
    visitorService.readAllHealth((results) => {
        res.send(results);
    });
});

router.get('/visitors/:visitorId/health', (req, res) => {
    var visitorId = req.params.visitorId;
    visitorService.readByVisitorIdHealth(visitorId, (results) => {
        res.send(results);
    });
});

//visitor-prescription
router.post('/visitors/prescriptions', (req, res) => {
    req.body.analysis = null;
    req.body.prescription = null;
    visitorService.createPrescription(req.body, (result) => {
        res.send(result);
    });
});

router.get('/visitors/prescriptions', (req, res) => {
    visitorService.readAllPrescription((results) => {
        res.send(results);
    });
});

router.get('/visitors/:visitorId/prescriptions', (req, res) => {
    var visitorId = req.params.visitorId;
    visitorService.readByVisitorIdPrescription(visitorId, (results) => {
        res.send(results);
    });
});

//visitor-diagnostic
router.post('/visitors/diagnostic', (req, res) => {
    visitorService.createDiagnostic(req.body, (result) => {
        res.send(result);
    });
});

router.get('/visitors/diagnostic', (req, res) => {
    visitorService.readAllDiagnostic((results) => {
        res.send(results);
    });
});

//visitor-reports
router.post('/visitors/reports', (req, res) => {
    visitorService.createReport(req.body, (result) => {
        res.send(result);
    });
});

router.get('/visitors/reports', (req, res) => {
    visitorService.readAllReport((results) => {
        res.send(results);
    });
});

router.get('/visitors/:visitorId/reports', (req, res) => {
    var visitorId = req.params.visitorId;
    visitorService.readByVisitorIdReport(visitorId, (results) => {
        res.send(results);
    });
});

//visitor-reports
router.post('/visitors/history', (req, res) => {
    visitorService.createHistory(req.body, (result) => {
        res.send(result);
    });
});

router.get('/visitors/history', (req, res) => {
    visitorService.readAllHistory((results) => {
        res.send(results);
    });
});

//visitor-media
router.post('/visitors/media', (req, res) => {
    visitorService.createMedia(req.body, (result) => {
        res.send(result);
    });
});

router.get('/visitors/media', (req, res) => {
    visitorService.readAllMedia((results) => {
        res.send(results);
    });
});

//visitor-appointment
router.post('/visitors/appointment', (req, res) => {
    visitorService.createAppointment(req.body, (result) => {
        res.send(result);
    });
});

router.get('/visitors/appointment', (req, res) => {
    visitorService.readAllAppointment((results) => {
        res.send(results);
    });
});

router.get('/visitors/:visitorId/appointments/history', (req, res) => {
    var visitorId = req.params.visitorId;
    visitorService.readAppointmentHistory(visitorId, (results) => {
        res.send(results);
    });
});

router.get('/visitors/:visitorId/doctors/:doctorId/appointments', (req, res) => {
    var visitorId = req.params.visitorId;
    var doctorId = req.params.doctorId
    visitorService.getAppointmentDetails(visitorId, doctorId, (appointmentDetails) => {
        res.send(appointmentDetails);
    });
});


//visitor-store
router.post('/visitors/store', (req, res) => {
    visitorService.createStore(req.body, (result) => {
        res.send(result);
    });
});

router.get('/visitors/store', (req, res) => {
    visitorService.readAllStore((results) => {
        res.send(results);
    });
});

router.get('/visitors/:visitorId/store', (req, res) => {
    var visitorId = req.params.visitorId;
    visitorService.getVisitorStoreById(visitorId, (results) => {
        res.send(results);
    });
});

//visitor-timeline apis
router.post('/visitors/timeline', (req, res) => {
    visitorService.createVisitorTimeline(req.body, (result) => {
        res.send(result);
    });
});

router.get('/visitors/:visitorId/timeline', (req, res) => {
    var visitorId = req.params.visitorId;
    visitorService.readTimelineByVisitorId(visitorId, (results) => {
        res.send(results);
    });
});

// get consultations by visitorId
router.get('/visitors/:visitorId/consultations', (req, res) => {
    var visitorId = req.params.visitorId;
    var page = parseInt(req.query.page);
    var size = parseInt(req.query.size);
    visitorService.readConsultationsByVisitorId(visitorId, page, size, (results) => {
        res.send(results);
    });
});

// get appointments for doctorId
router.get('/appointments/doctors/:doctorId', (req, res) => {
    var doctorId = req.params.doctorId;
    var page = parseInt(req.query.page);
    var size = parseInt(req.query.size);
    visitorService.getAppointmentsByDoctorId(doctorId, page, size, (results) => {
        res.send(results);
    });
});

module.exports = router;