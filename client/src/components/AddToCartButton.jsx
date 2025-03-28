import { useState } from 'react';
import { addProduct } from '../services/CartService'
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart'; 
import { Button } from '@mui/material';

/* Skapar en komponent för en knapp som kan lägga till produkter i kundvagen,
   Skickar en begäran till backend för att lägga till produkten i kundvagn */


/* useState sätts till false som "standard". handleAddtoCart sätter upp en produkt med name och quantity.
   addProduct skickar begäran till backend för att lägga till produkt i cart(vilket blir en update på cart),
   sedan ändras useState till true  */
const AddToCartButton = ({ product }) => {

    const [added, setAdded] = useState(false);

    const handleAddToCart = () => {
      const cartId = 1; // Just nu hårdkodat id
      const productToAdd = {
        name: product.name,
        quantity: 1
      };
    
      addProduct(cartId, productToAdd).then(() => {
        setAdded(true);
        setTimeout(() => setAdded(false), 2000);
      });
    };

    /* Returnerar knappen (importerad från mui), onClick körs funktionen handleAddToCart */
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