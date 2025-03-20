const router = require('express').Router();
const db = require('../models')

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

router.delete('/', (req, res) => {
  db.rating
    .destroy({
      where: { id: req.body.id }
    })
    .then(() => {
      res.json(`Recensionen raderades`);
    });
});


module.exports = router;
