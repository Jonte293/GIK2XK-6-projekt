import { useState } from 'react';
import { addProduct } from '../services/CartService'
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart'; 
import { Button } from '@mui/material';

const AddToCartButton = ({ product }) => {

    const [added, setAdded] = useState(false);

    const handleAddToCart = () => {
      const cartId = 1; // eller hämta dynamiskt om du vill
      const productToAdd = {
        name: product.name,
        quantity: 1
      };
    
      addProduct(cartId, productToAdd).then(() => {
        setAdded(true);
        setTimeout(() => setAdded(false), 2000);
      });
    };

  return (
        <Button
          startIcon={<AddShoppingCartIcon 
            fontSize="large"/>}
          onClick={handleAddToCart}
          color={added ? 'success' : 'primary'}

        >
        </Button> 
  );

};

export default AddToCartButton;