import express from 'express';
import VisitorService from './visitor.service';

var router = express.Router();
var visitorService = new VisitorService();

/**
 * @swagger
 * definitions:
 *   VisitorHealth:
 *     properties:
 *       id:
 *         type: integer
 *       visitorId:
 *         type: integer
 *       allergies:
 *         type: text
 *       foodHabits:
 *         type: text
 *       vitals:
 *         type: string
 *       startTime:
 *         type: string
 *         format: date
 *       endTime:
 *         type: string
 *         format: date
 *       createdBy: 
 *         type: integer
 *       updatedBy:
 *         type: integer
 */
/**
 * @swagger
 * /visitors/health:
 *   post:
 *     tags:
 *       - VisitorHealth
 *     description: Creates a new visitorHealth in MySql DB
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: VisitorHealth
 *         description: VisitorHealth object
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/VisitorHealth'
 *     responses:
 *       200:
 *         description: Successfully created in MySql DB
 */
router.post('/visitors/health', (req, res) => {
    visitorService.createHealth(req.body, (result) => {
        res.send(result);
    });
});

/**
 * @swagger
 * /visitors/health:
 *   get:
 *     tags:
 *       - VisitorHealth
 *     description: Returns all visitorHealth from MySql DB
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: An array of visitorHealth from MySql DB
 *         schema:
 *           $ref: '#/definitions/VisitorHealth'
 */
router.get('/visitors/health', (req, res) => {
    visitorService.readAllHealth((results) => {
        res.send(results);
    });
});

/**
 * @swagger
 * /visitors/{visitorId}/health:
 *   get:
 *     tags:
 *       - VisitorHealth
 *     description: Returns visitorHealth by visitorId from MySql DB
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: visitorId
 *         in: path
 *         description: visitorId for visitorHealth to return
 *         required: true
 *         type: integer
 *         schema:
 *           $ref: '#/definitions/VisitorHealth'
 *     responses:
 *       200:
 *         description: An visitorHealth return from MySql DB
 */
router.get('/visitors/:visitorId/health', (req, res) => {
    var visitorId = req.params.visitorId;
    visitorService.readByVisitorIdHealth(visitorId, (results) => {
        res.send(results);
    });
});

/**
 * @swagger
 * definitions:
 *   VisitorPrescription:
 *     properties:
 *       id:
 *         type: integer
 *       visitorId:
 *         type: integer
 *       doctorId:
 *         type: integer
 *       consultationId:
 *         type: integer
 *       type:
 *         type: string
 *       description:
 *         type: string
 *       issue:
 *         type: string
 *       analysis:
 *         type: text
 *       medication:
 *         type: text
 *       diagnostic:
 *         type: text
 *       prescription:
 *         type: text
 *       expectation: 
 *         type: string
 *       instructions:
 *         type: string
 *       createdBy: 
 *         type: integer
 *       updatedBy:
 *         type: integer
 */
/**
 * @swagger
 * /visitors/prescriptions:
 *   post:
 *     tags:
 *       - VisitorPrescription
 *     description: Creates a new visitorPrescription in MySql DB
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: VisitorPrescription
 *         description: VisitorPrescription object
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/VisitorPrescription'
 *     responses:
 *       200:
 *         description: Successfully created in MySql DB
 */
router.put('/visitors/prescriptions', (req, res) => {
    req.body.analysis = null;
    req.body.prescription = null;
    visitorService.updatePrescription(req.body, (result) => {
        res.send(result);
    });
});

/**
 * @swagger
 * /visitors/prescriptions:
 *   get:
 *     tags:
 *       - VisitorPrescription
 *     description: Returns all visitorPrescription from MySql DB
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: An array of visitorPrescription from MySql DB
 *         schema:
 *           $ref: '#/definitions/VisitorPrescription'
 */
router.get('/visitors/prescriptions', (req, res) => {
    visitorService.readAllPrescription((results) => {
        res.send(results);
    });
});

/**
 * @swagger
 * /visitors/{visitorId}/prescriptions:
 *   get:
 *     tags:
 *       - VisitorPrescription
 *     description: Returns visitorPrescription by visitorId from MySql DB
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: visitorId
 *         in: path
 *         description: visitorId for visitorPrescription to return
 *         required: true
 *         type: integer
 *         schema:
 *           $ref: '#/definitions/VisitorPrescription'
 *     responses:
 *       200:
 *         description: An visitorPrescription return from MySql DB
 */
