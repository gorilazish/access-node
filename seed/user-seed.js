var User = require('./usersModel');
var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('localhost:27017/access');

var users = [
    new User({
        name: 'John Wick',
        email: 'john@wick.com',
        password: '1234',
        cards: [{company: 'Gym', card_id: '5678'}],
    })
];

var done = 0;
for(var i = 0; i < users.length; i++) {
    users[i].save(function (err, res) {
        done++;
        if(done === users.length) {
            exit();
        }
    });
}

function exit () {
    mongoose.disconnect();
}