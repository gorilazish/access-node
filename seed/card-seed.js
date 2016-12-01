var Card = require('../api/card/cardModel');
var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://admin:Stayoncloud1@ds159387.mlab.com:59387/heroku_7sh61g3r');

var cards = [
    new Card({
        card_id: '324kde82i',
        email: 'user@aau.com',
        access_lvl: 3
    })
];

var done = 0;
for(var i = 0; i < cards.length; i++) {
    cards[i].save(function (err, res) {
        done++;
        if(done === cards.length) {
            exit();
        }
    });
}

function exit () {
    mongoose.disconnect();
}