router.get('/visitors/:visitorId/prescriptions', (req, res) => {
    var visitorId = req.params.visitorId;
    visitorService.readByVisitorIdPrescription(visitorId, (results) => {
        res.send(results);
    });
});

/**
 * @swagger
 * definitions:
 *   VisitorDiagnostic:
 *     properties:
 *       id:
 *         type: integer
 *       visitorId:
 *         type: integer
 *       doctorId:
 *         type: integer
 *       reportId:
 *         type: integer
 *       type: 
 *         type: string
 *       result:
 *         type: text
 *       result_observation:
 *         type: string
 *       status:
 *         type: string
 *       testDate:
 *         type: string
 *         format: date
 *       reportDate:
 *         type: string
 *         format: date
 *       vendor:
 *         type: string
 *       report_observation:
 *         type: string
 *         format: date
 *       createdBy: 
 *         type: integer
 *       updatedBy:
 *         type: integer
 */
/**
 * @swagger
 * /visitors/diagnostic:
 *   post:
 *     tags:
 *       - VisitorDiagnostic
 *     description: Creates a new visitorDiagnostic in MySql DB
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: visitorDiagnostic
 *         description: visitorDiagnostic object
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/VisitorDiagnostic'
 *     responses:
 *       200:
 *         description: Successfully created in MySql DB
 */
router.post('/visitors/diagnostic', (req, res) => {
    visitorService.createDiagnostic(req.body, (result) => {
        res.send(result);
    });
});

/**
 * @swagger
 * /visitors/diagnostic:
 *   get:
 *     tags:
 *       - VisitorDiagnostic
 *     description: Returns all visitorDiagnostic from MySql DB
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: An array of visitorDiagnostic from MySql DB
 *         schema:
 *           $ref: '#/definitions/VisitorDiagnostic'
 */
router.get('/visitors/diagnostic', (req, res) => {
    visitorService.readAllDiagnostic((results) => {
        res.send(results);
    });
});

/**
 * @swagger
 * definitions:
 *   VisitorReport:
 *     properties:
 *       id:
 *         type: integer
 *       visitorId:
 *         type: integer
 *       consultationId:
 *         type: integer
 *       type:
 *         type: string
 *       url:
 *         type: string
 *       title:
 *         type: string
 *       description:
 *         type: string
 *       status:
 *         type: string
 *       createdBy: 
 *         type: integer
 *       updatedBy:
 *         type: integer
 */
/**
 * @swagger
 * /visitors/reports:
 *   post:
 *     tags:
 *       - VisitorReport
 *     description: Creates a new visitorReport in MySql DB
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: VisitorReport
 *         description: VisitorReport object
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/VisitorReport'
 *     responses:
 *       200:
 *         description: Successfully created in MySql DB
 */
router.post('/visitors/reports', (req, res) => {
    visitorService.createReport(req.body, (result) => {
        res.send(result);
    });
});

/**
 * @swagger
 * /visitors/reports:
 *   get:
 *     tags:
 *       - VisitorReport
 *     description: Returns all visitorReport from MySql DB
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: An array of visitorReport from MySql DB
 *         schema:
 *           $ref: '#/definitions/VisitorReport'
 */
router.get('/visitors/reports', (req, res) => {
    visitorService.readAllReport((results) => {
        res.send(results);
    });
});

/**
 * @swagger
 * /visitors/{visitorId}/reports:
 *   get:
 *     tags:
 *       - VisitorReport
 *     description: Returns visitorReport by visitorId from MySql DB
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: visitorId
 *         in: path
 *         description: visitorId for visitorReport to return
 *         required: true
 *         type: integer
 *         schema:
 *           $ref: '#/definitions/VisitorReport'
 *     responses:
 *       200:
 *         description: An visitorReport return from MySql DB
 */
router.get('/visitors/:visitorId/reports', (req, res) => {
    var visitorId = req.params.visitorId;
    visitorService.readByVisitorIdReport(visitorId, (results) => {
        res.send(results);
    });
});

router.get('/reports/:reportId', (req, res) => {
    var reportId = req.params.reportId;
    visitorService.readReportById(reportId, (result) => {
        res.send(result);
    });
});

