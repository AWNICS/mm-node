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

router.get('/visitors/:visitorId/appointment', (req, res) => {
    var visitorId = req.params.visitorId;
    visitorService.readByVisitorIdAppointment(visitorId, (results) => {
        res.send(results);
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
    visitorService.getVisitorById(visitorId, (results) => {
        res.send(results);
    });
});

module.exports = router;