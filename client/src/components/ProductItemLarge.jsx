import Category from './Category';
import { useParams } from 'react-router-dom';
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

function ProductItemLarge({ product }) {
  const { id } = useParams();
  console.log(id);
 /*  const [product, setProduct] = useState(null); */

/*   useEffect(() => {
    getOne(id).then((product) => setProduct(product));
  }, [id]); */

  // ChatGpt lösning, frågade om att räkna ut genomsnittligt betyg
  const averageRating = useMemo(() => {
    const scores = product?.ratings?.map(r => r.score).filter(Boolean) || [];
    return scores.length
      ? scores.reduce((a, b) => a + b, 0) / scores.length
      : 0;
  }, [product]);

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
