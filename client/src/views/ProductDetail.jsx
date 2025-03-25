import ProductItemLarge from "../components/ProductItemLarge";
import { useEffect, useState } from "react";
import { getOne } from '../services/ProductService';
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@mui/material";

function ProductDetail() {
  const { id } = useParams();
  console.log(id)
  const [product, setProduct] = useState(null);

  console.log("Product ID from useParams:", id);

  useEffect(() => {
    getOne(id).then((product) => setProduct(product));
  }, [id]);
  
  const navigate = useNavigate();

return product ? (
<div>
<ProductItemLarge product={product}/>
<Button onClick={() => navigate(-1)}>Tillbaka</Button>
</div>
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