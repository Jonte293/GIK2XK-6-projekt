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

function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);


  useEffect(() => {
    getOne(id).then((product) => setProduct(product));
  }, [id]);


  function onDelete(id) {
    if (!id) {
      console.error('Rating ID is undefined');
      return;
    }
    removeRating(id).then((response) => {
      setProduct((prevProduct) => ({
        ...prevProduct,
        ratings: prevProduct.ratings.filter((rating) => rating.id !== id), 
      }));
      navigate({ replace: true, state: response }); 
    });
  }

  function onRatingAdd(rating) {
    addRating(product.id, rating)
      .then(() => getOne(id))
      .then((updatedProduct) => {
        console.log("Fetched updated product with new score:", updatedProduct);
        setProduct(updatedProduct);
      })
      .catch((err) => {
        console.error("Failed to add rating or fetch product:", err);
      });
  }

  const navigate = useNavigate();
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
