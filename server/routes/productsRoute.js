const router = require('express').Router();
const db = require('../models');
const productService = require('../services/productService');

router.get('/:id/products', (req, res) => {
  const id = req.params.id;

  postService.getByProduct(id).then((result) => {
    res.status(result.status).json(result.data);
  });
});

router.get('/', (req, res) => {
  db.product.findAll().then((result) => {
    res.send(result);
  });
});

router.post('/', (req, res) => {
  const product = req.body;
  productService.create(product).then((result) => {
    res.send(result);
  });
});

/* router.post('/', (req, res) => {
  const cart = req.body;
  cartService.create(cart).then((result) => {
    res.status(result.status).json(result.data);
  });
}); */

router.delete('/', (req, res) => {
  db.product
    .destroy({
      where: { id: req.body.id }
    })
    .then(() => {
      res.json(`Produkten raderades`);
    });
});

router.put('/', (req, res) => {
  const product= req.body;
  const id = product.id;

  productService.update(product, id).then((result) => {
    res.status(result.status).json(result.data);
  });
});


module.exports = router;
