const Categorie = require('../models/categorie.model.js');

// Create and Save a new categorie
exports.create = (req, res) => {
    // Validate request
    if (!req.body.name) {
        return res.status(400).send({
            message: "categorie content can not be empty"
        });
    }

    // Create a categorie
    const categorie = new Categorie({
        name: req.body.name || "Untitled Categorie",
        description: req.body.description,
        pic: req.body.pic
    });

    // Save categorie in the database
    categorie.save()
        .then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the categorie."
            });
        });
};

// Retrieve and return all admin from the database.
exports.findAll = (req, res) => {
    Categorie.find()
        .then(categories => {
            res.send(categories);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving categories."
            });
        });
};

// Find a single categorie with a categorieId
exports.findOne = (req, res) => {
    Categorie.findById(req.params.categorieId)
        .then(categorie => {
            if (!categorie) {
                return res.status(404).send({
                    message: "categorie not found with id " + req.params.categorieId
                });
            }
            res.send(categorie);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "categorie not found with id " + req.params.categorieId
                });
            }
            return res.status(500).send({
                message: "Error retrieving categorie with id " + req.params.categorieId
            });
        });
};

// Update a categorie identified by the categorieId in the request
exports.update = (req, res) => {
    // Validate Request
    if (!req.body.name) {
        return res.status(400).send({
            message: "categorie content can not be empty"
        });
    }

    // Find categorie and update it with the request body
    Categorie.findByIdAndUpdate(req.params.categorieId, {
        name: req.body.name || "Untitled Categorie",
        description: req.body.description,
        pic: req.body.pic
    }, { new: true })
        .then(categorie => {
            if (!categorie) {
                return res.status(404).send({
                    message: "categorie not found with id " + req.params.adcategorieIdminId
                });
            }
            res.send(categorie);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "categorie not found with id " + req.params.categorieId
                });
            }
            return res.status(500).send({
                message: "Error updating categorie with id " + req.params.categorieId
            });
        });
};

// Delete a categorie with the specified categorieId in the request
exports.delete = (req, res) => {
    Categorie.findByIdAndRemove(req.params.categorieId)
        .then(categorie => {
            if (!categorie) {
                return res.status(404).send({
                    message: "categorie not found with id " + req.params.categorieId
                });
            }
            res.send({ message: "categorie deleted successfully!" });
        }).catch(err => {
            if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                return res.status(404).send({
                    message: "categorie not found with id " + req.params.categorieId
                });
            }
            return res.status(500).send({
                message: "Could not delete categorie with id " + req.params.categorieId
            });
        });
};
