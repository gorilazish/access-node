var app = require('express')();
var jwt = require('jsonwebtoken');
var User = require('./userModel');
var config = require('./../config');
var signToken = require('../../auth/auth').signToken;

exports.get = function (req, res, next) {
    User.find({})
        .exec()
        .then(function (users) {
            res.json(users.map(function (user) {
                return user;
            }));
        }, function (err) {
            next(err);
        });
};

exports.post = function (req, res, next) {
    var newUser = new User(req.body);

    newUser.save(function (err, user) {
        if (err) {
            return res.json(err);
        }
        var token = signToken(user._id);
        res.json({ token: token, user_id: user.user_id });
    })
};

exports.auth = function (req, res, next) {
    User.findOne({
        name: req.body.name
    }, function (err, user) {

        if(err) {
            console.error(err);
        }

        if(!user) {
            res.json({ success: false, message: 'Authentication failed. No user found.'})
        } else if (user) {

            if(user.password !== req.body.password) {
                res.json({ success: false, message: 'Authentication failed. Wrong password.'})
            } else {
                var token = signToken(user._id);

                res.json({
                    success: true,
                    message: 'Token provided',
                    token: token
                })
            }
        }

    })
};

exports.verify = function (req, res, next) {
    var name = req.params.id;
    console.log(name);

    User.find({ name: name})
        .then(function (user) {
            if(user.length <= 0) {
                res.json('no users found');
            }
            res.json('verified ' + user[0].name + ' with card id ' + cardId)
        });
};

exports.addCard = function (req, res, next) {

};
