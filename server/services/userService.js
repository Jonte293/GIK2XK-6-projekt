const db = require('../models');
const {
  createResponseSuccess,
  createResponseError,
  createResponseMessage
} = require('../helpers/responseHelper');
const validate = require('validate.js');


//funktion som hämtar alla varukorgar baserat på userID
async function getByUser(userId) {
  try {
    const user = await db.user.findOne({ where: { id: userId } });
    const allCarts = await user.getCarts({ include: [db.user, db.cart] });
    /* Om allt blev bra, returnera allCarts */
    return createResponseSuccess(allCarts.map((cart) => _formatPost(cart)));
  } catch (error) {
    return createResponseError(error.status, error.message);
  }
}

 // hämtar varukorg baserat på id 
  async function getById(id) {
    try {
      const cart = await db.cart.findOne({
        where: { id },
        include: [
          db.user, // Inkluderar användare
          {
            model: db.cartRow,  // Inkluderar cartRow
            include: [db.product]  // Inkluderar produkter i cartRow
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


module.exports = {
    getByUser,
    getById
  };
  