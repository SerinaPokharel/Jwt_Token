const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({ // userSchema is a new instance of mongoose.Schema
    name: { type: String, default: ''},
    email: { type: String, unique: true },
    password: String,
    token: String,
});

module.exports = mongoose.model('User', userSchema);