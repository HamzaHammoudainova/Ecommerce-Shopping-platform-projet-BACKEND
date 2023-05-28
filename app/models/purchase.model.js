const mongoose = require('mongoose');

const purchaseSchema = mongoose.Schema({
    img: String,
    name: String,
    numb: String,
    totalprix: String,
    prix: String,
}, {
    timestamps: true
});

module.exports = mongoose.model('purchase', purchaseSchema);