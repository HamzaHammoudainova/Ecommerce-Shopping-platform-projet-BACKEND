const mongoose = require('mongoose');

const FournisseurSchema = mongoose.Schema({
    categorie: String,
    nom: {
        type: String,
        unique: [true, 'The login is unique']

    },
    address: String,
    ste: String,
    email: {
        type: String,
        unique: [true, 'The email is unique']

    },
    tel: String,
    payment: String
}, {
    timestamps: true
});

module.exports = mongoose.model('Fournisseur', FournisseurSchema);