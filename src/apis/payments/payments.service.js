import Dotenv from 'dotenv';
import billingModel from '../billing/index';
import BillingService from '../billing/billing.service';
import GroupService from '../group/group.service';
import log from '../../config/log4js.config';
import moment from 'moment';
import fs from 'fs';
const ccav = require('./payments.util');
const dotenv = Dotenv.config({
    path: '.env.dev'
});

const billingService = new BillingService();
const groupService = new GroupService();


class PaymentService {
    requestHandler(request, response) {
        if (request) {
            var workingKey = process.env.CCAV_WORKING_KEY, //Put in the 32-Bit key shared by CCAvenues.
                accessCode = process.env.CCAV_ACCESS_CODE, //Put in the access code shared by CCAvenues.
                encRequest = '',
                formbody = '',
                encRequest = '',
                merchantId = 192155;
            let postData = '';
            request.on('data', (data) => {
                postData += data;
            })
            request.on('end', () => {
                log.info(postData);
                encRequest = ccav.encrypt(postData.toString(), workingKey)
                formbody = `<html><head><title>Sub-merchant checkout page</title><script src="http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js"></script></head><body><center><!-- width required mininmum 482px --><iframe  width="600" height="600" scrolling="Yes" frameborder="0"  id="paymentFrame" src="https://secure.ccavenue.com/transaction/transaction.do?command=initiateTransaction&merchant_id=${merchantId}&encRequest=${encRequest}&access_code=${accessCode}"></iframe></center><script type="text/javascript">$(document).ready(function(){$("iframe#paymentFrame").load(function() {window.addEventListener("message", function(e) {$("#paymentFrame").css("height",e.data["newHeight"]+"px"); }, false);}); });</script></body></html>`;
                if (formbody) { 
                    response.setHeader( "Content-Type","text/html");
                    response.send(formbody);
                }
                return;
            })
        }
    }

