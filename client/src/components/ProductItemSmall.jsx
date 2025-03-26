import { Link, useNavigate } from 'react-router-dom';
import Category from './Category';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardHeader,
  CardContent,
  Typography,
  Rating,
  CardMedia,
} from '@mui/material';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

function ProductItemSmall({ product }) {
  // ChatGpt lösning, frågade om att räkna ut genomsnittligt betyg
  const scores =
    product?.ratings
      ?.map((rating) => rating.score)
      .filter((score) => score !== null) || [];
  const averageRating = scores.length
    ? scores.reduce((a, b) => a + b, 0) / scores.length
    : 0;

  const navigate = useNavigate();
  return (
    <>
      <Card variant='outlined' sx={{ mb: 4 }}>
        <CardMedia
          sx={{ width: 250, height: 250 }}
          component='img'
          image={product.imageUrl}
        />
        <Rating value={averageRating} precision={0.5} readOnly />
        <CardHeader
          title={
            <Typography
              variant='p'
              sx={{
                fontWeight: 'bold',
              }}
            >
              {<Link to={`/products/${product.id}`}> {product.name}</Link>}
            </Typography>
          }
          subheader={`Pris: ${product.price}`}
        />
        <CardContent>
          <Box mb={2}>
            {/* <p>{}</p> */}
            {product.category && (
              <Category
                key={`category_${product.category.id}`}
                id={product.category.id}
                text={product.category.name}
              />
            )}
          </Box>
          <Typography variant='body2'>{product.description}</Typography>
        </CardContent>
        <CardActions sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button
            onClick={() => navigate(`/products/${product.id}`)}
            endIcon={<ChevronRightIcon />}
          >
            Till produkt
          </Button>
        </CardActions>
      </Card>
    </>
  );
}

{
  /*   <p>Kategori: {product.category.name}</p> */
}
{
  /* {<img width="300" src={product.imageUrl} /> } */
}

export default ProductItemSmall;
