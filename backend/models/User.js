const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true }, // Changed from username to email
    password: { type: String, required: true },
    tokens: {
        instagram: { type: String },
        youtube: { type: String },
        snapchat: { type: String }
    }
});

module.exports = mongoose.model('User', userSchema);