    responseHandler(request, response) {
        if (request) {
            console.log(request.body);
            var ccavResponse = '',
                workingKey = process.env.CCAV_WORKING_KEY, //Put in the 32-Bit key provided by CCAvenues.
                ccavPOST = '',
            ccavPOST = request.body;
            var encryption = ccavPOST.encResp.toString();
            ccavResponse = ccav.decrypt(encryption, workingKey);
            log.info("The below is the response from ccavenue for the orderNo " + ccavPOST.orderNo);
            log.info(ccavResponse);
            if (ccavResponse) {
                let referenceNumber = ccavResponse.match(/bank_ref_no=[a-zA-Z0-9]+/)[0].substring(12);
                let status = ccavResponse.match(/order_status=[a-zA-Z]+/)[0].substring(13);
                if (status === 'Success') {
                var transactionDateAndTime = moment(ccavResponse.match(/trans_date=[0-9/: ]+/)[0].substring(11), 'DD/MM/YYYY HH:mm:ss').format('YYYY-MM-DD HH:mm:ss');
                var transactionDate = transactionDateAndTime.substring(0, 10);
                    billingModel.billing.find({ where: { orderId: ccavPOST.orderNo } }).then((bill) => {
                        if (bill) {
                            groupService.consultNow(bill.doctorId, bill.visitorId, bill.speciality, (groupCreated) => {
                                this.updateBillingEntry(status, ccavResponse, ccavPOST.orderNo ,groupCreated.id, referenceNumber, transactionDateAndTime, transactionDate);
                                let image = fs.readFileSync('images/payment_success.png', { encoding: 'base64' });
                                log.info('Transaction Success with status: ' + status);
                                let htmlcode = `<html>
                        <head>
                            <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
                            <title>Payment page</title>
                        </head>
                        <body>
                        <div style="width:100%;position: relative;margin-top:7%;height:56%">
                            <div id="paymentBox" style="width:70%;max-height:100%;position: relative;left:13%;background: #ede7f6;border:3px solid #00968830;border-radius:14px">
                                <div id="image" style="margin:23px">
                                    <img src="${'data:image/png;base64, '+image}"  style="position: relative;left:50%;height:46%;transform: translateX(-50%);border-radius:53%">
                                </div>
                                <h1 style="text-align:center">Payment was Successful</h1>
                                <p style="text-align: center">Your transaction reference number is ${referenceNumber}</p>
                                <p style="text-align: center"><a href="https://mesomeds.com/chat/${bill.visitorId}?active_group=${groupCreated.id}">Click here </a>to get back to mesomeds.com or you will be redirected back automatically in 3 seconds</p>
                            </div>
                        </div>
                        <script>
                         setTimeout(()=>{window.location="https://mesomeds.com/chat/${bill.visitorId}?active_group=${groupCreated.id}"},3000);
                        </script>
                        </body>
                    </html>`;
                                response.writeHeader(200, {
                                    "Content-Type": "text/html"
                                });
                                response.write(htmlcode);
                                response.end();
                            });
                        }
                    })
                } else if (status === 'Aborted' || status === 'Failure' || status === 'Invalid') {
                    billingModel.billing.find({ where: { orderId: ccavPOST.orderNo } }).then((bill) => {
                        if (bill) {
                    this.updateBillingEntry(status, ccavResponse, ccavPOST.orderNo, groupCreated.id, referenceNumber, transactionDateAndTime, transactionDate);
                    log.info('Transaction failed with status: ' + status);
                    let image = fs.readFileSync('images/payment_failed.png', { encoding: 'base64' });
                    let htmlcode =
                        `<html>
                        <head>
                            <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
                            <title>Payment page</title>
                        </head>
                        <body>
                            <div style="width:100%;position: relative;margin-top:7%;height:56%">
                                        <div id="paymentBox" style="width:70%;max-height:100%;position: relative;left:13%;background: #ede7f6;border:3px solid #00968830;border-radius:14px">
                                            <div id="image" style="margin:23px">
                                                <img src="${'data:image/png;base64, '+image}"  style="position: relative;left:50%;height:46%;transform: translateX(-50%);border-radius:53%">
                                            </div>
                                            <h1 style="text-align:center">Payment failed</h1>
                                            <p style="text-align: center"><a href="https://mesomeds.com/payments/${bill.visitorId}">Click here </a>to get back to mesomeds.com or you will be redirected back automatically in 3 seconds</p>
                                        </div>
                            </div>
                        <script>
                         setTimeout(()=>{window.location="https://mesomeds.com/payments/${bill.visitorId}"},3000);
                        </script>
                        </body>
                    </html>`;
                    response.writeHeader(200, {
                        "Content-Type": "text/html"
                    });
                    response.write(htmlcode);
                    response.end();
                }
                });
                } else {
                    log.info('Billing new status detected status: ' + status);
                }
            }
        }
    }
    updateBillingEntry(status, ccavResponse, orderNo, groupId, referenceNumber, transactionDateAndTime, transactionDate){
        let customerName = ccavResponse.match(/billing_name=[a-zA-Z ]+/)[0].substring(13);
        let failureMessage = ccavResponse.match(/failure_message=[a-zA-Z0-9 ]+/) !== null ? ccavResponse.match(/failure_message=[a-zA-Z0-9 ]+/)[0].substring(16) : null;
        let trackingId = ccavResponse.match(/tracking_id=[0-9]+/) !== null ? ccavResponse.match(/tracking_id=[0-9]+/)[0].substring(12) : null;
        let modeOfPayment = ccavResponse.match(/payment_mode=[a-zA-Z ]+/) !== null ? ccavResponse.match(/payment_mode=[a-zA-Z ]+/)[0].substring(13) : null;
        let cardName = ccavResponse.match(/card_name=[a-zA-Z0-9 ]+/) !== null ? ccavResponse.match(/card_name=[a-zA-Z0-9 ]+/)[0].substring(10) : null
        billingModel.billing.find({ where: { orderId: orderNo } }).then((orderDetails) => {
            if (status === 'Success') {
                let userId = orderDetails.visitorId;
                let doctorName = orderDetails.description.match(/Dr\.[a-zA-Z ]+$/) !== null ? orderDetails.description.match(/Dr\.[a-zA-Z ]+$/)[0] : null;
                let billAmount = orderDetails.amount;
                billingService.generateBillingPdf(userId, orderNo, transactionDate, customerName, billAmount, 0, 'Nill', 0, doctorName, (fileName) => {
                    let bill = {
                        status: status,
                        referenceNumber: referenceNumber,
                        modeOfPayment: modeOfPayment,
                        cardName: cardName,
                        consultationId: groupId,
                        trackingId: trackingId,
                        date: transactionDateAndTime,
                        url: fileName.fileName
                    };
                    log.info(bill);
                    billingModel.billing.update(bill, { where: { orderId: orderNo } }).then((res) => {
                        if (res[0] === 1) {
                            log.info("Billing entry updated");
                        } else {
                            log.info('Duplicate orderID entries exist in database for billing table count ' + res[0]);
                            log.info('Something went wrong in updating bill');
                        }
                    }).catch((error) => {
                        log.info(error);
                    })
                })
            } else {
                let bill = {
                    status: status,
                    referenceNumber: referenceNumber,
                    modeOfPayment: modeOfPayment,
                    failureMessage: failureMessage,
                    trackingId: trackingId,
                };
                log.info(bill);
                billingModel.billing.update(bill, { where: { orderId: orderNo } }).then((res) => {
                    if (res[0] === 1) {
                        log.info("Billing entry updated");
                    } else {
                        log.info('Duplicate orderID entries exist in database for billing table count ' + res[0]);
                        log.info('Something went wrong in updating bill');
                    }
                }).catch((error) => {
                    log.info(error);
                })
            }
        })
    }
    bypassresponseHandler(response, orderNo, customerName, billAmount) {
            var createdGroupId;
            var transactionDate = Date.now();
            var transactionDateAndTime = moment(Date.now()).format('YYYY-MM-DDTHH:mm:ss');
            var transactionDate = transactionDateAndTime.substring(0, 10);
                    billingModel.billing.find({ where: { orderId: orderNo } }).then((bill) => {
                        if (bill) {
                            groupService.consultNow(bill.doctorId, bill.visitorId, bill.speciality, (groupCreated) => {
                                createdGroupId = groupCreated.id;
                                let image = fs.readFileSync('images/payment_success.png', { encoding: 'base64' });
                                log.info('Transaction Success with status: Success');   
                                let htmlcode = `<html>
                        <head>
                            <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
                            <title>Payment page</title>
                        </head>
                        <body>
                        <div style="width:100%;position: relative;margin-top:7%;height:56%">
                            <div id="paymentBox" style="width:70%;max-height:100%;position: relative;left:13%;background: #ede7f6;border:3px solid #00968830;border-radius:14px">
                                <div id="image" style="margin:23px">
                                    <img src="${'data:image/png;base64, '+image}"  style="position: relative;left:50%;height:46%;transform: translateX(-50%);border-radius:53%">
                                </div>
                                <h1 style="text-align:center">Payment was Successful</h1>
                                <p style="text-align: center">Your transaction reference number is TEST001</p>
                                <p style="text-align: center"><a href="http://localhost:4200/chat/${bill.visitorId}?active_group=${groupCreated.id}">Click here </a>to get back to mesomeds.com or you will be redirected back automatically in 3 seconds</p>
                            </div>
                        </div>
                        <script>
                         setTimeout(()=>{window.location="http://localhost:4200/chat/${bill.visitorId}?active_group=${groupCreated.id}"},3000);
                        </script>
                        </body>
                    </html>`;
                                response.writeHeader(200, { 
                                    "Content-Type": "text/html"
                                });
                                response.write(htmlcode);
                                response.end();
                            });
                        }
                    })

                billingModel.billing.find({ where: { orderId: orderNo } }).then((orderDetails) => {
                        let userId = orderDetails.visitorId;
                        let doctorName = orderDetails.description.match(/Dr\.[a-zA-Z ]+$/) !== null ? orderDetails.description.match(/Dr\.[a-zA-Z ]+$/)[0] : null;
                        let billAmount = orderDetails.amount;
                        billingService.generateBillingPdf(userId, orderNo, transactionDate, customerName, billAmount, 0, 'Nill', 0, doctorName, (fileName) => {
                            let bill = {
                                status: "Success",
                                referenceNumber: "TEST001",
                                modeOfPayment: 'Bypassed',
                                cardName: "TEST001",
                                consultationId: createdGroupId,
                                trackingId: 'TEST0001',
                                date: transactionDateAndTime,
                                url: fileName.fileName
                            };
                            log.info(bill);
                            billingModel.billing.update(bill, { where: { orderId: orderNo } }).then((res) => {
                                if (res[0] === 1) {
                                    log.info("Billing entry updated");
                                } else {
                                    log.info('Duplicate orderID entries exist in database for billing table count ' + res[0]);
                                    log.info('Something went wrong in updating bill');
                                }
                            }).catch((error) => {
                                log.info(error);
                            })
                        })
                })

    }
}

export default PaymentService;