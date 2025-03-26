import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { update, removeCartProduct } from "../services/CartService"; 
import { Chip } from '@mui/material';
import { getOne } from "../services/CartService";

function CartProduct({ cart }) {
    const { id } = useParams();
    const [cartState, setCartState] = useState(cart);

    useEffect(() => {
      const fetchCart = async () => {
        const cartData = await getOne(id); // Hämta kundvagnens data baserat på ID
        if (cartData) {
          setCartState(cartData); // Sätt kundvagnen i state
        } else {
          console.error("Failed to fetch cart");
        }
      };
      fetchCart();
  }, [id]);

    const handleQuantityChange = async (product, quantityChange) => {
        const updatedProducts = cartState.products.map((p) =>
            p.name === product.name
                ? { ...p, quantity: Math.max(1, p.quantity + quantityChange) }
                : p
        );

        const updatedCart = { ...cartState, products: updatedProducts };
        setCartState(updatedCart);

        if (updatedCart.id) {
          await update(updatedCart);
          console.log('Updated cart after quantity change:', updatedCart);
      } else {
          console.error('No valid cartId found');
      }
    };

    async function onProductDelete(productToDelete){
      const newProducts = cart.products.filter((product) => product.id !== productToDelete.id);

      setCartState({...cartState, products: newProducts});

      const hardcodedCartId = 1;

      try {
        // Försök att ta bort produkten från servern
        await removeCartProduct(hardcodedCartId, productToDelete.id);
        console.log('Produkt borttagen från kundvagnen:', productToDelete);
      } catch (error) {
        console.error('Fel vid borttagning av produkt från kundvagn:', error);
      }

      
    }

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
              <Chip onDelete={() => onProductDelete(product)} key={product.id} label={"ta bort"} />
            </li>
          ))}
        </ul>
      </div>
    );
}

export default CartProduct;
