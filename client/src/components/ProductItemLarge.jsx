import Category from './Category';
import { useMemo} from 'react';
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Paper,
  Rating,
  Typography,
} from '@mui/material';
import AddToCartButton from './AddToCartButton';

// ProductItemLarge komponenten gör så att vi får en mer detaljrik vy på den produkt man klickat på

function ProductItemLarge({ product }) {
  // Beräknar genomsnittligt betyg , använder useMemo för att endast räkna om när produkten ändras
  const averageRating = useMemo(() => {
    const scores = product?.ratings?.map(r => r.score).filter(Boolean) || [];
    return scores.length
      ? scores.reduce((a, b) => a + b, 0) / scores.length
      : 0;
  }, [product]);

// returnera produkten i form av ett card innuti paper. där information om produkten hämtas och skrivs ut 
  return product ? (
    <Paper sx={{ my: 2, p: 4, borderRadius: 2 }} elevation={3}>
    <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'row-reverse' }}>
      <Card elevation={0}>
        <CardMedia
          sx={{ width: '100%', height: 200, minHeight: 350, objectFit: 'contain' }}
          component="img"
          image={product.imageUrl}
          alt={product.name}
        />
      </Card>
      <Box sx={{ flexGrow: 1 }}>
        <Typography variant="h4">{product.name}</Typography>
        <Typography variant="h6">{product.price} kr</Typography>
        {product.category && (
            <Category
              key={`category_${product.category.id}`}
              id={product.category.id}
              text={product.category.name}
            />
          )}

        <CardContent>
          <Typography sx={{ ml: -2, mb: 20 }} variant="body1">
            {product.description}
          </Typography>
          
        </CardContent>
      </Box>
    </Box>
    <Typography variant="h6">
      Lägg vara i kundvagn:
    <AddToCartButton product={product}/>
    </Typography>
  // Averagerating skrivs ut med Mui Rating 
    <Rating 
    sx={{mr: 5}}
    value={averageRating} precision={0.5} readOnly />
  </Paper>
  ) : (
    <h3>Kunde inte hitta Produkt</h3>
  );
}
AddToCartButton;
export default ProductItemLarge;
Box;
