const db = require('../models');
const {
  createResponseSuccess,
  createResponseError,
  createResponseMessage
} = require('../helpers/responseHelper');


async function getById(id) {
  try {
    const cart = await db.cart.findOne({
      where: { id },
      include: [
        { model: db.user, attributes: ['id', 'username'] }, // Hämtar användare
        { 
          model: db.product, 
          attributes: ['id', 'name', 'price'], // ✅ Se till att 'id' finns med!
          through: { attributes: ['quantity'] } // ✅ Hämtar antalet från cartRow
        }
      ]
    });

    if (!cart) {
      return createResponseError(404, "Cart not found");
    }

    return createResponseSuccess(_formatCart(cart));
  } catch (error) {
    console.error("Error fetching cart:", error);
    return createResponseError(500, "Internal server error");
  }
}

async function getAll() {
    try {
      const allCarts = await db.cart.findAll({ include: [db.user, db.product] });
      /* Om allt blev bra, returnera allPosts */
      return createResponseSuccess(allCarts.map((cart) => _formatCart(cart)));
    } catch (error) {
      return createResponseError(error.status, error.message);
    }
  }

  async function create(cart) {
    try {
      const newCart = await db.cart.create(cart);
      //post tags är en array av namn
      //lägg till eventuella taggar
      await _addProductToCart(newCart, cart.products);
  
      return createResponseSuccess(newCart);
    } catch (error) {
      return createResponseError(error.status, error.message);
    }
  }

  async function update(cart, id) {
    if (!id) {
      return createResponseError(422, 'Id är obligatoriskt');
    }
    try {
      const existingCart = await db.cart.findOne({ 
        where: { id },
         include: [{model: db.product, through: { attributes: ['quantity']}}] });

      if (!existingCart) {
        return createResponseError(404, 'Hittade ingen kundvagn att uppdatera.');
      }

      if (cart.payed !== undefined) {
        await existingCart.update({ payed: cart.payed });

        if (cart.payed === true) {
          await db.cartRow.destroy({ where: { cartId: existingCart.id } });
      }
    }

      if (cart.products && cart.products.length > 0) {
        await _addProductToCart(existingCart, cart.products);
      }
      const updatedCart = await db.cart.findOne({
        where: { id },
        include: [{ model: db.product, through: { attributes: ['quantity'] } }]
      });

      return createResponseMessage(200, updatedCart);
    } catch (error) {
      console.error("Update error:", error);
      return createResponseError(500, 'Något gick fel vid uppdatering av kundvagnen.');
    }
  }


  async function removeProductFromCart(req, res) {
    const { cartId, productId } = req.body; // Hämtar cartId och productId från request body

    if (!cartId || !productId) {
        return res.status(400).send({ message: 'Cart ID och Product ID är obligatoriska.' });
    }

    try {
        // Försök att ta bort rätt rad i cartRow
        const rowsDeleted = await db.cartRow.destroy({
            where: { cartId, productId }
        });

        if (rowsDeleted > 0) {
            res.status(200).send({ message: 'Produkt borttagen från kundvagnen.' });
        } else {
            res.status(404).send({ message: 'Produkt eller kundvagn inte hittad.' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Något gick fel vid borttagning av produkten.' });
    }
}


    async function deleteCart(id) {
    try {
      await db.cartRow.destroy ({
        where: {cartId:id}
      })
      await db.cart.destroy({
        where: { id }
      });
      return createResponseMessage(200, 'Kundvagnen har tagits bort!');
    } catch (error) {
      return createResponseError(error.status, error.message);
    }
  }
  
    async function _addProductToCart(cart, products) {

      if (products && products.length > 0) {
        for (const item of products) {
          const name = typeof item === "string" ? item : item.name;
          const quantity = typeof item === "string" ? 1 : item.quantity || 1;

          const productId = await _findOrCreateProductId(name);

          await db.cartRow.findOrCreate({
            where: { cartId: cart.id, productId: productId },
            defaults: {quantity: quantity}
          });
        }
      }
    }


  async function _findOrCreateProductId(name) {
    name = name.toLowerCase().trim();
    
    const foundOrCreatedProduct = await db.product.findOrCreate({ where: { name } });
  
    return foundOrCreatedProduct[0].id;
  }
  
      function _formatCart(cart) {
        const cleanCart = {
          id: cart.id,
          createdAt: cart.createdAt,
          updatedAt: cart.updatedAt,
          payed: cart.payed,
          user: {
            id: cart.user.id,
            username: cart.user.username,
            email: cart.user.email,
            firstName: cart.user.firstName,
            lastName: cart.user.lastName,
          },
          products: []
        };
      // Hjälp av chatgpt
        if (cart.products) {
          cleanCart.products = cart.products.map(product => ({
            id: product.id,
            name: product.name,
            price: product.price,
            imageUrl: product.imageUrl,
            quantity: product.cartRow?.quantity || 0
          }));
          return cleanCart;
        }
      }

      module.exports = {
        getAll,
        getById,
        create,
        update,
        removeProductFromCart,
        deleteCart
      };
      
  