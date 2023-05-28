const mongoose = require('mongoose');

const SouscatSchema = mongoose.Schema({
    nom: String,
    idcategory: String,
    nomsouscat: {
        type: String,
        unique: [true, 'The name is unique']

    },
    image: String
}, {
    timestamps: true
});

module.exports = mongoose.model('Souscat', SouscatSchema);