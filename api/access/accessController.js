var router = require('express').Router();
var User = require('./../user/userModel');

exports.post = function (req, res, next) {
    var UID = req.body.user_id;
    var lock_access_lvl = parseInt(req.body.access_lvl);
    var institution = req.params.institution;
    console.log('user id is: ' + UID);
    console.log('lock access lvl: ' + lock_access_lvl);

    User.findOne({ user_id: UID }, function (err, user) {
        if(err) {
            console.error(err);
        }
        if(!user){
            return res.json({
                success: false,
                message: 'No user found.'
            })
        } else if(user) {
            user.cards.map(function (card) {
                if(card.institution == institution && card.access_lvl !== lock_access_lvl) {
                    res.json({
                        success: false,
                        message: 'Invalid access level.'
                    })
                } else if(card.institution == institution && card.access_lvl == lock_access_lvl){
                    res.json({
                        success: true,
                        message: 'Access granted.'
                    })
                }
            })
        }
    })
};
