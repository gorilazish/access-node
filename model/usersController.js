var User = require('./usersModel');

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
    console.log(req.body);
    //res.json('success');

    newUser.save(function (err, user) {
        if (err) {
            return console.error(err);
        }
        res.json(user);
    })
};

exports.verify = function (req, res, next) {
    const cardId = req.params.id;

    User.find({ cards: { card_id: cardId, company: "Gym" }})
        .then(function (user) {
            if(user.length <= 0) {
                res.json('no users found');
            }
            res.json('verified ' + user[0].name + ' with card id ' + cardId)
        });
};

exports.addCard = function (req, res, next) {

};

// res.json(users.map(function (user) {
//     const userCards = user.cards;
//     return userCards.map(function (card) {
//         return card;
//     })
// }))
