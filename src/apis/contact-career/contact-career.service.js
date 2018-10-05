import emailConfig from '../../config/email.config';
import log from '../../config/log4js.config';
import fs from 'fs';
var nodemailer = require('nodemailer');
var Readable = require('stream').Readable;
var transporter = nodemailer.createTransport({
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

class ContactCareerService {
    /**
     * send the mail for contact query
     */
    contactEmail(contactDetail, callback) {
        //const template = "contact-us-admin-email";
        const title = "contact us query";
        //contact us query info mail send to admin
        emailConfig
            .send({
                template: "contact-us-admin",
                message: {
                    to: "test.arung@gmail.com" //admin email
                },
                locals: {
                    subject: "Contact us query",
                    userName: contactDetail.name,
                    userEmail: contactDetail.email,
                    phoneNumber: contactDetail.phoneNumber,
                    message: contactDetail.message //query message by the user
                }
            })
            .then(res => {
                log.info('Email sent to admin by ' + contactDetail.name + ' for ' + title);
            })
            .catch(error => {
                log.error('Error while sending contact us mail to admin: ' + error);
            });
        //contact us query info mail send to visitor
        emailConfig
            .send({
                template: "contact-us-user",
                message: {
                    to: contactDetail.email
                },
                locals: {
                    subject: "Contact us query",
                    userName: contactDetail.name,
                    userEmail: contactDetail.email,
                    message: contactDetail.message //query message by the user
                }
            })
            .then(res => {
                log.info("Confirmation email sent to visitor for " + title);
            })
            .catch(error => {
                log.error("Error while sending contact us mail on " + contactDetail.email + " " + error);
            });
    }

    /**
     * send mail for job posting
     */
    careerEmail(career, callback) {
        //const template = "contact-us-admin-email";
        const title = "Resume for software developer";
        //job application confirmation to user
        emailConfig
            .send({
                template: "contact-career-user",
                message: {
                    to: career.email
                },
                locals: {
                    subject: "Resume for software developer",
                    userName: career.name,
                    userEmail: career.email,
                    phoneNumber: career.phoneNumber,
                    message: career.message //query message by the user
                }
            })
            .then(res => {
                log.info('Email sent to user ' + career.name + ' for ' + title);
            })
            .catch(error => {
                log.error('Error while sending confirmation mail to ' + career.email + ' ' + error);
            });
        //job application send to admin
        emailConfig.config.message['attachments'] = [{ filename: 'resume.pdf', path: career.resume }]; //set the attachment for admin
        emailConfig
            .send({
                template: "contact-career-admin",
                message: {
                    to: "test.arung@gmail.com"
                },
                locals: {
                    subject: "Resume for software developer",
                    userName: career.name,
                    userEmail: career.email,
                    phoneNumber: career.phoneNumber,
                    message: career.message //query message by the user
                }
            })
            .then(res => {
                log.info('Email sent to admin by ' + career.name + ' for ' + title);
            })
            .catch(error => {
                log.error('Error while sending confirmation mail to ' + career.email + ' ' + error);
            });
    }
}

export default ContactCareerService;