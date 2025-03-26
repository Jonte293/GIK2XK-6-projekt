import ProductItemLarge from '../components/ProductItemLarge';
import HoverRating from '../components/HoverRating';
import { useEffect, useState } from 'react';
import { getOne, addRating, removeRating } from '../services/ProductService';
import { useNavigate, useParams } from 'react-router-dom';
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import EditIcon from "@mui/icons-material/Edit";
import EditNoteIcon from '@mui/icons-material/EditNote';
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Paper,
  Rating,
  TextField,
} from '@mui/material';

function ProductDetail() {
  const { id } = useParams();
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [product, setProduct] = useState(null);

  const emptyRating = {
    id: 0,
    rating: 0,
    review: '',
    userId: 3,
  };
  const [rating, setRating] = useState(emptyRating);
  console.log(id);

  useEffect(() => {
    getOne(id).then((product) => setProduct(product));
  }, [id]);

  function onChange(e) {
    const name = e.target.name;
    const value = e.target.value;

    const newRating = { ...rating, [name]: value };
    setRating(newRating);
  }

  function onSave() {
    console.log('Sending rating:', rating, 'for product:', product.id);

    addRating(product.id, rating).then((response) => {
      console.log('Recension sparad:', response);
      setRating({ review: '', score: 0 }),
      window.location.reload()
    });
  }
  function onDelete(id) {
    if (!id) {
      console.error('Rating ID is undefined');
      return;
    }
    removeRating(id).then((response) =>
      navigate( { replace: true, state: response }),
      window.location.reload()
    );
  }

  /*   useEffect(() => {
    addRating().then(() => {
      setRating(product.rating);
    })
  }, [product.rating]);
 */

  const navigate = useNavigate();
  return product ? (
    <Container>
      <ProductItemLarge product={product} />
      <Box display="flex"  mt={1}>
      <Button variant='contained' startIcon={<ChevronLeftIcon />} sx={{mr: 2}} onClick={() => navigate(-1)}>
        Tillbaka
      </Button>


      <Button
        startIcon={<EditNoteIcon />}
        variant='contained'
        onClick={() => setShowReviewForm((prev) => !prev)}
      >
        {showReviewForm ? 'Stäng Recension' : 'Skriv Recension'}
      </Button>
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
      <div>
        {showReviewForm && (
          <Box sx={{ mt: 2, mb: 2 }}>
            <TextField
              label='Skriv din recension'
              name='review'
              fullWidth
              multiline
              rows={5}
              value={product.review}
              onChange={onChange}
            />
            <Button onClick={onSave} variant='contained'>
              Publicera Rescension
            </Button>

            {/* Fick hjälp av chatgpt med att ta värdet från HoverRating och lägga in i rating.score */}
            <HoverRating
              value={Number(rating.score)}
              onChange={(e, newValue) => {
                setRating((prev) => ({
                  ...prev,
                  score: newValue,
                }));
              }}
            />
          </Box>
        )}
      </div>

      <ul>
        <li>
          {product.ratings.map((rating) => (
            <Card key={rating.id} sx={{ mb: 2, mr: 6, p: 1 }}>
              
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

/* import ProductItemLarge from "../components/ProductItemLarge";
import { Button} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ReviewForm from "../components/ReviewForm";
import Rating from "../components/Rating";

function ProductDetail() {
    const product = 
    {
        "id": 4,
        "name": 'Nocco Ramonade',
        "price": '20.00',
        "description": null,
        "imageUrl":
          'https://www.sportkost.se/pub_images/original/nocco_focus_ramonade_330ml.jpg',
        "createdAt": '2025-03-20T13:40:57.000Z',
        "updatedAt": '2025-03-20T13:45:06.000Z',
        "category": {
            "id": 3,
            "name": "Energi dryck"
        },
        "ratings": [
            {
                "score": 5,
                "review": "Bästa flingerna!!!",
                "user": "Pierre",
                "createdAt": "2025-03-21T12:01:23.000Z"
            },
            {
                "score": 4,
                "review": "Sämsta flingerna!!!",
                "user": "Pierre",
                "createdAt": "2025-03-21T11:57:57.000Z"
            }
        ]
    };

    const navigate = useNavigate();
    return ( 
    <div>
        <ProductItemLarge product={product}/>
        <Button onClick={() => navigate(-1)}>Tillbaka</Button>
        <Button onClick={() => navigate(`/products${product.id}/edit`)}>Edit</Button>
        <Button>Lägg i varukorg</Button>
        <ReviewForm />
        {product.ratings && 
            product.ratings.map((rating, i) => 
        ( <Rating key={`rating_${i}`} rating={rating} />
))}
    </div>
    )
}


export default ProductDetail;
 */
