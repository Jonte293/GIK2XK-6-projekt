const db = require('../models');
const {
  createResponseSuccess,
  createResponseError,
  createResponseMessage,
} = require('../helpers/responseHelper');

//funktion som skapar produkt och returnerar produkten,
// kollar även om kategorin finns för produkten
async function create(product) {
  try {
    const categoryId = product.category?.id || product.categoryId;

    if (!categoryId) {
      throw new Error('Missing categoryId');
    }

    const newProduct = await db.product.create({
      ...product,
      categoryId,
    });

    return createResponseSuccess(newProduct);
  } catch (error) {
    return createResponseError(error.status || 500, error.message);
  }
}

// updatefunktion som används för att uppdatera en produkt baserat på id
// finns ett giltigt id så uppdateras produkten och ett meddelande fås om lyckad uppdatering
async function update(product, id) {
  if (!id) {
    return createResponseError(422, 'Id är obligatoriskt');
  }
  try {
    const existingProduct = await db.product.findOne({ where: { id } });
    if (!existingProduct) {
      return createResponseError(404, 'Hittade ingen produkt att uppdatera.');
    }
   
    await db.product.update(product, {
      where: { id },
    });
    return createResponseMessage(200, 'Produkten uppdaterades.');
  } catch (error) {
    return createResponseError(error.status, error.message);
  }
}

//deletefunktion som tar bort en produkt i databasen,
// först så rensas cartrows och ratings på grund av databas hierakin.
// meddelande om att produkt tagits bort vid lyckad borttagning

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

// funktion som hämtar alla produkter i databasen,
// där vi inkluderar category och rating. returnerar produkterna med _formatproduct
// för en snyggare formatering av produkterna 
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
    /* Om allt blev bra, returnera allproducts */
    return createResponseSuccess(
      allProducts.map((product) => _formatProduct(product))
    );
  } catch (error) {
    return createResponseError(error.status, error.message);
  }
}
//Getbyid funktionen hämtar produkt baserat på id där vi inkluderar category och rating
// även här returner vi produkten med _formatproduct
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

// Denna funktion ger det format vi vill ha när vi returnerar produkterna
// Där vi inkluderar den information om produkten vi vill ska komma med
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

// getbyid funktionen hämtar produkt baserat på id
// vi inkluderar category och rating och returnerar produkten med _formatProduct
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
    /* Om allt blev bra, returnera produkt */
    return createResponseSuccess(_formatProduct(product));
  } catch (error) {
    return createResponseError(error.status, error.message);
  }
}

//Funktion som hämtar alla produkter somm tillhör ett specifikt categoryID 
async function getByCategory(categoryId) {
  try {
    const category = await db.category.findOne({ where: { id: categoryId } });
    const allProducts = await category.getProducts({ include: [
      db.category,
    {
      model: db.rating,
      include: [db.user],
    }
    ] });
    // Om allt blev bra, returnera allProducts
    return createResponseSuccess(
      allProducts.map((product) => _formatProduct(product))
    );
  } catch (error) {
    return createResponseError(error.status, error.message);
  }
}

// addrating funktionen gör så att vi kan lägga till en rating på en produkt baserat på id
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

//funktion som tar bort rating på en produkt baserat på id.
// inkluderat felmeddelande och meddelande vid lyckad bortagning.
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
