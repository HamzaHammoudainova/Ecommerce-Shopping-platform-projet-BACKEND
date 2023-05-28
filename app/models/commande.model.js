const mongoose = require('mongoose');

const CommandeSchema = mongoose.Schema({
    nom: String,
    model: String,
    qnt: String,
    tel: String,
    address: String,
    categorie: String,
}, {
    timestamps: true
});

module.exports = mongoose.model('Commande', CommandeSchema);