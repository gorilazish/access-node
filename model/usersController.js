var User = require('./usersModel');

exports.get = function (req, res, next) {
    User.find({}, function (err, users) {
        if (err) {
            return console.error(err);
        } else {
            res.format({
                //HTML response will render the index.jade file in the views/blobs folder. We are also setting "blobs" to be an accessible variable in our jade view
                html: function () {
                    res.render('users/index', {
                        title: 'All access users',
                        "users": users
                    });
                },
                //JSON response will show all blobs in JSON format
                json: function () {
                    res.json(infophotos);
                }
            });
        }
    })
};

exports.post = function (req, res, next) {
    var newUser = req.body;
    User.create(newUser)
        .then
};