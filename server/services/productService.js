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
  

 /*  async function getAll() {
      try {
        const allProducts = await db.product.findAll({ include: [db.category, db.rating, db.user]});
        
        return createResponseSuccess(allProducts.map((product) => _formatProduct(product)));
      } catch (error) {
        return createResponseError(error.status, error.message);
      }
    } */

      async function getAll() {
        try {
          const allProducts = await db.product.findAll({ 
            include: [
              db.category,
              {
                model: db.rating,
                include: [ db.user]
              }
            ]
          });
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
              {
                model: db.rating,
                include: [ db.user]
              }
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


          async function _addCategoryToProduct(categories) {
            if (categories) {
              categories.forEach(async (category) => {
                const categoryId = await _findOrCreateCategoryId(category);
                await post.addCategory(categoryId);
              });
            }
          }
  
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
              },
            };
            if (product.ratings) {
              cleanProduct.ratings = [];
          
              product.ratings.map((rating) => {
                return (cleanProduct.ratings = [
                  {
                    score: rating.score,
                    review: rating.review,
                    user: rating.user.username,
                    createdAt: rating.createdAt,
                  },
                  ...cleanProduct.ratings
                ]);
              });
          }

            return cleanProduct;
          
        }

  async function getById(id) {
    try {
      const product = await db.product.findOne({
        where: { id },
        include: [
          db.category,
          {
            model: db.rating,
            include: [db.user]
          }
        ]
      });
      /* Om allt blev bra, returnera post */
      return createResponseSuccess(_formatProduct(product));
    } catch (error) {
      return createResponseError(error.status, error.message);
    }
  }  

/*         async function getByCategory(categoryId) {
          try {
            const category = await db.category.findOne({ where: { id: categoryId } });
            const allProducts = await category.getProducts({ include: [db.product, db.category] });
            // Om allt blev bra, returnera allProducts 
            return createResponseSuccess(allProducts.map((product) => _formatProduct(product)));
          } catch (error) {
            return createResponseError(error.status, error.message);
          }
        } */

          async function getByCategory(categoryName) {
            try {
  
              const category = await db.category.findOne({
                where: { name: categoryName }
              });
  
              if (!category) {
                return createResponseError(404, 'Kategorin hittades inte.')
              }
  
              const products = await db.product.findAll({where: {category_id: category.id}, include: [db.category]
              });
  
              if (products.length === 0) {
  
                return createResponseError(404, 'Inga produkter hittades för denna kategori.');
              }
  
              return createResponseSuccess(products.map((product) => _formatProduct(product)));
            } catch (error) {
              return createResponseError(error.status, error.message);
            }
          }

      async function addRating(id, rating) {
        if (!id) {
          return createResponseError(422, 'Id är obligatoriskt');
        }
        try {
          rating.postId = id;
          const newRating = await db.rating.create(rating);
          return createResponseSuccess(newRating);
        } catch (error) {
          return createResponseError(error.status, error.message);
        }
      }    

      module.exports = {
        create,
        update,
        getAll,
        getById,
        getByCategory,
        addRating
      };