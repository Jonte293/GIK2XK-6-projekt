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
        db.user,
        db.product,
      ]
    });
    /* Om allt blev bra, returnera post */
    return createResponseSuccess(_formatCart(cart));
  } catch (error) {
    return createResponseError(error.status, error.message);
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
      const existingCart = await db.cart.findOne({ where: { id } });
      if (!existingCart) {
        return createResponseError(404, 'Hittade ingen kundvagn att uppdatera.');
      }
      await _addProductToCart(existingCart, cart.products);
      await db.cart.update(cart, {
        where: { id }
      });
      return createResponseMessage(200, 'Kundvagnen uppdaterades.');
    } catch (error) {
      return createResponseError(error.status, error.message);
    }
  }


  async function destroy(id) {
    if (!id) {
      return createResponseError(422, 'Id är obligatoriskt');
    }
    try {
      await db.cart.destroy({
        where: { id }
      });
      return createResponseMessage(200, 'Kundvagnen har tagits bort!');
    } catch (error) {
      return createResponseError(error.status, error.message);
    }
  }

  
  
  async function _addProductToCart(cart, products) {
    await db.cartRow.destroy({ where: { cartId: cart.id } });
  
    if (products) {
      products.forEach(async (product) => {
        const productId = await _findOrCreateProductId(product);
        await cart.addProduct(productId);
      });
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
      
        if (cart.products) {
          cart.products.map((product) => {
            return (cleanCart.products = [product.name, ...cleanCart.products]);
          });
          return cleanCart;
        }
      }

      module.exports = {
        getAll,
        getById,
        create,
        update,
        destroy
      };
      
  