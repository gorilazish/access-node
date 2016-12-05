var mongoose = require('mongoose');

var cardSchema = new mongoose.Schema({
    card_id: { type: String, unique: true },
    pin: { type: Number },
    email: { type: String, unique: true },
    access_lvl: { type: Number, required: true }
});

cardSchema.pre('save', function(next) {
    this.pin = Math.floor(Math.random() * 10000);
    next();
});

/** Remove pin after activation */
cardSchema.static('deactivatePin', function (_id, err) {
    return this.findByIdAndUpdate(
        {_id: _id},
        {$set: {pin: 1111}},
        function (err, model) {
            if (err) {
                console.error(err);
            }
            console.log('pin deactivated');
        }
    );
});

module.exports = mongoose.model('aau', cardSchema);
