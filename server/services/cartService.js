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

      if (cart.products && cart.products.length > 0) {
        for (const item of cart.products) {
          const productId = await _findOrCreateProductId(item.name);

          if (item.quantity === 0) {
            // Ta bort cartRow om produkten inte längre ska vara i kundvagnen
            await db.cartRow.destroy({
                where: { cartId: existingCart.id, productId: productId }
            });
        } else {
            const quantity = item.quantity || 1;

          const [cartRow, created] = await db.cartRow.findOrCreate({
            where: { cartId: existingCart.id, productId: productId },
            defaults: { quantity: quantity }
          });
          
          if (!created) {
            // Produkten finns redan i kundvagnen → uppdatera kvantiteten istället
            await cartRow.update({ quantity: quantity });
          }
          }
        }
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

  /* async function destroy(id) {
    if (!id) {
      return createResponseError(422, 'Id är obligatoriskt');
    } 
    try {
    }  */
/*     try {
      await db.cartRow.destroy({
        where: { cartId, cart.id }
      });
    } catch (error) {
      return createResponseError(error.status, error.message);
    } */
    /* try {
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
  } */

  
  
/*   async function _addProductToCart(cart, products) {
    await db.cartRow.destroy({ where: { cartId: cart.id } });
  
    if (products) {
      products.forEach(async (product) => {
        const productId = await _findOrCreateProductId(product);
        await cart.addProduct(productId);
      });
    }
  } */

    //Chatgpt lösning!!!

    async function _addProductToCart(cart, products) {

      await db.cartRow.destroy({ where: { cartId: cart.id } });
    
      if (products && products.length > 0) {
        for (const item of products) {
          const name = typeof item === "string" ? item : item.name;
          const quantity = typeof item === "string" ? 1 : item.quantity || 1;
    
          const productId = await _findOrCreateProductId(name);
    
          await db.cartRow.create({
            cartId: cart.id,
            productId: productId,
            quantity: quantity
          });
        }
      }
    }

/*     async function _addProductToCart(cart, products) {
      if (products) {
        // First, clear existing cart rows to prevent duplicates
        await db.cartRow.destroy({ where: { cartId: cart.id } });
    
        // Loop through products and add them with quantity
        for (const product of products) {
          const productId = await _findOrCreateProductId(product);
          const quantity = product.quantity || 1; // Default to 1 if no quantity is provided
    
          // Assuming cart.addProduct supports an association table
          await cart.addProduct(productId, { through: { quantity } });
        }
      }
    } */

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
        removeProductFromCart
      };
      
  