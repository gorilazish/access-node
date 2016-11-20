var User = require('./usersModel');

exports.get = function (req, res, next) {
    User.find({}, function (err, users) {
        if (err) {
            return console.error(err);
        }
        res.json(users);
    })
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
