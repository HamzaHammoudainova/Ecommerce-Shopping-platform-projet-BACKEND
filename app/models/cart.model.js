const mongoose = require('mongoose');

const CartSchema = mongoose.Schema({
    img: String,
    name: String,
    qnt: String,
    iduser: String,
    prix: String,
    idp: String,
}, {
    timestamps: true
});

module.exports = mongoose.model('Cart', CartSchema);



