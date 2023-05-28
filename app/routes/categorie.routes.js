module.exports = (app) => {
    const categories = require('../controllers/categorie.controller.js');


    app.post('/categories', categories.create);


    app.get('/categories', categories.findAll);


    app.get('/categories/:categorieId', categories.findOne);


    app.put('/categories/:categorieId', categories.update);


    app.delete('/categories/:categorieId', categories.delete);
}
