var User = require('./../user/userModel');
var Card = require('./../card/cardModel');

exports.post = function (req, res, next) {
    var institution = req.params.institution;
    var lock_access_lvl = parseInt(req.body.access_lvl);

    /** If card_id is sent in the body it means user is using physical card */
    if (req.body.card_id !== undefined) {
        var card_id = req.body.card_id;

        Card.findOne({card_id: card_id, access_lvl: lock_access_lvl})
            .then(function (card) {
                if (!card) {
                    res.json({
                        success: false,
                        message: 'No card found.'
                    })
                } else if (card) {
                    res.json({
                        success: true,
                        message: 'Access granted for the card.'
                    })
                }
            }, function (err) {
                next(err)
            });
    }

    /** If we get here, user is using his phone to get access */
    var UID = req.body.user_id;

    // Checking in OUR DB if there is a user with this UID, and has a relevant card with access_lvl
    User.findOne({user_id: UID, 'cards.institution': institution})
        .then(function (user) {
            if(!user) {
                res.json({
                    success: false,
                    message: 'No card found.'
                })
            }
            return user.cards.map(function (card) {
                    if (card.access_lvl !== lock_access_lvl) {
                        return res.json({
                            success: false,
                            message: 'Invalid access level.'
                        })
                    } else if (card.access_lvl == lock_access_lvl) {
                        return res.json({
                            success: true,
                            message: 'Access granted for the phone.'
                        })
                    }
                })
        }, function (err) {
            next(err)
        })
};

