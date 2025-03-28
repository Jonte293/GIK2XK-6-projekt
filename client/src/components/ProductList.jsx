import ProductItemSmall from './ProductItemSmall';
import { getAll } from '../services/ProductService';
import { useEffect, useState } from "react";
import { Grid2 } from '@mui/material';

// funktion som tar emot pathname och hämtar alla produkter med getall för att,
// sedan returnera produkterna i en grid med hjälp av productItemSmall där varje
// produkt som finns visas som ett card.
function ProductList({ pathname }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
      getAll(pathname).then((products) => {
          setProducts(products);
      });
  }, [pathname]);

  return (
    <Grid2 container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
      
      {products?.length > 0 ? (
        products.map((product) => (
          <Grid2  size={{ xs: 6, sm: 4, md: 3 }}>
            <ProductItemSmall className='.product-cardItem' product={product} />
            </Grid2>
        ))
        
      ) : (
        <h3>Kunde inte hämta produkt</h3>
      )}
     </Grid2>
  );
}

export default ProductList;
