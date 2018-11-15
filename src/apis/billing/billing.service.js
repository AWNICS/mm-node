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
                senderId: billingCreated.visitorId,
                receiverId: billingCreated.doctorId,
                receiverType: 'group',
                entityName: 'Bill',
                entityEvent: 'Created',
                createdBy: billingCreated.visitorId,
                updatedBy: billingCreated.visitorId,
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
                    senderId: billing.visitorId,
                    receiverId: billing.consultationId,
                    receiverType: 'group',
                    entityName: 'Bill',
                    entityEvent: 'Updated',
                    createdBy: billing.visitorId,
                    updatedBy: billing.visitorId,
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
        billingModel.billing.findAll({ where: { visitorId: visitorId } }).then((billings) => {
            callback(billings);
        });
    }

    /**
     * expenditures made by patient (need to modify this based on amount column structure(inside billing table))
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