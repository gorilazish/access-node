var app = require('express')();
var jwt = require('jsonwebtoken');
var Card = require('./cardModel');
var config = require('./../config');
var signToken = require('../../auth/auth').signToken;


/** Verify that user is in the company and send out card_id */
exports.verify = function (req, res, next) {
    var institution = req.body.institution;
    var email = req.body.email;
    var pin = req.body.pin;

    res.json(institution + ' ' + email + ' ' + pin)
};


/** Create new card */
exports.post = function (req, res, next) {
    var newCard = new Card(req.body);

    newCard.save(function (err, card) {
        if (err) {
            return res.json(err);
        }
        res.json({card});
    })
};

