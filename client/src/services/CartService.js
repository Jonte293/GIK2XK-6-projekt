import axios from './api';

/*CartService används för att hantera förfrågningar mot servern med hjälp av axios */

/*Hämtar alla carts från servern */
export async function getAll(endpoint = '/cart') {
    try {
        const response = await axios.get(endpoint);

        if(response.status === 200) return response.data;
        else {
            console.log(response);
            return [];
        }
    } catch(e) {
        e?.response ? console.log(e.response.data) : console.log(e);
    }
}

/* Hämtar en cart, baserat på id */
export async function getOne(id) {
    if (!id) {
        console.error("CartId saknas");
        return null;}
    try{
        const response = await axios.get(`/carts/${id}`);
        if(response.status === 200) return response.data;
        else {
            console.log(response.data);
            return null;
        }
    } catch (e) {
        e?.response ? console.log(e.response.data) : console.log(e);
    }
}
/* Skapar en kundvagn till servern, returnar response.data som är själva carten(dess innehåll) */
export async function create(cart) {
    try{
        const response = await axios.post('/carts', cart);
        if(response.status === 200) return response.data;
        else {
            console.log(response.data);
            return null;
        }
    } catch (e) {
        e?.response ? console.log(e.response.data) : console.log(e);
    }
}
/* Uppdaterar en kundvagn i databasen */
export async function update(cart) {
    try{
        const response = await axios.put(`/carts/${cart.id}`, cart);
        if(response.status === 200) return response.data;
        else {
            console.log(response.data);
            return null;
        }
    } catch (e) {
        e?.response ? console.log(e.response.data) : console.log(e);
    }
}
/* Tar bort en kundvagn i databasen, baserat på dess id */
export async function remove(id, cart) {
    try{
        const response = await axios.delete(`/carts/${cart.id}`, { data: { id } });
        if(response.status === 200) return response.data;
        else {
            console.log(response.data);
            return null;
        }
    } catch (e) {
        e?.response ? console.log(e.response.data) : console.log(e);
    }
}

/* Tar bort en produkt från en kundvagn i databasen, baserat på cartId och productId */
export async function removeCartProduct(cartId, productId) {
    try {
        const response = await axios.delete(`/carts/${cartId}/removeProduct/${productId}`);

        if (response.status === 200) return response.data;
        else {
            console.log(response.data);
            return null;
        }
    } catch (e) {
        e?.response ? console.log(e.response.data) : console.log(e);
    }
}
/* Skapar en tom kundvagn */
export const createEmptyCart = async () => {
    try {
      
      const newCart = {
        id: 0,  
        products: [],
        payed: false,
        user: null, 
      };
  
      return newCart; 
  
    } catch (error) {
      console.error("Fel vid skapande av ny kundvagn:", error);
      throw error;
    }
  };

/* Lägger till en produkt i cart baserat på cartId i databasen */
  export async function addProduct(cartId, product) {
    await axios.put(`/carts/${cartId}`, {
        id: cartId,
        payed: false,
        products: [
          {
            name: product.name,
            quantity: 1
          }
        ]
      });
}