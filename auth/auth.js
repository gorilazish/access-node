var jwt = require('jsonwebtoken');
var config = require('../api/config');
var expressJwt = require('express-jwt');
var checkToken = expressJwt({secret: config.secret});

/** Validate token before executing requests */
exports.validateToken = function () {
    return function(req, res, next) {
        console.log(req.query);
        if (req.query && req.query.hasOwnProperty('x_access_token')) {
            req.headers.authorization = 'Bearer ' + req.query.x_access_token;
        }
        checkToken(req, res, next);
    }
};

exports.signToken = function (user_id) {
    return jwt.sign(
        {user_id: user_id},
        config.secret,
        {expiresIn: 86400} // Expires in 24h
    )
};