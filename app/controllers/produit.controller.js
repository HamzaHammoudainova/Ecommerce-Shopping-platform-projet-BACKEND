const Produit = require('../models/produit.model.js');

// Create and Save a new produit
exports.create = (req, res) => {
    // Validate request
    if (!req.body.nom) {
        return res.status(400).send({
            message: "produit content can not be empty"
        });
    }
    if (!req.body.souscat) {
        return res.status(400).send({
            message: "Sous Categorie content can not be empty"
        });
    }
    if (!req.body.categorie) {
        return res.status(400).send({
            message: "Categorie content can not be empty"
        });
    }

    // Create a produit
    const produit = new Produit({
        categorie: req.body.categorie || "Untitled Fournisseur",
        nom: req.body.nom,
        model: req.body.model,
        description: req.body.description,
        nbr: req.body.nbr,
        qualite: req.body.qualite,
        marque: req.body.marque,
        prix: req.body.prix,
        pic: req.body.pic,
        souscat: req.body.souscat
    });

    // Save produit in the database
    produit.save()
        .then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the produit."
            });
        });
};

// Retrieve and return all produit from the database.
exports.findAll = (req, res) => {
    Produit.find()
        .then(produits => {
            res.send(produits);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving produits."
            });
        });
};

// Find a single produit with a produitId
exports.findOne = (req, res) => {
    Produit.findById(req.params.produitId)
        .then(produit => {
            if (!produit) {
                return res.status(404).send({
                    message: "produit not found with id " + req.params.produitId
                });
            }
            res.send(produit);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "produit not found with id " + req.params.produitId
                });
            }
            return res.status(500).send({
                message: "Error retrieving produit with id " + req.params.produitId
            });
        });
};

// Update a produit identified by the produitId in the request
exports.update = (req, res) => {
    // Validate Request
    if (!req.body.nom) {
        return res.status(400).send({
            message: "produit content can not be empty"
        });
    }

    // Find produit and update it with the request body
    Produit.findByIdAndUpdate(req.params.produitId, {
        categorie: req.body.categorie || "Untitled Fournisseur",
        nom: req.body.nom,
        model: req.body.model,
        description: req.body.description,
        nbr: req.body.nbr,
        qualite: req.body.qualite,
        marque: req.body.marque,
        prix: req.body.prix,
        pic: req.body.pic,
        souscat: req.body.souscat
    }, { new: true })
        .then(produit => {
            if (!produit) {
                return res.status(404).send({
                    message: "produit not found with id " + req.params.produitId
                });
            }
            res.send(produit);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "produit not found with id " + req.params.produitId
                });
            }
            return res.status(500).send({
                message: "Error updating produit with id " + req.params.produitId
            });
        });
};

// Delete a produit with the specified produitId in the request
exports.delete = (req, res) => {
    Produit.findByIdAndRemove(req.params.produitId)
        .then(produit => {
            if (!produit) {
                return res.status(404).send({
                    message: "produit not found with id " + req.params.produitId
                });
            }
            res.send({ message: "produit deleted successfully!" });
        }).catch(err => {
            if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                return res.status(404).send({
                    message: "produit not found with id " + req.params.produitId
                });
            }
            return res.status(500).send({
                message: "Could not delete produit with id " + req.params.produitId
            });
        });
};
