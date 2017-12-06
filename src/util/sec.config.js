/**
 * Security and authenticate middleware
 */
/*var User = require('../apis/loginUser/user.model');
var jwt = require('jsonwebtoken');

exports.auth = (req, res) => {

    // find the user
    User.findOne({
        name: req.body.name
    }, (err, user) => {

        if (err) throw err;

        if (!user) {
            res.json({ success: false, message: 'Authentication failed. User not found.' });
        } else if (user) {

            //to do: hash the password before saving it in the db 

            // check if password matches
            if (user.password != req.body.password) {
                res.json({ success: false, message: 'Authentication failed. Wrong password.' });
            } else {

                // if user is found and password is right
                // create a token with only our given payload
                // we don't want to pass in the entire user since that has the password
                const payload = {
                    admin: user.admin
                };
                var token = jwt.sign(payload, 'superSecret', {
                    expiresIn: 60 * 60 * 24 // expires in 24 hours
                });

                // return the information including token as JSON
                res.json({
                    success: true,
                    message: 'Enjoy your token!',
                    token: token
                });
            }

        }

    });
}

exports.middleWare = (req, res, next) => {
    var token = req.body.token || req.query.token || req.headers['x-access-token'];

    // decode token
    if (token) {

        // verifies secret and checks exp
        jwt.verify(token, 'superSecret', (err, decoded) => {
            if (err) {
                return res.json({ success: false, message: 'Failed to authenticate token.' });
            } else {
                // if everything is good, save to request for use in other routes
                req.decoded = decoded;
                next();
            }
        });

    } else {
        // if there is no token
        // return an error
        return res.status(403).send({
            success: false,
            message: 'No token provided.'
        });
    }
}*/