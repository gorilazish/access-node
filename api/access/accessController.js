var User = require('./../user/userModel');
var Card = require('./../card/cardModel');

exports.post = function (req, res, next) {
    var institution = req.params.institution;
    var lock_access_lvl = parseInt(req.body.access_lvl);

    /** If card_id is sent in the body it means user is using physical card */
    if(req.body.card_id !== undefined) {
        var card_id = req.body.card_id;

        // Checking in institution DB if there exists card with this id and access_lvl
        return Card.findOne({ card_id: card_id, access_lvl: lock_access_lvl }, function (err, card) {
            if(err) {
                 console.error(err)
            } else if(!card) {
                 res.json({
                    success: false,
                    message: 'No card found.'
                })
            } else if(card) {
                 res.json({
                    success: true,
                    message: 'Access granted for the card.'
                })
            }
        })
    }

    /** If we get here, user is using his phone to get access */
    var UID = req.body.user_id;

    // Checking in OUR DB if there is a user with this UID, and has a relevant card with access_lvl
    return User.findOne({ user_id: UID }, function (err, user) {
        if(err) {
            console.error(err);
        }
        if(!user){
             res.json({
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
                        message: 'Access granted for the phone.'
                    })
                }
            })
        }
    })
};
