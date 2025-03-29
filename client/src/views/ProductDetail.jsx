import ProductItemLarge from '../components/ProductItemLarge';
import RatingForm from '../components/RatingForm';
import { useEffect, useState } from 'react';
import { getOne, addRating, removeRating } from '../services/ProductService';
import { useNavigate, useParams } from 'react-router-dom';
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import EditIcon from "@mui/icons-material/Edit";
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Rating,
} from '@mui/material';

// View som visar detaljerad produktsida, tar in komponenterna ProductItemLarge för produkten,
// RatingForm som är en formulär för att lämna betyg och rescension
// använder product.rating.map för att skriva ut en lista av produktens recensioner

function ProductDetail() {
  // används för att hämta URL-parametrar
  const { id } = useParams();
    // useState används för att hantera state i komponenter.
  const [product, setProduct] = useState(null);

  // useEffect används för att köra kod när något ändras, i detta fall id
  useEffect(() => {
    getOne(id).then((product) => setProduct(product));
  }, [id]);


// Funktion för att ta bort en recension, gör ett API anrop till funktionen removeRating
// uppdaterar product state genom att ta bort betyg från ratings
  function onDelete(id) {
    removeRating(id).then((response) => {
      setProduct((prevProduct) => ({
        ...prevProduct,
        ratings: prevProduct.ratings.filter((rating) => rating.id !== id), 
      }));
      navigate({ replace: true, state: response }); 
    });
  }

  // Funktion som lägger till recension och uppdaterar produktinformationen
  function onRatingAdd(rating) {
    addRating(product.id, rating)
      .then(() => getOne(id))
      .then((updatedProduct) => {
        setProduct(updatedProduct);
      })
  }

  const navigate = useNavigate();

  // returnerar all som vi vill ska synas i denna vy.
  // ProductItemLarge visar detaljvyn för produkten
  // Två knappar, en för att navigera tillbaka ett steg, en för att redigera produkten
  // Ratingform för att lämna recensioner, samt en lista med produktens ratings/recensioner

  return product ? (
    <Container>
      <ProductItemLarge product={product} />
      <Box display="flex"  mt={1}>
        <Box style={{ display: 'flex', gap: '1rem' }}>
      <Button variant='contained' startIcon={<ChevronLeftIcon />} sx={{mr: 2}} onClick={() => navigate(-1)}>
        Tillbaka
      </Button>
      </Box>
      <Button
        sx={{ ml: 'auto' }}
        variant='contained'
        color='error'
        startIcon={<EditIcon />}
        onClick={() => navigate(`/products/${product.id}/edit`)}
      >
        Redigera Produkt
      </Button>
      </Box>
    
     <RatingForm onSave={onRatingAdd}/>
      <ul>
        <li>
          {product.ratings.map((rating) => (
            <Card key={rating.id} sx={{ mb: 2, p: 1 }}>
              <CardContent sx={{ padding: '8px' }}>
                <div>
                  <strong>Recension av:</strong> {rating.user}
                </div>
                {rating.score && (
                  <Rating
                    value={rating.score}
                    readOnly
                    precision={1}
                    size='small'
                  />
                )}
                <div>{rating.review}</div>
              </CardContent>
              <Button onClick={() => onDelete(rating.id)} >
                Ta bort Recension
              </Button>
            </Card>
          ))}
        </li>
      </ul>
    </Container>
  ) : (
    <h3>Kunde inte hitta Produkt</h3>
  );
}
export default ProductDetail;
