import axios from './api';

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

export async function getOne(id) {
    console.log("Fetching cart with ID:", id); // Debugging
    if (!id) {
        console.error("Cart ID is missing!");
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

export async function addProduct(cartId, product) {
    try{
        const response = await axios.post(`/carts/${cartId}/addProduct`, product);
        if(response.status === 200) return response.data;
        else {
            console.log(response.data);
            return null;
        }
    } catch (e) {
        e?.response ? console.log(e.response.data) : console.log(e);
    }
}

export async function removeCartProduct(cartId, productId) {
    try {
        const response = await axios.delete(`/carts/${cartId}/removeProduct`, {
            data: { cart_id, product_id }
        });

        if (response.status === 200) return response.data;
        else {
            console.log(response.data);
            return null;
        }
    } catch (e) {
        e?.response ? console.log(e.response.data) : console.log(e);
    }
}
