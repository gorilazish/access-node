var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
    user_id: {type: String, unique: true},
    email: {type: String, unique: true},
    password: {type: String, required: true},
    cards: [{
        company: String,
        card_id: String
    }]
});

userSchema.pre('save', function(next) {
    this.user_id = "U" + Date.now();

    next();
});

userSchema.static('addCard', function (_id, company, card_id, err) {
    console.log('addCard ', _id, 'card_id ', card_id);
    return this.findByIdAndUpdate(
        { _id:_id} ,
        { $push: { cards: { company: company, card_id: card_id } }},
        function(err, model) {
            console.log(err);
        }
    );

});

module.exports = mongoose.model('User', userSchema);
