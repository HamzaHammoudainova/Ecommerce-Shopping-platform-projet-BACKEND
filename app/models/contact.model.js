const mongoose = require('mongoose');

const ContactSchema = mongoose.Schema({
    name: {
        type: String,
        unique: [true, 'The name is unique']

    },
    email: String,
    tel: String,
    subject: String,
    description: String
}, {
    timestamps: true
});

module.exports = mongoose.model('Contact', ContactSchema);