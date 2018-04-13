import nodemailer from 'nodemailer';
import log from '../config/log4js.config';

class EmailService {
    constructor() {}
    sendEmail(userOutput, adminOutput, email, subject, callback) {
        //create reusable transporter object using the default SMTP transport
        let transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            secure: false,
            auth: {
                user: 'test.arung@gmail.com',
                pass: 'changedPassword'
            },
            tls: {
                rejectUnauthorized: false
            }
        });

        // setup email data for admin
        let adminMailOptions = {
            from: 'test.arung@gmail.com',
            to: 'test.arung@gmail.com',
            subject: subject,
            html: adminOutput
        };

        // setup email data for user
        let userMailOptions = {
            from: 'test.arung@gmail.com',
            to: email,
            subject: subject,
            html: userOutput
        };

        // send mail to admin
        transporter.sendMail(adminMailOptions, function(error, info) {
            if (error) {
                log.error('Error occured: ' + error);
            }
            log.info('Message sent admin');
        });

        // send mail to user
        transporter.sendMail(userMailOptions, function(error, info) {
            if (error) {
                log.error('Error occured: ' + error);
                callback({ message: 'There was error. Please try again after sometime' });
            }
            log.info('Message sent user');
            callback({ message: 'An email has been sent. Please check your inbox.' });
        });
    }
}

export default EmailService;