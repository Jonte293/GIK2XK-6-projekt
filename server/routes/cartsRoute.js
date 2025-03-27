const router = require('express').Router();
const cartService = require('../services/cartService');
const db = require('../models');

/* router.post('/:id/addProduct', (req, res) => {
    const product = req.body;
    const id = req.params.id;
  
    cartService.create(id, product).then((result) => {
      res.status(result.status).json(result.data);
    });
  }); */
  
  router.get('/:id', (req, res) => {
    const id = req.params.id;
  
    cartService.getById(id).then((result) => {
      res.status(result.status).json(result.data);
    });
  });
  
  router.get('/', (req, res) => {
    cartService.getAll().then((result) => {
      res.status(result.status).json(result.data);
    });
  });
  
router.post('/', (req, res) => {
  const cart = req.body;
  cartService.create(cart).then((result) => {
    res.status(result.status).json(result.data);
  });
});


router.put('/:id', (req, res) => {
  const cartId = req.params.id; // Hämtar id från URL-parametern
  const updatedCart = req.body; // Hämtar hela cart-objektet från body

  cartService.update(updatedCart, cartId).then((result) => {
      // Om uppdateringen lyckas
      if (result.status === 200) {
        res.status(200).json(result.data); 
    } else {
        res.status(result.status).json({ error: result.message });
    }
  }).catch((err) => {
      console.error(err);
      res.status(500).json({ error: 'Internt serverfel.' });
  });
});

router.delete('/:cartId/removeProduct/:productId', async (req, res) => {
  try {
      const { cartId, productId } = req.params;
      /* const { cartId } = req.params;
      const { productId } = req.body;  */// Ta emot productId i request-body

      console.log(`Tar bort produkt ${productId} från kundvagn ${cartId}`);

      // Kolla om kundvagnen finns
      const cart = await db.cart.findByPk(cartId);
      if (!cart) return res.status(404).json({ error: "Cart not found" });

      // Ta bort produkten från kundvagnen (cartRow-tabellen)
      await db.cartRow.destroy({
          where: { cartId, productId }
      });

      res.status(200).json({ message: "Produkt borttagen från kundvagn" });
  } catch (error) {
      console.error("Fel vid borttagning:", error);
      res.status(500).json({ error: "Något gick fel" });
  }
});

/* router.delete('/', (req, res) => {
  db.product
    .destroy({
      where: { id: req.body.id }
    })
    .then(() => {
      res.json(`Produkten togs bort från kundvagnen`);
    });
}); */

/* router.delete('/:cartId/removeProduct', (req, res) => {
  const { cartId } = req.params;
  const { productId } = req.body; // Get the productId from the request body
  cartService.removeProductFromCart(cartId, productId).then((result) => {
    res.status(result.status).json(result.data);
  }).catch(error => {
    console.error('Error removing product:', error);
    res.status(500).json({ message: 'Det gick inte att ta bort produkten från kundvagnen' });
});
}); */

  
  /* router.delete('/', (req, res) => {
    const id = req.body.id;
    cartService.destroy(id).then((result) => {
      res.status(result.status).json(result.data);
    });
  }); */
  
  module.exports = router;
