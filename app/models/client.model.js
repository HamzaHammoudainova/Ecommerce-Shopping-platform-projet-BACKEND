const mongoose = require('mongoose');

const ClientSchema = mongoose.Schema({
    firstname: {
        type: String,
        unique: [true, 'The login is unique']

    },
    lastname: String,
    address: String,
    tel: String,
    email: {
        type: String,
        unique: [true, 'The email is unique']

    },
    password: String,
    pic: String,
}, {
    timestamps: true
});

module.exports = mongoose.model('Client', ClientSchema);