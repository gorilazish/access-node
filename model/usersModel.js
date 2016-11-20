import mongoose, {Schema} from 'mongoose';

const userSchema = new Schema({
    name: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    cards: [{company: String, card_id: String}],
});

userSchema.methods.createUser = function () {
    
}

export default mongoose.model('User', userSchema);
