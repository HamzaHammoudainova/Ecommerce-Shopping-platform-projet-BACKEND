const Client = require('../models/client.model.js');

// Create and Save a new client
exports.create = (req, res) => {
    // Validate request
    if (!req.body.firstname) {
        return res.status(400).send({
            message: "client content can not be empty"
        });
    }

    // Create a client
    const client = new Client({
        firstname: req.body.firstname || "Untitled Client",
        lastname: req.body.lastname,
        address: req.body.address,
        tel: req.body.tel,
        email: req.body.email,
        password: req.body.password,
        pic: req.body.pic,
    });

    // Save client in the database
    client.save()
        .then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the client."
            });
        });
};

// Retrieve and return all client from the database.
exports.findAll = (req, res) => {
    Client.find()
        .then(clients => {
            res.send(clients);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving clients."
            });
        });
};

// Find a single client with a clientId
exports.findOne = (req, res) => {
    Client.findById(req.params.clientId)
        .then(client => {
            if (!client) {
                return res.status(404).send({
                    message: "client not found with id " + req.params.clientId
                });
            }
            res.send(client);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "client not found with id " + req.params.clientId
                });
            }
            return res.status(500).send({
                message: "Error retrieving client with id " + req.params.clientId
            });
        });
};

// Update a client identified by the clientId in the request
exports.update = (req, res) => {
    // Validate Request
    if (!req.body.firstname) {
        return res.status(400).send({
            message: "client content can not be empty"
        });
    }

    // Find client and update it with the request body
    Client.findByIdAndUpdate(req.params.clientId, {
        firstname: req.body.firstname || "Untitled Client",
        lastname: req.body.lastname,
        address: req.body.address,
        tel: req.body.tel,
        email: req.body.email,
        password: req.body.password,
        pic: req.body.pic,
    }, { new: true })
        .then(client => {
            if (!client) {
                return res.status(404).send({
                    message: "client not found with id " + req.params.clientId
                });
            }
            res.send(client);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "client not found with id " + req.params.clientId
                });
            }
            return res.status(500).send({
                message: "Error updating client with id " + req.params.clientId
            });
        });
};

// Delete a client with the specified clientId in the request
exports.delete = (req, res) => {
    Client.findByIdAndRemove(req.params.clientId)
        .then(client => {
            if (!client) {
                return res.status(404).send({
                    message: "client not found with id " + req.params.clientId
                });
            }
            res.send({ message: "client deleted successfully!" });
        }).catch(err => {
            if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                return res.status(404).send({
                    message: "client not found with id " + req.params.clientId
                });
            }
            return res.status(500).send({
                message: "Could not delete client with id " + req.params.clientId
            });
        });
};
