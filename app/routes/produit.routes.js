module.exports = (app) => {
    const produits = require('../controllers/produit.controller.js');


    app.post('/produits', produits.create);


    app.get('/produits', produits.findAll);


    app.get('/produits/:produitId', produits.findOne);


    app.put('/produits/:produitId', produits.update);


    app.delete('/produits/:produitId', produits.delete);
}
