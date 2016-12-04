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
userSchema.static('addCard', function (user_id, institution, card_id, access_lvl, err) {
    console.log('addCard ', user_id, 'card_id ', card_id);
    return this.findByIdAndUpdate(
        {user_id: user_id},
        // {$push: {cards: {institution: institution, card_id: card_id, access_lvl: access_lvl}}},
        {$push: {stuff: 'new'}},
        function (err, model) {
            console.log(err);
        }
    );

});

module.exports = mongoose.model('User', userSchema);
