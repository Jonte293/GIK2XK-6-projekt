const db = require('../models');
const {
  createResponseSuccess,
  createResponseError,
  createResponseMessage
} = require('../helpers/responseHelper');

/*Hämtar en kundvagn baserat på ID, inkluderar info om användaren, produkter och kvantitet */
async function getById(id) {
  try {
    const cart = await db.cart.findOne({
      where: { id },
      include: [
        { model: db.user, attributes: ['id', 'username'] }, 
        { 
          model: db.product, 
          attributes: ['id', 'name', 'price'], 
          through: { attributes: ['quantity'] } 
        }
      ]
    });

    if (!cart) {
      return createResponseError(404, "Hittade inte kundvagn");
    }

    return createResponseSuccess(_formatCart(cart));
  } catch (error) {
    console.error("Error vid hämtning av kundvagn:", error);
    return createResponseError(500, "Internt serverfel");
  }
}

/* Hämtar alla kundvagnar, inkluderar användare och produkt */
async function getAll() {
    try {
      const allCarts = await db.cart.findAll({ include: [db.user, db.product] });
      /* Om allt blev bra, returnera allCarts */
      return createResponseSuccess(allCarts.map((cart) => _formatCart(cart)));
    } catch (error) {
      return createResponseError(error.status, error.message);
    }
  }
/* Skapar en cart med hjälp av _addProductToCart(se längre ned) */
  async function create(cart) {
    try {
      const newCart = await db.cart.create(cart);
      await _addProductToCart(newCart, cart.products);
      return createResponseSuccess(newCart);
    } catch (error) {
      return createResponseError(error.status, error.message);
    }
  }
/*Uppdaterar en cart, hittar den baserat på id och inkluderar produkt och quantity,
  Om payed inte är undefined uppdateras payed för kundvagnen i databasen, om payed: true,
  raderas produkterna i kundvagnen.  */
  async function update(cart, id) {
    if (!id) {
      return createResponseError(422, 'Id är obligatoriskt');
    }
    try {
      const existingCart = await db.cart.findOne({ 
        where: { id },
         include: [{model: db.product, through: { attributes: ['quantity']}}] });

      if (!existingCart) {
        return createResponseError(404, 'Hittade ingen kundvagn att uppdatera.');
      }

      if (cart.payed !== undefined) {
        await existingCart.update({ payed: cart.payed });

        if (cart.payed === true) {
          await db.cartRow.destroy({ where: { cartId: existingCart.id } });
      }
    }
      /* Om det finns produkter i kundvagnen, lägg till fler med _addProductToCart */
      if (cart.products && cart.products.length > 0) {
        await _addProductToCart(existingCart, cart.products);
      }

      return createResponseMessage(200, existingCart);
    } catch (error) {
      console.error("Update error:", error);
      return createResponseError(500, 'Något gick fel vid uppdatering av kundvagnen.');
    }
  }

/* Raderar produkt från kundvagn baserat på cartId och productId */
  async function removeProductFromCart(req, res) {
    const { cartId, productId } = req.body;

    if (!cartId || !productId) {
        return res.status(400).send({ message: 'Cart ID och Product ID är obligatoriska.' });
    }
    try {
        const rowsDeleted = await db.cartRow.destroy({
            where: { cartId, productId }
        });

        if (rowsDeleted > 0) {
            res.status(200).send({ message: 'Produkt borttagen från kundvagnen.' });
        } else {
            res.status(404).send({ message: 'Produkt eller kundvagn inte hittad.' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Något gick fel vid borttagning av produkten.' });
    }
}

/* Raderar kundvagnen baserat på dess id */
    async function deleteCart(id) {
    try {
      await db.cartRow.destroy ({
        where: {cartId:id}
      })
      await db.cart.destroy({
        where: { id }
      });
      return createResponseMessage(200, 'Kundvagnen har tagits bort!');
    } catch (error) {
      return createResponseError(error.status, error.message);
    }
  }
  /* Lägger till produkter i kundvagnen. Kontrollen om produkten är en string fick vi från chatGPT.
     Om produkten inte finns i kundvagnen, skapas en ny rad i databasen.*/
    async function _addProductToCart(cart, products) {

      if (products && products.length > 0) {
        for (const item of products) {
          const name = typeof item === "string" ? item : item.name;
          const quantity = typeof item === "string" ? 1 : item.quantity || 1;

          const productId = await _findOrCreateProductId(name);

          await db.cartRow.findOrCreate({
            where: { cartId: cart.id, productId: productId },
            defaults: {quantity: quantity}
          });
        }
      }
    }

/* Söker efter en produkt i databasen med det angivna namnet, id:t returneras om den finns
  eller skapas och returnerar id om den inte finns */
  async function _findOrCreateProductId(name) {
    name = name.toLowerCase().trim();
    
    const foundOrCreatedProduct = await db.product.findOrCreate({ where: { name } });
  
    return foundOrCreatedProduct[0].id;
  }
  /* Skapar en bättre struktur för en cart, användaren som "äger" carten, samt produkterna i carten*/
  function _formatCart(cart) {
    const cleanCart = {
      id: cart.id,
      createdAt: cart.createdAt,
      updatedAt: cart.updatedAt,
      payed: cart.payed,
      user: {
        id: cart.user.id,
        username: cart.user.username,
        email: cart.user.email,
        firstName: cart.user.firstName,
        lastName: cart.user.lastName,
      },
      products: []
    };
  // Hjälp av chatgpt
    if (cart.products) {
      cleanCart.products = cart.products.map(product => ({
        id: product.id,
        name: product.name,
        price: product.price,
        imageUrl: product.imageUrl,
        quantity: product.cartRow?.quantity || 0
      }));
      return cleanCart;
    }
  }

      module.exports = {
        getAll,
        getById,
        create,
        update,
        removeProductFromCart,
        deleteCart
      };
      
  