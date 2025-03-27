const db = require('../models');
const {
  createResponseSuccess,
  createResponseError,
  createResponseMessage,
} = require('../helpers/responseHelper');

/*   async function create(product) {
    try {
      const newProduct = await db.product.create(product);
      await _addCategoryToProduct(newProduct, product.category);
  
      return createResponseSuccess(newProduct);
    } catch (error) {
      return createResponseError(error.status, error.message);
    }
  } */
async function create(product) {
  try {
    // Extract categoryId from the full category object (if needed)
    const categoryId = product.category?.id || product.categoryId;

    if (!categoryId) {
      throw new Error('Missing categoryId');
    }

    // Inject categoryId directly into the product object before create
    const newProduct = await db.product.create({
      ...product,
      categoryId,
    });

    // If you're using belongsTo, this step isn't strictly needed — but you can keep it for consistency
    // await _addCategoryToProduct(newProduct, categoryId);

    return createResponseSuccess(newProduct);
  } catch (error) {
    return createResponseError(error.status || 500, error.message);
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
      where: { id },
    });
    return createResponseMessage(200, 'Produkten uppdaterades.');
  } catch (error) {
    return createResponseError(error.status, error.message);
  }
}

async function deleteProduct(id) {
  try {
    await db.cartRow.destroy({
      where: { productId: id },
    });
    await db.rating.destroy({
      where: { productId: id },
    });
    await db.product.destroy({
      where: { id },
    });
    return createResponseMessage(200, 'Produkten togs bort');
  } catch (error) {
    return createResponseError(error.status, error.message);
  }
}

async function getAll() {
  try {
    const allProducts = await db.product.findAll({
      include: [
        db.category,
        {
          model: db.rating,
          include: [db.user],
        },
      ],
    });
    /* Om allt blev bra, returnera allPosts */
    return createResponseSuccess(
      allProducts.map((product) => _formatProduct(product))
    );
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
          include: [db.user],
        },
      ],
    });
    /* Om allt blev bra, returnera post */
    return createResponseSuccess(_formatProduct(product));
  } catch (error) {
    return createResponseError(error.status, error.message);
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
          id: rating.id,
          score: rating.score,
          review: rating.review,
          user: rating.user.username,
          createdAt: rating.createdAt,
        },
        ...cleanProduct.ratings,
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
          include: [db.user],
        },
      ],
    });
    /* Om allt blev bra, returnera post */
    return createResponseSuccess(_formatProduct(product));
  } catch (error) {
    return createResponseError(error.status, error.message);
  }
}

async function getByCategory(categoryId) {
  try {
    const category = await db.category.findOne({ where: { id: categoryId } });
    const allProducts = await category.getProducts({ include: [db.category] });
    // Om allt blev bra, returnera allProducts
    return createResponseSuccess(
      allProducts.map((product) => _formatProduct(product))
    );
  } catch (error) {
    return createResponseError(error.status, error.message);
  }
}

async function addRating(id, rating) {
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
}

async function removeRating(id) {
  console.log('Tar bort rescension med id :', id);
  if (!id) {
    return createResponseError(422, 'Id är obligatoriskt');
  }
  try {
    await db.rating.destroy({
      where: { id },
    });
    return createResponseMessage(200, 'Rescensionen har tagits bort!');
  } catch (error) {
    return createResponseError(error.status, error.message);
  }
}

module.exports = {
  create,
  update,
  deleteProduct,
  getAll,
  getById,
  getByCategory,
  addRating,
  removeRating,
};
