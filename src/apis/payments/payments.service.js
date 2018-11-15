import Dotenv from 'dotenv';
import billingModel from '../billing/index';
import log from '../../config/log4js.config';
import fs from 'fs';
const ccav = require('./payments.util');
const dotenv = Dotenv.config({
    path: '.env.dev'
});

class PaymentService {

    requestHandler(request, response) {
        if (request) {
            var workingKey = process.env.CCAV_WORKING_KEY, //Put in the 32-Bit key shared by CCAvenues.
                accessCode = process.env.CCAV_ACCESS_CODE, //Put in the access code shared by CCAvenues.
                encRequest = '',
                formbody = '',
                encRequest = '',
                merchantId = 192155;
            let postData='';
            request.on('data',(data)=>{
                postData+= data;
            })
            request.on('end',()=>{
                log.info(postData);
                encRequest = ccav.encrypt(postData.toString(), workingKey)
                formbody = '<html><head><title>Sub-merchant checkout page</title><script src="http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js"></script></head><body><center><!-- width required mininmum 482px --><iframe  width="600" height="600" scrolling="Yes" frameborder="0"  id="paymentFrame" src="https://secure.ccavenue.com/transaction/transaction.do?command=initiateTransaction&merchant_id=' + merchantId + '&encRequest=' + encRequest + '&access_code=' + accessCode + '"></iframe></center><script type="text/javascript">$(document).ready(function(){$("iframe#paymentFrame").load(function() {window.addEventListener("message", function(e) {$("#paymentFrame").css("height",e.data["newHeight"]+"px"); }, false);}); });</script></body></html>';
    
                if (formbody) {
                    response.writeHeader(200, {
                        "Content-Type": "text/html"
                    }); 
                    response.write(formbody);
                    response.end();
                }
                return;
            })
        }
    }

    responseHandler(request, response) {
        if (request) {
            var ccavResponse = '',
                workingKey = process.env.CCAV_WORKING_KEY, //Put in the 32-Bit key provided by CCAvenues.
                ccavPOST = '';

            ccavPOST = request.body;
            var encryption = ccavPOST.encResp.toString();
            ccavResponse = ccav.decrypt(encryption, workingKey);
            log.info("The below is the response from ccavenue for the orderNo "+ccavResponse.orderNo);
            log.info(ccavResponse);
            if (ccavResponse) {
                let referenceNumber = ccavResponse.match(/bank_ref_no=[a-zA-Z]+/)[0].substring(12);
                let status = ccavResponse.match(/order_status=[a-zA-Z]+/)[0].substring(13);
                if(status === 'Success'){
                    let image = fs.readFileSync('images/payment_success.png',{encoding:'base64'});
                    log.info('Transaction Success with status: '+status);
                    let htmlcode = `<html>
                    <head>
                        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
                        <title>Payment page</title>
                    </head>
                    <body>
                    <div style="width:100%;position: relative;margin-top:7%;height:56%">
                        <div id="paymentBox" style="width:70%;max-height:100%;position: relative;left:13%;background: #adbd3759;border:3px solid #00968830;border-radius:14px">
                            <div id="image" style="margin:23px">
                                <img src="${'data:image/png;base64, '+image}"  style="position: relative;left:50%;height:46%;transform: translateX(-50%);border-radius:53%">
                            </div>
                            <h1 style="text-align:center">Payment was Successful</h1>
                            <p style="text-align: center">Your transaction reference number is ${referenceNumber}</p>
                            <p style="text-align: center"><a href="https://mesomeds.com">Click here </a>to get back to mesomeds.com or you will be redirected back automatically in 3 seconds</p>
                        </div>
                    </div>
                    <script>
                     setTimeout(()=>{window.location="https://mesomeds.com"},3000);
                    </script>
                    </body>
                </html>` ;           
                    response.writeHeader(200, {
                        "Content-Type": "text/html"
                    });
                    response.write(htmlcode);
                    response.end();

                }else if(status ==='Aborted' || status ==='Failure' || status==='Invalid'){
                    log.info('Transaction failed with status: '+status);
                    let image = fs.readFileSync('images/payment_failed.png',{encoding:'base64'});
                    let htmlcode = 
                    `<html>
                        <head>
                            <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
                            <title>Payment page</title>
                        </head>
                        <body>
                            <div style="width:100%;position: relative;margin-top:7%;height:56%">
                                        <div id="paymentBox" style="width:70%;max-height:100%;position: relative;left:13%;background: #adbd3759;border:3px solid #00968830;border-radius:14px">
                                            <div id="image" style="margin:23px">
                                                <img src="${'data:image/png;base64, '+image}"  style="position: relative;left:50%;height:46%;transform: translateX(-50%);border-radius:53%">
                                            </div>
                                            <h1 style="text-align:center">Payment failed</h1>
                                            <p style="text-align: center"><a href="https://mesomeds.com">Click here </a>to get back to mesomeds.com or you will be redirected back automatically in 3 seconds</p>
                                        </div>
                            </div>
                        <script>
                         setTimeout(()=>{window.location="https://mesomeds.com"},3000);
                        </script>
                        </body>
                    </html>`;
                    response.writeHeader(200, {
                        "Content-Type": "text/html"
                    });
                    response.write(htmlcode);
                    response.end();

                }else{
                    log.info('Billing new status detected status: '+status);
                }
                
                let bill = {
                    status:status,
                    referenceNumber:referenceNumber,
                    modeOfPayment:ccavResponse.match(/payment_mode=[a-zA-Z ]+/)[0].substring(13),
                }
                log.info(bill);
                console.log(ccavPOST.orderNo);
                billingModel.billing.update(bill,{where:{orderId:ccavPOST.orderNo}}).then((res)=>{
                    console.log(res);
                    if(res[0]===1){
                        log.info("Billing entry updated");
                    }else{
                        log.info('Duplicate orderID entries exist in database for billing table count '+res[0]);
                        log.info('Something went wrong in updating bill');
                    }
                }).catch((error)=>{
                    console.log(error);
                })
            }
        }
    }
}

export default PaymentService;