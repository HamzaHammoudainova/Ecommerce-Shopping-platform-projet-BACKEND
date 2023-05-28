module.exports = (app) => {
    const purchases = require('../controllers/purchase.controller.js');


    app.post('/purchases', purchases.create);


    app.get('/purchases', purchases.findAll);


    app.get('/purchases/:purchasesId', purchases.findOne);


    app.put('/purchases/:purchasesId', purchases.update);


    app.delete('/purchases/:purchasesId', purchases.delete);
}
