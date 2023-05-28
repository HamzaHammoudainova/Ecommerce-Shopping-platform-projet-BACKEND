const Cart = require('../models/cart.model.js');

// Create and Save a new cart
exports.create = (req, res) => {
    // Validate request
    if (!req.body.iduser) {
        return res.status(400).send({
            message: "cart content can not be empty"
        });
    }

    // Create a cart
    const cart = new Cart({
        img: req.body.img,
        name: req.body.name,
        qnt: req.body.qnt,
        iduser: req.body.iduser,
        prix: req.body.prix,
        idp: req.body.idp,
    });

    // Save cart in the database
    cart.save()
        .then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the cart."
            });
        });
};

// Retrieve and return all cart from the database.
exports.findAll = (req, res) => {
    Cart.find()
        .then(carts => {
            res.send(carts);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving carts."
            });
        });
};

// Find a single cart with a cartId
exports.findOne = (req, res) => {
    Cart.findById(req.params.cartId)
        .then(cart => {
            if (!cart) {
                return res.status(404).send({
                    message: "cart not found with id " + req.params.cartId
                });
            }
            res.send(cart);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "cart not found with id " + req.params.cartId
                });
            }
            return res.status(500).send({
                message: "Error retrieving cart with id " + req.params.cartId
            });
        });
};

// Update a cart identified by the cartId in the request
exports.update = (req, res) => {
    // Validate Request
    if (!req.body.qnt) {
        return res.status(400).send({
            message: "cart content can not be empty"
        });
    }

    // Find cart and update it with the request body
    Cart.findByIdAndUpdate(req.params.cartId, {
        img: req.body.img,
        name: req.body.name,
        qnt: req.body.qnt,
        iduser: req.body.iduser,
        prix: req.body.prix,
        idp: req.body.idp,
    }, { new: true })
        .then(cart => {
            if (!cart) {
                return res.status(404).send({
                    message: "cart not found with id " + req.params.cartId
                });
            }
            res.send(cart);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "cart not found with id " + req.params.cartId
                });
            }
            return res.status(500).send({
                message: "Error updating cart with id " + req.params.cartId
            });
        });
};

// Delete a cart with the specified cartId in the request
exports.delete = (req, res) => {
    Cart.findByIdAndRemove(req.params.cartId)
        .then(cart => {
            if (!cart) {
                return res.status(404).send({
                    message: "cart not found with id " + req.params.cartId
                });
            }
            res.send({ message: "cart deleted successfully!" });
        }).catch(err => {
            if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                return res.status(404).send({
                    message: "cart not found with id " + req.params.cartId
                });
            }
            return res.status(500).send({
                message: "Could not delete cart with id " + req.params.cartId
            });
        });
};
