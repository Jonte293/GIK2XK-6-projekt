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

    async function update(product, id) {
      if (!id) {
        return createResponseError(422, 'Id är obligatoriskt');
      }
      try {
        const existingProduct = await db.product.findOne({ where: { id } });
        if (!existingProduct) {
          return createResponseError(404, 'Hittade ingen produkt att uppdatera.');
        }
/*         await _addProductToProduct(existingProduct, product.products); */
        await db.product.update(product, {
          where: { id }
        });
        return createResponseMessage(200, 'Produkten uppdaterades.');
      } catch (error) {
        return createResponseError(error.status, error.message);
      }
    }
  

  async function getAll() {
      try {
        const allProducts = await db.product.findAll({ include: [db.category]/* , attributes: ['category_id', 'name'] */ });
        /* Om allt blev bra, returnera allPosts */
        return createResponseSuccess(allProducts.map((product) => _formatProduct(product)));
      } catch (error) {
        return createResponseError(error.status, error.message);
      }
    }

  async function getById(id) {
    try {
      const product = await db.product.findOne({
        where: { id },
        include: [
          db.category,
        ]
      });
      /* Om allt blev bra, returnera post */
      return createResponseSuccess(_formatProduct(product));
    } catch (error) {
      return createResponseError(error.status, error.message);
    }
  }  

  
    async function _findOrCreateCategoryId(name) {
      name = name.toLowerCase().trim();
      const foundOrCreatedCategory = await db.Category.findOrCreate({ where: { name } });
    
      return foundOrCreatedCategory[0].id;
    }




/*         Fick hjälp av chatgpt att lösa denna:
        Prompt till chatgpt: {
            "status": 500,
            "data": {
                "error": "categories.forEach is not a function"
            }
        }
        Svar: "The error "categories.forEach is not a function" indicates that categories is not an array in your code, but you are trying to use .forEach() on it."
        Fick sedan hjälp att göra categories till en array*/
        async function _addCategoryToProduct(product, categories) {
            if (!categories) return; 
          
            categories = Array.isArray(categories) ? categories : [categories];
          
            for (const category of categories) {
              const categoryId = await _findOrCreateCategoryId(category);
              await product.addCategory(categoryId);
            }
          }

/*           async function _addCategoryToProduct(categories) {
            if (categories) {
              categories.forEach(async (category) => {
                const categoryId = await _findOrCreateCategoryId(category);
                await post.addCategory(categoryId);
              });
            }
          } */
  
  
          function _formatProduct(product) {
            const cleanProduct = {
              id: product.id,
              name: product.name,
              price: product.price,
              description: product.description,
              imageUrl: product.imageUrl,
              createdAt: product.createdAt,
              updatedAt: product.updatedAt,
              category: {
                id: product.category.id,
                name: product.category.name,
              }
            };
          
/*             if (product.categories) {
              product.products.map((product) => {
                return (cleanProduct.products = [product.name, ...cleanProduct.products]);
              }); */
              return cleanProduct;
            //}
          }

        async function getByCategory(categoryId) {
          try {
            const category = await db.category.findOne({ where: { id: categoryId } });
            const allProducts = await category.getProducts({ include: [db.product, db.category] });
            // Om allt blev bra, returnera allProducts 
            return createResponseSuccess(allProducts.map((product) => _formatProduct(product)));
          } catch (error) {
            return createResponseError(error.status, error.message);
          }
        }

      module.exports = {
        create,
        update,
        getAll,
        getById,
        getByCategory
      };