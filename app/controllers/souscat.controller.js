const Souscat = require('../models/souscat.model.js');

// Create and Save a new souscat
exports.create = (req, res) => {
    // Validate request
    if(!req.body.nom) {
        return res.status(400).send({
            message: "souscat content can not be empty"
        });
    }

    // Create a souscat
    const souscat = new Souscat({
        nom: req.body.nom || "Untitled souscat",
        idcategory: req.body.idcategory,
        nomsouscat: req.body.nomsouscat,
        image: req.body.image
        
    });

    // Save souscat in the database
    souscat.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the souscat."
        });
    });
};

// Retrieve and return all souscat from the database.
exports.findAll = (req, res) => {
    Souscat.find()
    .then(souscats => {
        res.send(souscats);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving souscats."
        });
    });
};

// Find a single souscat with a souscatId
exports.findOne = (req, res) => {
    Souscat.findById(req.params.souscatId)
    .then(souscat => {
        if(!souscat) {
            return res.status(404).send({
                message: "souscat not found with id " + req.params.souscatId
            });            
        }
        res.send(souscat);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "souscat not found with id " + req.params.souscatId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving souscat with id " + req.params.souscatId
        });
    });
};

// Update a souscat identified by the souscatId in the request
exports.update = (req, res) => {
    // Validate Request
    if(!req.body.nom) {
        return res.status(400).send({
            message: "souscat content can not be empty"
        });
    }

    // Find souscat and update it with the request body
    Souscat.findByIdAndUpdate(req.params.souscatId, {
        nom: req.body.nom || "Untitled souscat",
        idcategory: req.body.idcategory,
        nomsouscat: req.body.nomsouscat,
        image: req.body.image
    }, {new: true})
    .then(souscat => {
        if(!souscat) {
            return res.status(404).send({
                message: "souscat not found with id " + req.params.souscatId
            });
        }
        res.send(souscat);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "souscat not found with id " + req.params.souscatId
            });                
        }
        return res.status(500).send({
            message: "Error updating souscat with id " + req.params.souscatId
        });
    });
};

// Delete a souscat with the specified souscatId in the request
exports.delete = (req, res) => {
    Souscat.findByIdAndRemove(req.params.souscatId)
    .then(souscat => {
        if(!souscat) {
            return res.status(404).send({
                message: "souscat not found with id " + req.params.souscatId
            });
        }
        res.send({message: "souscat deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "souscat not found with id " + req.params.souscatId
            });                
        }
        return res.status(500).send({
            message: "Could not delete souscat with id " + req.params.souscatId
        });
    });
};
