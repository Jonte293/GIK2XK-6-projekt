const router = require('express').Router();
const db = require('../models')
const productService = require('../services/productService');

/* router.get('/:id', (req, res) => {
  const id = req.params.id;

  postService.getById(id).then((result) => {
    res.status(result.status).json(result.data);
  });
}); */

router.get('/', (req, res) => {
  db.rating.findAll().then((result) => {
    res.send(result);
  });
});

router.post('/', (req, res) => {
  const rating = req.body;
  db.rating.create(rating).then((result) => {
    res.send(result);
  });
});

/* router.put('/', (req, res) => {
  const post = req.body;
  const id = post.id;

  postService.update(post, id).then((result) => {
    res.status(result.status).json(result.data);
  });
}); */

router.delete('/:id', (req, res) => {
  const id = req.params.id;
  productService.removeRating(id).then((result) => {
    res.status(result.status).json(result.data);
  });
});


module.exports = router;
