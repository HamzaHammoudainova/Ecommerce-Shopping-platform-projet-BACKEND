const mongoose = require('mongoose');

const ProduitSchema = mongoose.Schema({
    categorie: String,
    nom: {
        type: String,
        unique: [true, 'The login is unique']

    },
    model: String,
    description: String,
    nbr: String,
    qualite: String,
    marque: String,
    prix: String,
    pic: String,
    souscat: String,
}, {
    timestamps: true
});

module.exports = mongoose.model('Produit', ProduitSchema);