import { update, removeCartProduct } from '../services/CartService';
import { Chip, Button, Modal, Paper, Box, Typography } from '@mui/material';

function CartProduct({ cart, updateCart }) {
  /* const [cartState, setCart] = useState(cart); */

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

    if (updatedCart.id) {
      await update(updatedCart);
      console.log('Updated cart after quantity change:', updatedCart);
    } else {
      console.error('No valid cartId found');
    }
    updateCart(updatedCart);
  };

  async function onProductDelete(productToDelete) {
    console.log('🛑 Försöker radera produkt:', productToDelete);

    if (!productToDelete || !productToDelete.id) {
      console.error('❌ Fel: Produkt saknar id!', productToDelete);
      return;
    }

    try {
      await removeCartProduct(cart.id, productToDelete.id);
      console.log('✅ Produkt borttagen:', productToDelete);

      // ✅ Uppdatera state direkt så att produkten försvinner från listan
      const updatedCart = {
        ...cart,
        products: cart.products.filter(
          (product) => product.id !== productToDelete.id
        ),
      };
      updateCart(updatedCart);
    } catch (error) {
      console.error('❌ Fel vid borttagning:', error);
    }
  }

  return (
    <Paper sx={{ my: 4, p: 4, borderRadius: 2 }} elevation={3}>
      {cart ? (
        <>
          <Box sx={{ mb: 4 }}>
            <h4>Kundvagns id: {cart.id}</h4>
            <h4>Användare: {cart.user?.username || 'Okänd användare'}</h4>

            {cart.products.map((product) => (
              <Box
                key={`product-${product.name}`}
                style={{ marginBottom: '10px' }}
              >
                <Typography variant='h6'>Produkt: {product.name}</Typography>
                <Typography variant='h6'>Antal: {product.quantity}</Typography>
                <Typography variant='h6'>Pris: ${product.price}</Typography>
                {/*                     <p>Produkt: {product.name}</p>
                    <p>Antal: {product.quantity}</p>
                    <p>Pris: ${product.price}</p>
                    <button onClick={() => handleQuantityChange(product, -1)}>-</button>
                    <button onClick={() => handleQuantityChange(product, 1)}>+</button>
                    <Chip onDelete={() => onProductDelete(product)} key={`chip-${product.name}`} label={product.name} /> */}
                <Button
                  sx={{ ml: 1, border: '1px solid', borderRadius: '10px' }}
                  onClick={() => handleQuantityChange(product, -1)}
                >
                  -
                </Button>
                <Button
                  sx={{ ml: 1, border: '1px solid', borderRadius: '10px' }}
                  onClick={() => handleQuantityChange(product, 1)}
                >
                  +
                </Button>
                <Chip
                  sx={{ ml: 1 }}
                  onDelete={() => onProductDelete(product)}
                  key={`chip-${product.name}`}
                  label={product.name}
                />
              </Box>
            ))}
          </Box>
        </>
      ) : (
        <p>✅ Betalning genomförd! Din beställning är på väg 🚚</p>
      )}
    </Paper>
  );
}

export default CartProduct;
