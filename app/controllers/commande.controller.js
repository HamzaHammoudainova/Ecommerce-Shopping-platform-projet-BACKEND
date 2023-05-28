const Commande = require('../models/commande.model.js');

// Create and Save a new commande
exports.create = (req, res) => {
    // Validate request
    if (!req.body.model) {
        return res.status(400).send({
            message: "commande content can not be empty"
        });
    }

    // Create a commande
    const commande = new Commande({
        nom: req.body.nom || "Untitled Commande",
        model: req.body.model,
        qnt: req.body.qnt,
        tel: req.body.tel,
        address: req.body.address,
        description: req.body.description,
        categorie: req.body.categorie,
    });

    // Save commande in the database
    commande.save()
        .then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the commande."
            });
        });
};

// Retrieve and return all commande from the database.
exports.findAll = (req, res) => {
    Commande.find()
        .then(commandes => {
            res.send(commandes);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving commandes."
            });
        });
};

// Find a single commande with a commandeId
exports.findOne = (req, res) => {
    Commande.findById(req.params.commandeId)
        .then(commande => {
            if (!commande) {
                return res.status(404).send({
                    message: "commande not found with id " + req.params.commandeId
                });
            }
            res.send(commande);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "commande not found with id " + req.params.commandeId
                });
            }
            return res.status(500).send({
                message: "Error retrieving commande with id " + req.params.commandeId
            });
        });
};

// Update a commande identified by the commandeId in the request
exports.update = (req, res) => {
    // Validate Request
    if (!req.body.model) {
        return res.status(400).send({
            message: "commande content can not be empty"
        });
    }

    // Find commande and update it with the request body
    Commande.findByIdAndUpdate(req.params.commandeId, {
        nom: req.body.nom || "Untitled Commande",
        model: req.body.model,
        qnt: req.body.qnt,
        tel: req.body.tel,
        address: req.body.address,
        description: req.body.description,
        categorie: req.body.categorie,
    }, { new: true })
        .then(commande => {
            if (!commande) {
                return res.status(404).send({
                    message: "commande not found with id " + req.params.commandeId
                });
            }
            res.send(commande);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "commande not found with id " + req.params.commandeId
                });
            }
            return res.status(500).send({
                message: "Error updating commande with id " + req.params.commandeId
            });
        });
};

// Delete a commande with the specified commandeId in the request
exports.delete = (req, res) => {
    Commande.findByIdAndRemove(req.params.commandeId)
        .then(commande => {
            if (!commande) {
                return res.status(404).send({
                    message: "commande not found with id " + req.params.commandeId
                });
            }
            res.send({ message: "commande deleted successfully!" });
        }).catch(err => {
            if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                return res.status(404).send({
                    message: "commande not found with id " + req.params.commandeId
                });
            }
            return res.status(500).send({
                message: "Could not delete commande with id " + req.params.commandeId
            });
        });
};
