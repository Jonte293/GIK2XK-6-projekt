import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { update, removeCartProduct } from "../services/CartService"; 
import { Chip } from '@mui/material';
import { getOne } from "../services/CartService";

function CartProduct(/* { cart } */) {
    const { id } = useParams();
    const navigate = useNavigate();
    /* const [cartState, setCartState] = useState(cart); */

    const emptyCart = {
      id: 0,
      products: [],
      user: { username: "" }
    };

    const [cart, setCart] = useState(emptyCart);

    useEffect(() => {
      if (id) {
        getOne(id).then((cartData) => setCart(cartData));
      } else {
        setCart(emptyCart);
      }
    }, [id]);

    /* useEffect(() => {
      const fetchCart = async () => {
        const cartData = await getOne(id); // Hämta kundvagnens data baserat på ID
        if (cartData) {
          setCartState(cartData); // Sätt kundvagnen i state
        } else {
          console.error("Failed to fetch cart");
        }
      };
      fetchCart();
  }, [id]); */

    const handleQuantityChange = async (product, quantityChange) => {
        const updatedProducts = cart.products.map((p) =>
            p.id === product.id
                ? { ...p, quantity: Math.max(1, p.quantity + quantityChange) }
                : p
        );

        const updatedCart = { ...cart, products: updatedProducts };
        setCart(updatedCart);

        if (updatedCart.id) {
          await update(updatedCart);
          console.log('Updated cart after quantity change:', updatedCart);
      } else {
          console.error('No valid cartId found');
      }
    };

    async function onProductDelete(productToDelete) {
      console.log("🛑 Försöker radera produkt:", productToDelete);
    
      if (!productToDelete || !productToDelete.id) {
        console.error("❌ Fel: Produkt saknar id!", productToDelete);
        return;
      }
    
      try {
        await removeCartProduct(cart.id, productToDelete.id);
        console.log("✅ Produkt borttagen:", productToDelete);
    
        // ✅ Uppdatera state direkt så att produkten försvinner från listan
        setCart(prevCart => ({
          ...prevCart,
          products: prevCart.products.filter(product => product.id !== productToDelete.id)
        }));
    
      } catch (error) {
        console.error("❌ Fel vid borttagning:", error);
      }
    }
    

    return (
      <div style={{ border: "1px solid black", margin: "5px", padding: "10px" }}>
        <h4>Kundvagns id: {cart.id}</h4>
        <h4>Användare: {cart.user?.username || "Okänd användare"}</h4>
        <ul>
          {cart.products
            .filter((product) => product.name) // Filtrerar bort produkter utan id
            .map((product) => (
              <li key={`product-${product.name}`} style={{ marginBottom: "10px" }}>
                <p>Produkt: {product.name}</p>
                <p>Antal: {product.quantity}</p>
                <p>Pris: ${product.price}</p>
                <button onClick={() => handleQuantityChange(product, -1)}>-</button>
                <button onClick={() => handleQuantityChange(product, 1)}>+</button>
                <Chip onDelete={() => onProductDelete(product)} key={`chip-${product.name}`} label={product.name} />
              </li>
            ))}
        </ul>
      </div>
    );
}

export default CartProduct;