/**
 * @swagger
 * definitions:
 *   VisitorHistory:
 *     properties:
 *       id:
 *         type: integer
 *       visitorId:
 *         type: integer
 *       doctorId:
 *         type: integer
 *       type:
 *         type: string
 *       prescription:
 *         type: string
 *       prescription_artifacts:
 *         type: string
 *       createdBy: 
 *         type: integer
 *       updatedBy:
 *         type: integer
 */
/**
 * @swagger
 * /visitors/history:
 *   post:
 *     tags:
 *       - VisitorHistory
 *     description: Creates a new visitorHistory in MySql DB
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: VisitorHistory
 *         description: VisitorHistory object
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/VisitorHistory'
 *     responses:
 *       200:
 *         description: Successfully created in MySql DB
 */
router.post('/visitors/history', (req, res) => {
    visitorService.createHistory(req.body, (result) => {
        res.send(result);
    });
});

/**
 * @swagger
 * /visitors/history:
 *   get:
 *     tags:
 *       - VisitorHistory
 *     description: Returns all visitorHistory from MySql DB
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: An array of visitorHistory from MySql DB
 *         schema:
 *           $ref: '#/definitions/VisitorHistory'
 */
router.get('/visitors/history', (req, res) => {
    visitorService.readAllHistory((results) => {
        res.send(results);
    });
});

/**
 * @swagger
 * definitions:
 *   VisitorMedia:
 *     properties:
 *       id:
 *         type: integer
 *       visitorId:
 *         type: integer
 *       consultationId:
 *         type: integer
 *       title:
 *         type: string
 *       description:
 *         type: string
 *       url:
 *         type: string
 *       thumbUrl:
 *         type: string
 *       type: 
 *         type: string
 *       createdBy: 
 *         type: integer
 *       updatedBy:
 *         type: integer
 */
/**
 * @swagger
 * /visitors/media:
 *   post:
 *     tags:
 *       - VisitorMedia
 *     description: Creates a new visitorMedia in MySql DB
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: VisitorMedia
 *         description: VisitorMedia object
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/VisitorMedia'
 *     responses:
 *       200:
 *         description: Successfully created in MySql DB
 */
router.post('/visitors/media', (req, res) => {
    visitorService.createMedia(req.body, (result) => {
        res.send(result);
    });
});

/**
 * @swagger
 * /visitors/media:
 *   get:
 *     tags:
 *       - VisitorMedia
 *     description: Returns all visitorMedia from MySql DB
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: An array of visitorMedia from MySql DB
 *         schema:
 *           $ref: '#/definitions/VisitorMedia'
 */
router.get('/visitors/media', (req, res) => {
    visitorService.readAllMedia((results) => {
        res.send(results);
    });
});

/**
 * @swagger
 * definitions:
 *   VisitorAppointment:
 *     properties:
 *       id:
 *         type: integer
 *       visitorId:
 *         type: integer
 *       doctorId:
 *         type: integer
 *       activity:
 *         type: string
 *       slotId:
 *         type: string
 *       type:
 *         type: string
 *       waitTime:
 *         type: integer
 *       startTime:
 *         type: string
 *         format: date
 *       endTime: 
 *         type: string
 *         format: date
 *       duration:
 *         type: integer
 *       createdBy: 
 *         type: integer
 *       updatedBy:
 *         type: integer
 */
/**
 * @swagger
 * /visitors/appointment:
 *   post:
 *     tags:
 *       - VisitorAppointment
 *     description: Creates a new visitorAppointment in MySql DB
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: VisitorAppointment
 *         description: VisitorAppointment object
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/VisitorAppointment'
 *     responses:
 *       200:
 *         description: Successfully created in MySql DB
 */
router.post('/visitors/appointment', (req, res) => {
    visitorService.createAppointment(req.body, (result) => {
        res.send(result);
    });
});

/**
 * @swagger
 * /visitors/appointment:
 *   get:
 *     tags:
 *       - VisitorAppointment
 *     description: Returns all visitorAppointment from MySql DB
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: An array of visitorAppointment from MySql DB
 *         schema:
 *           $ref: '#/definitions/VisitorAppointment'
 */
router.get('/visitors/appointment', (req, res) => {
    visitorService.readAllAppointment((results) => {
        res.send(results);
    });
});

