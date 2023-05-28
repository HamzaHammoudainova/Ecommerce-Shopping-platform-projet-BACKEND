module.exports = (app) => {
    const souscats = require('../controllers/souscat.controller.js');


    app.post('/souscats', souscats.create);


    app.get('/souscats', souscats.findAll);


    app.get('/souscats/:souscatId', souscats.findOne);


    app.put('/souscats/:souscatId', souscats.update);


    app.delete('/souscats/:souscatId', souscats.delete);
}
