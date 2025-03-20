const router = require('express').Router();
const db = require('../models');
const productService = require('../services/productService');

/* router.get('/:name/categories', (req, res) => {
  const name = req.params.name;
  productService.getByCategory(name).then((result) => {
    res.status(result.status).json(result.data);
  });
});
 */

router.get('/:categoryName', 
  async (req, res) => {
    try{
        const categoryName = req.params.categoryName;
        const result = await productService.getByCategory(categoryName);
        res.status(result.status).json(result.data);
      } catch (error) {
        res.status(500).json({ error: 'Något gick fel vid hämtning av produkter per kategori.'});
      }
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
