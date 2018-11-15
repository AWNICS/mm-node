import BillingDao from './billing.dao';
import billingModel from './index';
import visitorModel from '../visitor/index';
import VisitorService from '../visitor/visitor.service';
import AuditService from '../audit/audit.service';
import AuditModel from '../audit/audit.model';
import ConsultationPriceDao from './consultation-price.dao';
import PdfPrinter from 'pdfmake/src/printer';
import fs from 'fs';
import moment from 'moment';
import FileService from '../file/file.service';
import bucket from '../../config/gcp.config';
import log from '../../config/log4js.config';

let fonts = {
    Roboto: {
        normal: 'fonts/Roboto-Regular.ttf',
        bold: 'fonts/Roboto-Medium.ttf',
        italics: 'fonts/Roboto-Italic.ttf',
        bolditalics: 'fonts/Roboto-Italic.ttf'
    }
};

let printer = new PdfPrinter(fonts);
let logoImage = fs.readFileSync('images/logo.jpg', 'base64');
const billingDao = new BillingDao();
const visitorService = new VisitorService();
const auditService = new AuditService();
const consultationPriceDao = new ConsultationPriceDao();
const fileService = new FileService();

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

    //billing by doctorId
    getAllBillingByDoctorId(doctorId, callback) {
        billingModel.billing.findAll({ where: { doctorId: doctorId } }).then((billings) => {
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

    generateBillingPdf(userId,invoiceNumber, invoiceDate, customerName,price,tax,coupon,discount,doctorName,callback){
        let documentData = {
            pageSize: 'A4',
            pageOrientation: 'portrait',
            pageMargins: [30, 100, 30, 50],
            header: function(currentPage, pageCount, pageSize) {
                return [
                    { canvas: [{ type: 'rect', x: 0, y: 0, h: 90, w: pageSize.width, color: 'red' }] },
                    { text: '', alignment: 'center', color: 'blue', marginTop: -30 },
                    { image: 'data:image/jpeg;base64,' + logoImage, height: 80, width: 80, marginTop: -55, marginLeft: 6 }
                ]
            },
            content: [
                { text: ["Invoice Number: ", { text: invoiceNumber, style: 'subElement' }], style: 'element' },
                { text: ["Invoice Date: ", { text: invoiceDate }], style: 'element' },
                // { text: ["Invoice To: ", { text:  }], style: 'element' },
                { text: ["Customer's Name: ", { text: customerName }], style: 'element' },
                {
                    // layout: 'lightHorizontalLines', // optional
                    layout: {
                        fillColor: function(rowIndex, node, columnIndex) {
                            return (rowIndex % 2 === 0) ? '#CCCCCC' : null;
                        }
                    },
                    margin: [0, 50, 0, 0],
                    table: {
                        // headers are automatically repeated if the table spans over multiple pages
                        // you can declare how many rows should be treated as headers
                        headerRows: 1,
                        widths: ['60%', '10%', '10%', '10%', '10%'],
                        body: [
                            [{ text: 'Description', style: 'tableHead' }, { text: 'Qty', style: 'tableHead' }, { text: 'Price', style: 'tableHead' }, { text: 'Tax', style: 'tableHead' }, { text: 'Amount', style: 'tableHead' }],
                            [{ text: 'Health and Wellness Consultation Charges \n (Includes Free text followup until (36/25/1232))', style: 'tableBody' },
                                { text: '1', style: 'tableBody' },
                                { text: price, style: 'tableBody' },
                                { text: tax, style: 'tableBody' },
                                { text: 1* price, style: 'tableBody' }
                            ],
                            // [{ text: 'Bold value', bold: true }, 'Val 2', 'Val 3', 'Val 4']
                        ]
                    }
                },
                {
                    layout: {
                        defaultBorder: false,
                    },
                    margin: [340, 20, 0, 0],
                    table: {
                        // headers are automatically repeated if the table spans over multiple pages
                        // you can declare how many rows should be treated as headers
                        // headerRows: 1,
                        widths: ['70%', '30%'],
                        body: [
                            [{ text: 'Subtotal :', style: 'table2Head' }, { text: price, style: 'table2Body' }],
                            [{ text: 'Tax :', style: 'table2Head' }, { text: tax, style: 'table2Body' }],
                            [{ text: `Discount :\n (${coupon}) `, style: 'table2Head' }, { text: discount, style: 'table2Body' }],
                            [{ text: 'Total :', style: 'table2Head' }, { text: price+tax-discount, style: 'table2Body' }]
        
                        ]
                    }
                },
                {
                    text: ['Note: ',
                        { text: 'Issued on behalf of Consulting Physician', bold: false },
                        { text: ' Dr. '+doctorName, bold: true }
                    ],
                    marginTop: 40,
                    bold: true,
                    fontSize: 14
                },
                // {
                //     text: [
                //         'This paragraph is defined as an array of elements to make it possible to ',
                //         { text: 'restyle part of it and make it bigger ', fontSize: 15 },
                //         'than the rest.'
                //     ]
                // }
            ],
            styles: {
                header: {
                    fontSize: 20,
                    bold: true,
                    italics: true,
                    alignment: 'right',
                    background: 'red',
                    color: 'red'
                },
                element: {
                    fontSize: 18,
                    bold: true,
                    marginTop: 15
        
                },
                subElement: {
                    bold: false
                },
                tableHead: {
                    bold: true,
                    alignment: 'center',
                },
                table2Head: {
                    bold: true,
                    alignment: 'left',
                },
                tableBody: {
                    alignment: 'center'
                },
                table2Body: {
                    bold: false,
                },
            },
            footer: function(currentPage, pageCount, pageSize) {
                return [
                    { canvas: [{ type: 'rect', x: 0, y: -14, w: pageSize.width, h: 64, color: 'red' }] }
                ]
            },
        }
    
    var pdfDoc = printer.createPdfKitDocument(documentData);

    var date = moment().utcOffset(330).format('DD-MM-YYYYTHH-mm-ss-SSS');
    var fileName = userId+'-bill'+ '-' + date + '.pdf';
    pdfDoc.pipe(fs.createWriteStream('tmp/'+fileName)).on('finish', function() {
    fileService.pdfUpload(fileName,bucket,(fileName)=>{
        log.info('Generation of billing pdf successfull for userId: '+userId+' with filename '+fileName.fileName);
        callback(fileName);
    })
    });
    pdfDoc.end();
    }
}

export default BillingService;