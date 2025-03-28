const router = require('express').Router();
const db = require('../models');
const productService = require('../services/productService');
/*Lägger till rating till en produkt, med hjälp av addRating från productService */
router.post('/:id/addRating', (req, res) => {
  const rating = req.body;
  const id = req.params.id;

  productService.addRating(id, rating).then((result) => {
    res.status(result.status).json(result.data);
  });
});

/*Hämtar en produkt baserat på dess id med getById från productService */
router.get('/:id/', (req, res) => {
  const id = req.params.id;

  productService.getById(id).then((result) => {
    res.status(result.status).json(result.data);
  });
});

/*Hämtar alla produkter med getAll från productService */
router.get('/', (req, res) => {
  productService.getAll().then((result) => {
    res.status(result.status).json(result.data);
  });
});

/*Skapar en produkt med hjälp av create från productService */
router.post('/', (req, res) => {
  const product = req.body;
  productService.create(product).then((result) => {
    res.status(result.status).json(result.data);
  });
});

/*Tar bort en produkt baserat på dess id, med hjälp av deleteProduct från productService */
router.delete('/:id', (req, res) => {
  const id = req.body.id;
  productService.deleteProduct(id).then((result) => {
    res.status(result.status).json(result.data);
  });
});

/*Uppdaterar en produkt med hjälp av update från productService */
router.put('/', (req, res) => {
  const product= req.body;
  const id = product.id;

  productService.update(product, id).then((result) => {
    res.status(result.status).json(result.data);
  });
});


module.exports = router;
