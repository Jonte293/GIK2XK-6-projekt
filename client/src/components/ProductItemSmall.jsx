import { Link, useNavigate } from 'react-router-dom';
import Category from './Category';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import AddToCartButton from './AddToCartButton';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Typography,
  Rating
} from '@mui/material';


//productItemSmall gör så att varje produkt i productlist blir till ett card
// där vi har inkluderat bild, knappar och länkar, även så att rating syns och dess medelbetyg

function ProductItemSmall({ product }) {
  const navigate = useNavigate();
  // Räkna ut medelbetyg
  const scores =
    product?.ratings?.map((rating) => rating.score).filter((score) => score !== null) || [];
  const averageRating = scores.length
    ? scores.reduce((a, b) => a + b, 0) / scores.length
    : 0;

  return (
    <Card
      variant='outlined'
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        height: '100%',
        maxWidth: 500,
        width: '100%',
        border: '1px solid #ccc',
        borderRadius: 2,
        p: 2,
        boxSizing: 'border-box'
      }}
    >
      <Link to={`/products/${product.id}`}>
        <CardMedia
          component='img'
          sx={{ width: '100%', height: 200, minHeight: 250, objectFit: 'contain' }}
          image={product.imageUrl}
          alt={product.name}
        />
      </Link>

      <Box ml={1}>
        <Rating value={averageRating} precision={0.5} readOnly />
      </Box>

      <CardHeader
        title={
          <Typography variant='p' sx={{ fontWeight: 'bold' }}>
            <Link to={`/products/${product.id}`}>{product.name}</Link>
          </Typography>
        }
        subheader={`Pris: ${product.price}`}
      />

      <CardContent>
        <Box mb={1} mt={-3}>
          {product.category && (
            <Category
              key={`category_${product.category.id}`}
              id={product.category.id}
              text={product.category.name}
            />
          )}
        </Box>
        <Typography variant='p'>{product.description}</Typography>
      </CardContent>

      <CardActions sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <AddToCartButton 
         product={product}></AddToCartButton>
        <Button
          onClick={() => navigate(`/products/${product.id}`)}
          endIcon={<ChevronRightIcon />}
        >
          Till produkt
        </Button>
      </CardActions>
    </Card>
  );
}

export default ProductItemSmall;