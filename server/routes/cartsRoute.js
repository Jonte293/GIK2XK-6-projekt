const router = require('express').Router();
const cartService = require('../services/cartService');
const db = require('../models');
/*Hämtar en cart baserat på dess id */
router.get('/:id', (req, res) => {
  const id = req.params.id;

  cartService.getById(id).then((result) => {
    res.status(result.status).json(result.data);
  });
});
/*Hämtar alla carts */
router.get('/', (req, res) => {
  cartService.getAll().then((result) => {
    res.status(result.status).json(result.data);
  });
});
/* Skapar en cart med hjälp av create från cartService */
router.post('/', (req, res) => {
  const cart = req.body;
  cartService.create(cart).then((result) => {
    res.status(result.status).json(result.data);
  });
});

/* Uppdaterar en cart med hjälp av update från cartService, hämtar id från URL-parametern,
   och cart-objektet från body */
router.put('/:id', (req, res) => {
  const cartId = req.params.id; 
  const updatedCart = req.body; 

  cartService.update(updatedCart, cartId).then((result) => {
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
/*Tar bort produkt från cart, kollar om cart finns med findByPk, tar bort
  den cartRow som har det cartIdt och det productIdt (vilket tar bort produkten)  */
router.delete('/:cartId/removeProduct/:productId', async (req, res) => {
  try {
      const { cartId, productId } = req.params;
      console.log(`Tar bort produkt ${productId} från kundvagn ${cartId}`);

      const cart = await db.cart.findByPk(cartId);
      if (!cart) return res.status(404).json({ error: "Hittar inte kundvagn" });

      await db.cartRow.destroy({
          where: { cartId, productId }
      });

      res.status(200).json({ message: "Produkt borttagen från kundvagn" });
  } catch (error) {
      console.error("Fel vid borttagning:", error);
      res.status(500).json({ error: "Något gick fel" });
  }
});
/* Tar bort en cart baserat på dess id, med hjälp av deleteCart från cartService */
router.delete('/:id', (req, res) => {
  const id = req.body.id;
  cartService.deleteCart(id).then((result) => {
    res.status(result.status).json(result.data);
  });
});
  
module.exports = router;
