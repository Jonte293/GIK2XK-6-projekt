import Category from './Category';
import { getOne } from '../services/ProductService';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
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

function ProductItemLarge() {
  const { id } = useParams();
  console.log(id);
  const [product, setProduct] = useState(null);

  useEffect(() => {
    getOne(id).then((product) => setProduct(product));
  }, [id]);

  // ChatGpt lösning, frågade om att räkna ut genomsnittligt betyg
  const scores =
    product?.ratings
      ?.map((rating) => rating.score)
      .filter((score) => score !== null) || [];
  const averageRating = scores.length
    ? scores.reduce((a, b) => a + b, 0) / scores.length
    : 0;

  return product ? (
    <Paper sx={{ my: 4, p: 4, borderRadius: 2 }} elevation={3}>
      <Box>
        <Typography variant='h4'>{product.name}</Typography>
        <Typography
        variant='h6'
        >{product.price} kr</Typography>

        <Card elevation={0}>
          <CardMedia
            sx={{ width: 350, height: 350 }}
            component='img'
            image={product.imageUrl}
          />
          <CardContent>
            <Typography sx={{ my: 2 }} variant='p'>
              {product.description}
            </Typography>
            {product.category && (
              <Category
                key={`category_${product.category.id}`}
                id={product.category.id}
                text={product.category.name}
              />
            )}
          </CardContent>
        </Card>
      </Box>
      <Rating value={averageRating} precision={0.5} readOnly />
      <AddToCartButton product={product}></AddToCartButton>
    </Paper>
  ) : (
    <h3>Kunde inte hitta Produkt</h3>
  );
}
AddToCartButton;
export default ProductItemLarge;
Box;
