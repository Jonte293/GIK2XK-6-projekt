const router = require('express').Router();
const db = require('../models');
const validate = require('validate.js');
const userService = require('../services/userService');

/*Sätter upp regler för att kontrollera så att data som skickas har korrekt format */
const constraints = {
  email: {
    length: {
      minimum: 4,
      maximum: 200,
      tooShort: '^E-postadressen måste vara minst %{count} tecken lång.',
      tooLong: '^E-postadressen får inte vara längre än %{count} tecken lång.'
    },
    email: {
      message: '^E-postadressen är i ett felaktigt format.'
    }
  },
  username: {
    length: {
      minimum: 3,
      maximum: 50,
      tooShort: '^Användarnamnet måste vara minst %{count} tecken långt.',
      tooLong: '^Användarnamnet får inte vara längre än %{count} tecken långt.'
    }
  }
};

/*Hämtar carts baserat på userId, med hjälp av getByUser från userService */
router.get('/:id/carts', (req, res) => {
  const id = req.params.id;

  userService.getByUser(id).then((result) => {
    res.status(result.status).json(result.data);
  });
});

/*Hämtar alla carts */
router.get('/', (req, res) => {
  db.user.findAll().then((result) => {
    res.send(result);
  });
});

/*Skapar en user */
router.post('/', (req, res) => {
  const user = req.body;
  const invalidData = validate(user, constraints);
  if (invalidData) {
    res.status(400).json(invalidData);
  } else {
    db.user.create(user).then((result) => {
      res.send(result);
    });
  }
});

/*Ändrar en user baserat på dess id */
router.put('/', (req, res) => {
  const user = req.body;
  const invalidData = validate(user, constraints);
  const id = user.id;
  if (invalidData || !id) {
    res.status(400).json(invalidData || 'Id är obligatoriskt.');
  } else {
    db.user
      .update(user, {
        where: { id: user.id }
      })
      .then((result) => {
        res.send('Användaren har uppdaterats.');
      });
  }
});

/*Tar bort en user baserat på dess id */
router.delete('/', (req, res) => {
  db.user
    .destroy({
      where: { id: req.body.id }
    })
    .then(() => {
      res.json(`Användaren raderades`);
    });
});

module.exports = router;
