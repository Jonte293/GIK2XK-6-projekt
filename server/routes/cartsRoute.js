const router = require('express').Router();
const userService = require('../services/userService');

router.post('/:id/addProduct', (req, res) => {
    const product = req.body;
    const id = req.params.id;
  
    userService.addProduct(id, product).then((result) => {
      res.status(result.status).json(result.data);
    });
  });
  
  router.get('/:id', (req, res) => {
    const id = req.params.id;
  
    userService.getById(id).then((result) => {
      res.status(result.status).json(result.data);
    });
  });
  
  router.get('/', (req, res) => {
    userService.getAll().then((result) => {
      res.status(result.status).json(result.data);
    });
  });
  
/*   router.post('/', (req, res) => {
    const cart = req.body;
    userService.create(cart).then((result) => {
      res.status(result.status).json(result.data);
    });
  }); */

/*   router.post('/', async (req, res) => {
    try {
        const { userId } = req.body;
        const result = await userService.createCart(userId);
        res.status(result.status).json(result.data);
    } catch (error) {
        res.status(500).json({ error: 'Kunde inte skapa varukorgen' });
    }
}); */

router.post('/', (req, res) => {
  const cart = req.body;
  userService.create(cart).then((result) => {
    res.status(result.status).json(result.data);
  });
});


  router.put('/', (req, res) => {
    const cart = req.body;
    const id = cart.id;
  
    userService.update(cart, id).then((result) => {
      res.status(result.status).json(result.data);
    });
  });
  
  router.delete('/', (req, res) => {
    const id = req.body.id;
    userService.destroy(id).then((result) => {
      res.status(result.status).json(result.data);
    });
  });
  
  module.exports = router;
