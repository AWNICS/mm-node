import bcrypt from 'bcrypt';
import Dotenv from 'dotenv';
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const passportJWT = require("passport-jwt");

import UserService from '../apis/user/user.service';
import DoctorService from '../apis/doctor/doctor.service';
import log from '../config/log4js.config';

const dotenv = Dotenv.config({ path: '.env.dev' });
const userService = new UserService();
const doctorService = new DoctorService();
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

passport.use(new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password'
    },
    function(email, password, done) {
        // call db to check if the user exists with tht correct password.
        return userService.findUserByEmail(email, (user, err) => {
            if (err) { return done(err); }
            if (!user) {
                return done(null, false, { message: 'Incorrect email' });
            } else if (user.activate != 1) {
                // if the user is not activated
                return done(null, false, {message: 'Please activate your account and try again' });
            } else {
                // comparing the password that is stored in database with the given password using bcrypt
                bcrypt.compare(password, user.password, function(err, res) {
                    if (err) {
                        // Error during passwords match
                        log.error('There is an error during login');
                        return done(null, false, { message: 'There is an error during login' });
                    } else if (res === false) {
                        // Passwords don't match
                        log.error('Incorrect password');
                        return done(null, false, { message: 'Incorrect password. Try again.' });
                    } else {
                        delete user.dataValues.password;
                        console.log(user);
                        // Passwords match
                        if(!user.firstLogin && user.role==="doctor"){
                            let userupdate={
                                id: user.id,
                                firstLogin: true,
                                socketId:[]
                            };
                            userService.updateRegisteredUser(userupdate,(result)=>{
                                console.log(result);
                                console.log('User update to first login');
                            });
                            doctorService.updateDoctorSchedule({status:'online'}, user.id, (doctorUpdated)=>{
                                console.log('Doctor status updated as first login');
                                log.info('Logged In Successfully');
                                return done(null, user, { message: 'Logged In Successfully' });
                            })
                        } else {
                             log.info('Logged In Successfully');
                             return done(null, user, { message: 'Logged In Successfully' });
                        }
                    }
                });
            }
        });
    }
));

passport.use(new JWTStrategy({
        jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
        secretOrKey: process.env.JWT_SECRET
    },
    (jwtPayload, next) => {
        //1. check the token
        //    - if(true) call authorization
        //    - else throw 401 error
        if (!jwtPayload.data || !jwtPayload.data.role) {
            next(new Error("Permission denied."));
            return;
        }
        next(null, jwtPayload.data);
    }
));

module.exports = passport;