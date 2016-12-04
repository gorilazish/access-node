var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
    user_id: {type: String, unique: true},
    email: {type: String, unique: true},
    password: {type: String, required: true},
    cards: [{
        institution: String,
        card_id: String,
        access_lvl: Number
    }]
});

/** Create unique ID */
userSchema.pre('save', function (next) {
    this.user_id = "U" + Date.now();
    next();
});

/** Add card to the user */
userSchema.static('addCard', function (_id, institution, card_id, access_lvl, err) {
    console.log('addCard ', _id, 'card_id ', card_id);
    return this.findByIdAndUpdate(
        {_id: _id},
        {$push: {cards: {institution: 'aau', card_id: card_id, access_lvl: access_lvl}}},
        function (err, model) {
            if (err) {
                console.error(err);
            }
            console.log('card added to the user');
        }
    );

});

module.exports = mongoose.model('User', userSchema);
