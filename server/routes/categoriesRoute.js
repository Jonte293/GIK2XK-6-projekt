const router = require('express').Router();
const db = require('../models');
const categoryService = require('../services/categoryService');

router.get('/:name/categories', (req, res) => {
  const name = req.params.name;

  categoryService.getByCategory(name).then((result) => {
    res.status(result.status).json(result.data);
  });
});

router.get('/', (req, res) => {
  db.category.findAll().then((result) => {
    res.send(result);
  });
});

router.post('/', (req, res) => {
    const category = req.body;
    db.category.create(category).then((result) => {
      res.send(result);
    });
  });

router.delete('/', (req, res) => {
  db.category
    .destroy({
      where: { id: req.body.id }
    })
    .then(() => {
      res.json(`Inlägget raderades`);
    });
});

module.exports = router;
