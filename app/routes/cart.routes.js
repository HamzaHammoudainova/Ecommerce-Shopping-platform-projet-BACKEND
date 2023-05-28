module.exports = (app) => {
    const carts = require('../controllers/cart.controller.js');


    app.post('/carts', carts.create);


    app.get('/carts', carts.findAll);


    app.get('/carts/:cartId', carts.findOne);


    app.put('/carts/:cartId', carts.update);


    app.delete('/carts/:cartId', carts.delete);
}
