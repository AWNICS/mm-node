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
                pass: 'alphabet0711'
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
                log.error('Error occured in email service: ' + error);
            }
            log.info('Email sent to admin');
        });

        // send mail to user
        transporter.sendMail(userMailOptions, function(error, info) {
            if (error) {
                log.error('Error occured in email service: ' + error);
                callback({ message: 'There was error. Please try again after sometime' });
            }
            log.info('Email sent to user');
            callback({ message: 'An email has been sent. Please check your inbox.' });
        });
    }
}

export default EmailService;