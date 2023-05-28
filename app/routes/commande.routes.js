module.exports = (app) => {
    const commandes = require('../controllers/commande.controller.js');


    app.post('/commandes', commandes.create);


    app.get('/commandes', commandes.findAll);


    app.get('/commandes/:commandeId', commandes.findOne);


    app.put('/commandes/:commandeId', commandes.update);


    app.delete('/commandes/:commandeId', commandes.delete);
}
