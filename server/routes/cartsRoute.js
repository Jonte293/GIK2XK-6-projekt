const router = require('express').Router();
const cartService = require('../services/cartService');

router.post('/:id/addProduct', (req, res) => {
    const product = req.body;
    const id = req.params.id;
  
    cartService.addProduct(id, product).then((result) => {
      res.status(result.status).json(result.data);
    });
  });
  
  router.get('/:id', (req, res) => {
    const id = req.params.id;
  
    cartService.getById(id).then((result) => {
      res.status(result.status).json(result.data);
    });
  });
  
  router.get('/', (req, res) => {
    cartService.getAll().then((result) => {
      res.status(result.status).json(result.data);
    });
  });
  
router.post('/', (req, res) => {
  const cart = req.body;
  cartService.create(cart).then((result) => {
    res.status(result.status).json(result.data);
  });
});


  router.put('/', (req, res) => {
    const cart = req.body;
    const id = cart.id;
  
    cartService.update(cart, id).then((result) => {
      res.status(result.status).json(result.data);
    });
  });
  
  router.delete('/', (req, res) => {
    const id = req.body.id;
    cartService.destroy(id).then((result) => {
      res.status(result.status).json(result.data);
    });
  });
  
  module.exports = router;