/**
 * @swagger
 * /visitors/{visitorId}/appointments/history:
 *   get:
 *     tags:
 *       - VisitorAppointment
 *     description: Returns VisitorAppointment history by visitorId from MySql DB
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: visitorId
 *         in: path
 *         description: visitorId for visitorAppointment history to return
 *         required: true
 *         type: integer
 *         schema:
 *           $ref: '#/definitions/VisitorAppointment'
 *     responses:
 *       200:
 *         description: visitorAppointment history returned from MySql DB
 */
router.get('/visitors/:visitorId/appointments/history', (req, res) => {
    var visitorId = req.params.visitorId;
    visitorService.readAppointmentHistory(visitorId, (results) => {
        res.send(results);
    });
});

/**
 * @swagger
 * /visitors/{visitorId}/doctors/{doctorId}/appointments:
 *   post:
 *     tags:
 *       - VisitorAppointment
 *     description: Appointment details by visitorId and doctorId
 *     produces:
 *       - application/json
 *     parameters:'
 *       - name: visitorId
 *         in: path
 *         description: visitorId for appointment 
 *         required: true
 *         type: integer
 *         schema:
 *           $ref: '#/definitions/VisitorAppointment'
 *       - name: doctorId
 *         in: path
 *         description: doctorId for appointment
 *         required: true
 *         type: integer
 *         schema:
 *           $ref: '#/definitions/VisitorAppointment'
 *     responses:
 *       200:
 *         description: Successfully created in MySql db
 */
router.get('/visitors/:visitorId/doctors/:doctorId/appointments', (req, res) => {
    var visitorId = req.params.visitorId;
    var doctorId = req.params.doctorId;
    var groupId = req.query.groupId;
    visitorService.getAppointmentDetails(visitorId, doctorId, groupId, (appointmentDetails) => {
        res.send(appointmentDetails);
    });
});

/**
 * @swagger
 * definitions:
 *   VisitorStore:
 *     properties:
 *       id:
 *         type: integer
 *       visitorId:
 *         type: integer
 *       type:
 *         type: string
 *       value:
 *         type: text
 */
/**
 * @swagger
 * /visitors/store:
 *   post:
 *     tags:
 *       - VisitorStore
 *     description: Creates a new visitorStore in MySql DB
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: VisitorStore
 *         description: VisitorStore object
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/VisitorStore'
 *     responses:
 *       200:
 *         description: Successfully created in MySql DB
 */
router.post('/visitors/store', (req, res) => {
    visitorService.createStore(req.body, (result) => {
        res.send(result);
    });
});

/**
 * @swagger
 * /visitors/store:
 *   get:
 *     tags:
 *       - VisitorStore
 *     description: Returns all visitorStore from MySql DB
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: An array of visitorStore from MySql DB
 *         schema:
 *           $ref: '#/definitions/VisitorStore'
 */
router.get('/visitors/store', (req, res) => {
    visitorService.readAllStore((results) => {
        res.send(results);
    });
});

/**
 * @swagger
 * /visitors/{visitorId}/store:
 *   get:
 *     tags:
 *       - VisitorStore
 *     description: Returns visitorStore by visitorId from MySql DB
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: visitorId
 *         in: path
 *         description: visitorId for visitorStore to return
 *         required: true
 *         type: integer
 *         schema:
 *           $ref: '#/definitions/VisitorStore'
 *     responses:
 *       200:
 *         description: An visitorStore return from MySql DB
 */
router.get('/visitors/:visitorId/store', (req, res) => {
    var visitorId = req.params.visitorId;
    visitorService.getVisitorStoreById(visitorId, (results) => {
        res.send(results);
    });
});

/**
 * @swagger
 * definitions:
 *   VisitorTimeline:
 *     properties:
 *       id:
 *         type: integer
 *       visitorId:
 *         type: integer
 *       timestamp:
 *         type: string
 *         format: date
 *       consultations:
 *         type: text
 *       reminders:
 *         type: text
 *       events:
 *         type: text
 *       createdBy: 
 *         type: integer
 *       updatedBy:
 *         type: integer
 */
/**
 * @swagger
 * /visitors/timeline:
 *   post:
 *     tags:
 *       - VisitorTimeline
 *     description: Creates a new visitorTimeline in MySql DB
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: VisitorTimeline
 *         description: VisitorTimeline object
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/VisitorTimeline'
 *     responses:
 *       200:
 *         description: Successfully created in MySql DB
 */
