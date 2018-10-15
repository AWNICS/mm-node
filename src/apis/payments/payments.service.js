import Dotenv from 'dotenv';
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
                merchantId = '';
            encRequest = ccav.encrypt(JSON.stringify(request.body), workingKey)
            merchantId = request.body.merchantId;
            formbody = '<html><head><title>Sub-merchant checkout page</title><script src="http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js"></script></head><body><center><!-- width required mininmum 482px --><iframe  width="482" height="500" scrolling="No" frameborder="0"  id="paymentFrame" src="https://secure.ccavenue.com/transaction/transaction.do?command=initiateTransaction&merchant_id=' + merchantId + '&encRequest=' + encRequest + '&access_code=' + accessCode + '"></iframe></center><script type="text/javascript">$(document).ready(function(){$("iframe#paymentFrame").load(function() {window.addEventListener("message", function(e) {$("#paymentFrame").css("height",e.data["newHeight"]+"px"); }, false);}); });</script></body></html>';

            if (formbody) {
                response.writeHeader(200, {
                    "Content-Type": "text/html"
                });
                response.write(formbody);
                response.end();
            }
            return;
        }
    }

    responseHandler(request, response) {
        if (request) {
            var ccavResponse = '',
                workingKey = process.env.CCAV_WORKING_KEY, //Put in the 32-Bit key provided by CCAvenues.
                ccavPOST = '';

            ccavPOST = JSON.stringify(request.body);
            var encryption = ccavPOST.encResp;
            ccavResponse = ccav.decrypt(encryption, workingKey);

            if (ccavResponse) {
                var pData = '';
                pData = '<table border=1 cellspacing=2 cellpadding=2><tr><td>'
                pData = pData + ccavResponse.replace(/=/gi, '</td><td>')
                pData = pData.replace(/&/gi, '</td></tr><tr><td>')
                pData = pData + '</td></tr></table>'
                htmlcode = '<html><head><meta http-equiv="Content-Type" content="text/html; charset=UTF-8"><title>Response Handler</title></head><body><center><font size="4" color="blue"><b>Response Page</b></font><br>' + pData + '</center><br></body></html>';
                response.writeHeader(200, {
                    "Content-Type": "text/html"
                });
                response.write(htmlcode);
                response.end();
            }
        }
    }
}

export default PaymentService;