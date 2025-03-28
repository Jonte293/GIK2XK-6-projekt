import axios from './api';

/* ProductService används för att hantera förfrågningar mot servern med hjälp av axios */

/*Hämtar alla produkter från databasen */
export async function getAll(endpoint = '/products') {
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
/* Hämtar en produkt från databasen, baserat på id */
export async function getOne(id) {
    try{
        const response = await axios.get(`/products/${id}`);
        if(response.status === 200) return response.data;
        else {
            console.log(response.data);
            return null;
        }
    } catch (e) {
        e?.response ? console.log(e.response.data) : console.log(e);
    }
}
/* Skapar en ny produkt till databasen */
export async function create(product) {
    try{
        const response = await axios.post('/products', product);
        if(response.status === 200) return response.data;
        else {
            console.log(response.data);
            return null;
        }
    } catch (e) {
        e?.response ? console.log(e.response.data) : console.log(e);
    }
}
/* Uppdaterar en produkt i databasen */
export async function update(product) {
    try{
        const response = await axios.put('/products', product);
        if(response.status === 200) return response.data;
        else {
            console.log(response.data);
            return null;
        }
    } catch (e) {
        e?.response ? console.log(e.response.data) : console.log(e);
    }
}
/* Tar bort en produkt i databasen, baserat på id */
export async function remove(id) {
    try{
        const response = await axios.delete(`/products/${id}`, { data: { id } });
        if(response.status === 200) return response.data;
        else {
            console.log(response.data);
            return null;
        }
    } catch (e) {
        e?.response ? console.log(e.response.data) : console.log(e);
    }
}
/* Lägger till rating på en produkt i databasen, baserat på produktId */
export async function addRating(productId, rating) {
    try{
        const response = await axios.post(`/products/${productId}/addRating`, rating);
        if(response.status === 200) return response.data;
        else {
            console.log(response.data);
            return null;
        }
    } catch (e) {
        e?.response ? console.log(e.response.data) : console.log(e);
    }
}
/* Tar bort rating från en produkt i databasen, baserat på ratingId */
export async function removeRating(ratingId) {
    try{
        const response = await axios.delete(`/ratings/${ratingId}`);
        if(response.status === 200) return response.data;
        else {
            console.log(response.data);
            return null;
        }
    } catch (e) {
        e?.response ? console.log(e.response.data) : console.log(e);
    }
}