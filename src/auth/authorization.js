import UserService from '../apis/user/user.service';
import Dotenv from 'dotenv';

const dotenv = Dotenv.config({ path: '.env.dev' });
const userService = new UserService();
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const passportJWT = require("passport-jwt");
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
            }
            if (user.password !== password) {
                return done(null, false, { message: 'Incorrect password.' });
            }
            return done(null, user, { message: 'Logged In Successfully' });
        });
    }
));

passport.use(new JWTStrategy({
        jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
        secretOrKey: process.env.JWT_SECRET
    },
    (jwtPayload, next) => {
        // console.log('jwtPayload: ', jwtPayload);
        //1. check the token
        //    - if(true) call authorization
        //    - else throw 401 error
        if (!jwtPayload.data || !jwtPayload.data.role) {
            next(new Error("Permission denied."));
            return;
        }
        next(null, jwtPayload.data);
        //});
    }
));

module.exports = passport;