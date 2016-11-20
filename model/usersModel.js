var mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {type: String, required: false},
    email: {type: String, required: false},
    password: {type: String, required: false},
    cards: Object
});

userSchema.methods.createUser = function () {
    
};

module.exports = mongoose.model('User', userSchema);
