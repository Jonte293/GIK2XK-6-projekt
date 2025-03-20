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

  async function getById(id) {
    try {
      const cart = await db.cart.findOne({
        where: { id },
        include: [
          db.user, // Inkludera användare
          {
            model: db.cartRow,  // Inkludera cartRow
            include: [db.product]  // Inkludera produkter i cartRow
          }
        ]
      });
  
      if (!cart) {
        return createResponseError(404, 'Cart not found');
      }
  
      return createResponseSuccess(_formatPost(cart));
    } catch (error) {
      return createResponseError(error.status , error.message);
    }
  }


  async function addRating(userId, productId, score, review) {
    if (!userId || !productId) {
      return createResponseError(422, 'User ID och Product ID Ã¤r obligatoriska');
    }
    try {
      // Skapa rating i databasen
      const newRating = await db.rating.create({
        userId: userId,
        productId: productId,
        score: score,
        review: review
      });
  
      return createResponseSuccess(newRating);
    } catch (error) {
      return createResponseError(500, 'Kunde inte skapa rating');
    }
  }

module.exports = {
    getByUser,
    getById,
    addRating,
  };
  

  /*   async function create(userId) {
    if (!userId) {
      return createResponseError(422, 'User ID är obligatoriskt');
    }
    try {
      // Kontrollera om användaren redan har en varukorg
      let cart = await db.cart.findOne({ where: { user_id: userId } });
  
      if (!cart) {
        cart = await db.cart.create({ user_id: userId, payed: false }); // ✅ Skapa ny varukorg
      }
  
      return createResponseSuccess(cart);
    } catch (error) {
      return createResponseError(error.status, error.message);
    }
  } */

    // OSÄKER FUNKTION KOLLA OM DET SNEAR
/* async function getById(id) {
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
    Om allt blev bra, returnera post
    return createResponseSuccess(_formatPost(cart));
  } catch (error) {
    return createResponseError(error.status, error.message);
  }
} */

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