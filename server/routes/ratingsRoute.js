const router = require('express').Router();
const db = require('../models')
const productService = require('../services/productService');

/*Hämtar alla ratings */
router.get('/', (req, res) => {
  db.rating.findAll().then((result) => {
    res.send(result);
  });
});

/*Skapar en rating */
router.post('/', (req, res) => {
  const rating = req.body;
  db.rating.create(rating).then((result) => {
    res.send(result);
  });
});

/*Tar bort en rating med hjälp av removeRating från productService */
router.delete('/:id', (req, res) => {
  const id = req.params.id;
  productService.removeRating(id).then((result) => {
    res.status(result.status).json(result.data);
  });
});


module.exports = router;
