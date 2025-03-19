const db = require('../models');
const {
  createResponseSuccess,
  createResponseError,
  createResponseMessage
} = require('../helpers/responseHelper');


  async function create(product) {
    try {
      const newProduct = await db.product.create(product);
      await _addCategoryToProduct(newProduct, product.category);
  
      return createResponseSuccess(newProduct);
    } catch (error) {
      return createResponseError(error.status, error.message);
    }
  }

  
    async function _findOrCreateCategoryId(name) {
      name = name.toLowerCase().trim();
      const foundOrCreatedCategory = await db.Category.findOrCreate({ where: { name } });
    
      return foundOrCreatedCategory[0].id;
    }

/*     async function _addCategoryToProduct(categories) {
        if (categories) {
          categories.forEach(async (category) => {
            const categoryId = await _findOrCreateCategoryId(category);
            await post.addCategory(categoryId);
          });
        }
      } */

        async function _addCategoryToProduct(product, categories) {
            if (!categories) return; // Prevent errors if categories is undefined
          
            // Convert a single category string into an array
            categories = Array.isArray(categories) ? categories : [categories];
          
            for (const category of categories) {
              const categoryId = await _findOrCreateCategoryId(category);
              await product.addCategory(categoryId);
            }
          }
  
  

      module.exports = {
        create
      };