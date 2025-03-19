const db = require('../models');
const {
  createResponseSuccess,
  createResponseError,
  createResponseMessage
} = require('../helpers/responseHelper');

async function getByCategory(categoryName) {
  try {
    const category = await db.category.findOne({ where: { name: categoryName } });
    const allProducts = await category.getProducts({ include: [db.user, db.category] });
    /* Om allt blev bra, returnera allProducts */
    return createResponseSuccess(allProducts.map((post) => _formatPost(post)));
  } catch (error) {
    return createResponseError(error.status, error.message);
  }
}

module.exports = {
    getByCategory
  };