const Purchase = require('../models/purchase.model.js');

// Create and Save a new purchase
exports.create = (req, res) => {
    // Validate request
    if (!req.body.username) {
        return res.status(400).send({
            message: "purchase content can not be empty"
        });
    }

    // Create a purchase
    const purchase = new Purchase({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        image: req.body.image
    });

    // Save purchase in the database
    purchase.save()
        .then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the purchase."
            });
        });
};

// Retrieve and return all purchase from the database.
exports.findAll = (req, res) => {
    Purchase.find()
        .then(purchases => {
            res.send(purchases);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving purchases."
            });
        });
};

// Find a single purchase with a purchaseId
exports.findOne = (req, res) => {
    Purchase.findById(req.params.purchaseId)
        .then(purchase => {
            if (!purchase) {
                return res.status(404).send({
                    message: "purchase not found with id " + req.params.purchaseId
                });
            }
            res.send(purchase);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "purchase not found with id " + req.params.purchaseId
                });
            }
            return res.status(500).send({
                message: "Error retrieving purchase with id " + req.params.purchaseId
            });
        });
};

// Update a purchase identified by the purchaseId in the request
exports.update = (req, res) => {
    // Validate Request
    if (!req.body.username) {
        return res.status(400).send({
            message: "purchase content can not be empty"
        });
    }

    // Find purchase and update it with the request body
    Purchase.findByIdAndUpdate(req.params.purchaseId, {
        username: req.body.username || "Untitled purchase",
        email: req.body.email,
        password: req.body.password,
        image: req.body.image
    }, { new: true })
        .then(purchase => {
            if (!purchase) {
                return res.status(404).send({
                    message: "purchase not found with id " + req.params.purchaseId
                });
            }
            res.send(purchase);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "purchase not found with id " + req.params.purchaseId
                });
            }
            return res.status(500).send({
                message: "Error updating purchase with id " + req.params.purchaseId
            });
        });
};

// Delete a purchase with the specified purchaseId in the request
exports.delete = (req, res) => {
    Purchase.findByIdAndRemove(req.params.purchaseId)
        .then(purchase => {
            if (!purchase) {
                return res.status(404).send({
                    message: "purchase not found with id " + req.params.purchaseId
                });
            }
            res.send({ message: "purchase deleted successfully!" });
        }).catch(err => {
            if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                return res.status(404).send({
                    message: "purchase not found with id " + req.params.purchaseId
                });
            }
            return res.status(500).send({
                message: "Could not delete purchase with id " + req.params.purchaseId
            });
        });
};