router.post('/visitors/timeline', (req, res) => {
    visitorService.createVisitorTimeline(req.body, (result) => {
        res.send(result);
    });
});

/**
 * @swagger
 * /visitors/{visitorId}/timeline:
 *   get:
 *     tags:
 *       - VisitorTimeline
 *     description: Returns visitorTimeline by visitorId from MySql DB
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: visitorId
 *         in: path
 *         description: visitorId for visitorTimeline to return
 *         required: true
 *         type: integer
 *         schema:
 *           $ref: '#/definitions/VisitorTimeline'
 *     responses:
 *       200:
 *         description: An visitorTimeline return from MySql DB
 */
router.get('/visitors/:visitorId/timeline', (req, res) => {
    var visitorId = req.params.visitorId;
    visitorService.readTimelineByVisitorId(visitorId, (results) => {
        res.send(results);
    });
});

/**
 * @swagger
 * /visitors/{visitorId}/consultations:
 *   get:
 *     tags:
 *       - VisitorTimeline
 *     description: Returns consultations by visitorId from MySql DB
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: visitorId
 *         in: path
 *         description: visitorId for visitorTimeline to return
 *         required: true
 *         type: integer
 *         schema:
 *           $ref: '#/definitions/VisitorTimeline'
 *     responses:
 *       200:
 *         description: Consultations by visitorId from MySql DB
 */
router.get('/visitors/:visitorId/consultations', (req, res) => {
    var visitorId = req.params.visitorId;
    var high = req.query.high;
    var low = req.query.low;
    visitorService.readAllConsultationsByVisitorId(visitorId, high, low, (results) => {
        res.send(results);
    });
});
router.get('/visitors/:visitorId/consultations/readall', (req, res) => {
    var visitorId = req.params.visitorId;
    var page = parseInt(req.query.page);
    var size = parseInt(req.query.size);
    visitorService.readConsultationsByVisitorId(visitorId, page, size, (results) => {
        res.send(results);
    });
});
router.get('/visitors/:visitorId/info', (req, res) => {
    var visitorId = req.params.visitorId;
    visitorService.readVisitorInfo(visitorId, (results) => {
        res.send(results);
    });
});
router.get('/visitors/:visitorId/reports', (req, res) => {
    var visitorId = req.params.visitorId;
    var high = req.query.high;
    var low = req.query.low;
    visitorService.getReportsByVisitorId(visitorId, high, low, (results) => {
        res.send(results);
    });
});
//all consultations by doctorId
router.get('/doctors/:doctorId/consultations', (req, res) => {
    var doctorId = req.params.doctorId;
    var page = parseInt(req.query.page);
    var size = parseInt(req.query.size);
    visitorService.readAllConsultationsByDoctorId(doctorId, page, size, (results) => {
        res.send(results);
    });
});

router.get('/doctors/:doctorId/consultations/readall', (req, res) => {
    var doctorId = req.params.doctorId;
    var high = req.query.high;
    var low = req.query.low;
    visitorService.getAllConsultationsByDoctorId(doctorId, high, low, (results) => {
        res.send(results);
    });
});

router.get('/doctors/:doctorId/consultations/:consultationId', (req, res) => {
    var doctorId = req.params.doctorId;
    var consultationId = req.params.consultationId;
    visitorService.getConsultationByConsultationId(doctorId, consultationId, (result) => {
        res.send(result);
    });
});
/**
 * @swagger
 * /appointments/doctors/{doctorId}:
 *   get:
 *     tags:
 *       - VisitorAppointment
 *     description: Returns appointments for doctorId from MySql DB
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: doctorId
 *         in: path
 *         description: doctorId for visitorAppointment to return
 *         required: true
 *         type: integer
 *         schema:
 *           $ref: '#/definitions/VisitorAppointment'
 *     responses:
 *       200:
 *         description: Appointments for doctorId from MySql DB
 */
router.get('/appointments/doctors/:doctorId', (req, res) => {
    var doctorId = req.params.doctorId;
    var page = parseInt(req.query.page);
    var size = parseInt(req.query.size);
    visitorService.getAppointmentsByDoctorId(doctorId, page, size, (results) => {
        res.send(results);
    });
});

module.exports = router;