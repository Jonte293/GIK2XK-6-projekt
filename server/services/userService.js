const db = require('../models');
const {
  createResponseSuccess,
  createResponseError,
  createResponseMessage
} = require('../helpers/responseHelper');
const validate = require('validate.js');

async function getByUser(userId) {
  try {
    const user = await db.user.findOne({ where: { id: userId } });
    const allCarts = await user.getCarts({ include: [db.user, db.cart] });
    /* Om allt blev bra, returnera allPosts */
    return createResponseSuccess(allCarts.map((cart) => _formatPost(cart)));
  } catch (error) {
    return createResponseError(error.status, error.message);
  }
}

// OSÄKER FUNKTION KOLLA OM DET SNEAR
async function getById(id) {
  try {
    const cart = await db.cart.findOne({
      where: { id },
      include: [
        db.user,
        db.cart,
        {
          model: db.cartRow,
          model: db.product,
          include: [db.user]
        }
      ]
    });
    /* Om allt blev bra, returnera post */
    return createResponseSuccess(_formatPost(cart));
  } catch (error) {
    return createResponseError(error.status, error.message);
  }
}

async function getAll() {
  try {
    const allCarts = await db.cart.findAll({ include: [db.user, db.cart] });
    /* Om allt blev bra, returnera allPosts */
    return createResponseSuccess(allCarts.map((cart) => _formatPost(cart)));
  } catch (error) {
    return createResponseError(error.status, error.message);
  }
}

/* async function addRating(id, rating) {
  if (!id) {
    return createResponseError(422, 'Id är obligatoriskt');
  }
  try {
    rating.productId = id;
    const newRating = await db.rating.create(rating);
    return createResponseSuccess(newRating);
  } catch (error) {
    return createResponseError(error.status, error.message);
  }
} */

  async function addRating(userId, productId, score, review) {
    if (!userId || !productId) {
      return createResponseError(422, 'User ID och Product ID Ã¤r obligatoriska');
    }
    try {
      // Skapa rating i databasen
      const newRating = await db.rating.create({
        user_id: userId,
        product_id: productId,
        score: score,
        review: review
      });
  
      return createResponseSuccess(newRating);
    } catch (error) {
      return createResponseError(500, 'Kunde inte skapa rating');
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

module.exports = {
    getById,
    getAll,
    addRating,
    create,
  };
  