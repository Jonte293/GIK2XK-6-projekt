const db = require('../models');
const {
  createResponseSuccess,
  createResponseError,
  createResponseMessage
} = require('../helpers/responseHelper');
const validate = require('validate.js');


async function getAll() {
    try {
      const allCarts = await db.cart.findAll({ include: [db.user, db.cart] });
      /* Om allt blev bra, returnera allPosts */
      return createResponseSuccess(allCarts.map((cart) => _formatCart(cart)));
    } catch (error) {
      return createResponseError(error.status, error.message);
    }
  }