import { update, removeCartProduct } from '../services/CartService';
import {
  Chip,
  Button,
  Modal,
  Paper,
  Box,
  Typography,
  CardMedia,
} from '@mui/material';

function CartProduct({ cart, updateCart }) {
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
          <Typography variant="h4">Användare: {cart.user?.username || "Okänd användare"}</Typography>
            {
            
            }
            <Box
              sx={{
                my: 2,
                borderTop: '1px solid #ccc',
                marginTop: '10px',
                paddingTop: '10px',
              }}
            ></Box>
            {cart.products.map(
              (product) => (
                console.log(product.imageUrl),
                (
                  <Box
                    key={`product-${product.name}`}
                    sx={{
                      marginBottom: '10px',
                      paddingBottom: '10px',
                      borderBottom: '1px solid #ccc',
                    }}
                  >
                    <Typography variant='h6'>
                      Produkt: {product.name}
                    </Typography>
                    <Typography variant='h6'>
                      Antal: {product.quantity}
                    </Typography>
                    <Typography variant='h6'>
                      Pris: {product.price * product.quantity} SEK
                    </Typography>
                    <Button size='small'
                      sx={{ ml: 1, border: '1px solid', borderRadius: '10px', fontSize: '20px'}}
                      onClick={() => handleQuantityChange(product, -1)}
                    >
                      -
                    </Button>
                    <Button size='small'
                      sx={{ ml: 1, border: '1px solid', borderRadius: '10px', fontSize: '20px'}}
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
                  
                )
              )
            )}
            <Typography variant='h6'>
                Totaltpris alla produkter:{' '}
                {cart.products.reduce(
                  (sum, p) => sum + p.price * p.quantity,
                  0
                )}{' '}
                kr
              </Typography>
          </Box>
        </>
      ) : (
        <p>✅ Betalning genomförd! Din beställning är på väg 🚚</p>
      )}
    </Paper>
  );
}
CardMedia;
export default CartProduct;
