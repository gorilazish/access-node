var mongoose = require('mongoose');

var cardSchema = new mongoose.Schema({
    card_id: { type: String, unique: true },
    email: { type: String, required: true },
    access_lvl: { type: Number, required: true }
});

