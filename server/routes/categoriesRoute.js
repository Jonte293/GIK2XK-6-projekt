const router = require('express').Router();
const db = require('../models');
const productService = require('../services/productService');
/* Hämtar produkter baserat på dess categoryId, med hjälp av getByCategory från productService */
router.get('/:id/products', (req, res) => {
  const id = req.params.id;

  productService.getByCategory(id).then((result) => {
    res.status(result.status).json(result.data);
  });
});

/*Hämtar alla kategorier */
router.get('/', (req, res) => {
  db.category.findAll().then((result) => {
    res.send(result);
  });
});

/*Skapar en kategori */
router.post('/', (req, res) => {
    const category = req.body;
    db.category.create(category).then((result) => {
      res.send(result);
    });
  });

  /*Tar bort en kategori */
router.delete('/', (req, res) => {
  db.category
    .destroy({
      where: { id: req.body.id }
    })
    .then(() => {
      res.json(`Kategorin raderades`);
    });
});

module.exports = router;
