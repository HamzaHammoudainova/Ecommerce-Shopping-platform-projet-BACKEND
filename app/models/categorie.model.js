const mongoose = require('mongoose');

const CategorieSchema = mongoose.Schema({
    name: {
        type: String,
        unique: [true, 'The login is unique']

    },
    description: String,
    pic: String
}, {
    timestamps: true
});

module.exports = mongoose.model('Categorie', CategorieSchema);