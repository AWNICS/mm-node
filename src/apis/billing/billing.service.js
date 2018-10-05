import BillingDao from './billing.dao';
import billingModel from './index';
import visitorModel from '../visitor/index';
import VisitorService from '../visitor/visitor.service';
import AuditService from '../audit/audit.service';
import AuditModel from '../audit/audit.model';
import ConsultationPriceDao from './consultation-price.dao';

const billingDao = new BillingDao();
const visitorService = new VisitorService();
const auditService = new AuditService();
const consultationPriceDao = new ConsultationPriceDao();

class BillingService {

    //billing related CRUD APIs
    create(billing, callback) {
        billingDao.insert(billing, (billingCreated) => {
            //create audit for this created bill
            var audit = new AuditModel({
                senderId: billingCreated.targetId,
                receiverId: billingCreated.consultationId,
                receiverType: 'group',
                entityName: 'Bill',
                entityEvent: 'Created',
                createdBy: billingCreated.targetId,
                updatedBy: billingCreated.targetId,
                createdTime: Date.now(),
                updatedTime: Date.now()
            });
            auditService.create(audit, () => {});
            callback(billingCreated);
        });
    }

    readAll(callback) {
        billingDao.readAll((billings) => {
            callback(billings);
        });
    }

    readById(id, callback) {
        billingDao.readById(id, (billing) => {
            callback(billing);
        });
    }

    update(billing, callback) {
        billingDao.update(billing, (result) => {
            if (result.length > 0) {
                //create audit for this updated bill
                var audit = new AuditModel({
                    senderId: billing.targetId,
                    receiverId: billing.consultationId,
                    receiverType: 'group',
                    entityName: 'Bill',
                    entityEvent: 'Updated',
                    createdBy: billing.targetId,
                    updatedBy: billing.targetId,
                    createdTime: Date.now(),
                    updatedTime: Date.now()
                });
                auditService.create(audit, () => {});
                callback(result);
            }
        });
    }

    remove(id, callback) {
        billingDao.delete(id, (result) => {
            callback(result);
        });
    }

    //consultation price related CRUD operations
    createConsultationPrice(consultationPrice, callback) {
        consultationPriceDao.insert(consultationPrice, (consultationPriceCreated) => {
            callback(consultationPriceCreated);
        });
    }

    readAllConsultationPrice(callback) {
        consultationPriceDao.readAll((consultationPrices) => {
            callback(consultationPrices);
        });
    }

    readByIdConsultationPrice(id, callback) {
        consultationPriceDao.readById(id, (consultationPrice) => {
            callback(consultationPrice);
        });
    }

    updateConsultationPrice(consultationPrice, callback) {
        consultationPriceDao.update(consultationPrice, (result) => {
            callback(result);
        });
    }

    removeConsultationPrice(id, callback) {
        consultationPriceDao.delete(id, (result) => {
            callback(result);
        });
    }

    //billing by visitorId
    getAllBillingByVisitorId(visitorId, callback) {
        billingModel.billing.findAll({ where: { targetId: visitorId } }).then((billings) => {
            callback(billings);
        });
    }

    //billing by doctorId
    getAllBillingByDoctorId(doctorId, callback) {
        billingModel.billing.findAll({ where: { requestedId: doctorId } }).then((billings) => {
            callback(billings);
        });
    }

    /**
     * expenditures made by patient
     */
    moneySpentByVisitor(visitorId, callback) {
        this.getAllBillingByVisitorId(visitorId, (billings) => {
            var money = 0;
            Promise.all(billings.map((billing) => {
                money = money + billing.amount.consultationCharges + billing.amount.taxes.cgst + billing.amount.taxes.sgst + billing.amount.taxes.igst;
            }));
            callback(money);
        });
    }

    /**
     * money earned by doctor
     */
    moneyEarnedByDoctor(doctorId, callback) {
        this.getAllBillingByDoctorId(doctorId, (billings) => {
            var earned = 0;
            Promise.all(billings.map((billing) => { //only 75% will have to give to the doctor
                earned = earned + billing.amount.consultationCharges * 0.75;
            }));
            callback(earned);
        });
    }

    /**
     * overall time spent by doctor 
     */
    durationForDoctor(doctorId, callback) {
        visitorModel.visitor_appointment.findAll({ where: { doctorId: doctorId } })
            .then((visitorAppointments) => {
                var duration = 0;
                Promise.all(visitorAppointments.map((visitorAppointment) => {
                    duration = duration + visitorAppointment.duration;
                }));
                callback(duration);
            });
    }

    /**
     * number of patients attended by the doctor
     */
    consultationsByDoctor(doctorId, callback) {
        visitorModel.visitor_appointment.findAll({ where: { doctorId: doctorId } })
            .then((visitorAppointments) => {
                callback(visitorAppointments.length);
            });
    }

    /**
     * number of consultations completed by the patient
     */
    consultationsOfVisitor(visitorId, callback) {
        visitorService.readByIdAppointment(visitorId, (visitorAppointments) => {
            callback(visitorAppointments.length);
        });
    }
}

export default BillingService;