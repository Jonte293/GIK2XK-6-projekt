import { useState } from "react";
import { update, removeCartProduct } from "../services/CartService"; 

function CartProduct({ cart }) {

    const [cartState, setCartState] = useState(cart);

    const handleQuantityChange = async (product, quantityChange) => {
        const updatedProducts = cartState.products.map((p) =>
            p.name === product.name
                ? { ...p, quantity: Math.max(1, p.quantity + quantityChange) }
                : p
        );

        const updatedCart = { ...cartState, products: updatedProducts };
        setCartState(updatedCart);

        await update(updatedCart.id, updatedCart);
        console.log('Updated cart after quantity change:', updatedCart);
    };

    const handleRemoveProduct = async (product) => {
        const updatedProducts = cartState.products.filter((p) => p.name !== product.name);
        const updatedCart = { ...cartState, products: updatedProducts };
        setCartState(updatedCart);

        // Uppdatera servern
        await removeCartProduct(cartState.id, updatedCart);
        console.log('Updated cart after product removal:', updatedCart);
    };

    return (
      <div style={{ border: "1px solid black", margin: "5px", padding: "10px" }}>
        <h4>Kundvagns id: {cartState.id}</h4>
        <h4>Användare: {cartState.user.username}</h4>
        <ul>
          {cartState.products.map((product, index) => (
            <li key={index} style={{ marginBottom: "10px" }}>
              <p>Produkt: {product.name}</p>
              <p>Antal: {product.quantity}</p>
              <p>Pris: ${product.price}</p>
              <button onClick={() => handleQuantityChange(product, -1)}>-</button>
              <button onClick={() => handleQuantityChange(product, 1)}>+</button>
              <button onClick={() => handleRemoveProduct(product)}>Ta bort</button>
            </li>
          ))}
        </ul>
      </div>
    );
}

export default CartProduct;
