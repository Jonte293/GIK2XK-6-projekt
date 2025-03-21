import ProductItemLarge from "../components/ProductItemLarge";
import { Button} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ReviewForm from "../components/ReviewForm";
import Rating from "../components/Rating";

function ProductDetail() {
    const product = {
        "id": 1,
        "name": "noccoXTREME",
        "price": "18.90",
        "description": null,
        "imageUrl": null,
        "createdAt": "2025-03-19T13:37:11.000Z",
        "updatedAt": "2025-03-19T13:37:11.000Z",
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
                "score": 5,
                "review": "Bästa flingerna!!!",
                "user": "Pierre",
                "createdAt": "2025-03-21T11:57:57.000Z"
            }
        ]
    };

    const navigate = useNavigate();
    return( 
    <div>
        <ProductItemLarge product={product}/>
        <Button onClick={() => navigate(-1)}>Tillbaka</Button>
        <Button onClick={() => navigate(`/products${product.id}/edit`)}></Button>
        <Button>Lägg i varukorg</Button>
        <ReviewForm />
        {product.ratings && 
            product.ratings.map((rating, i) => ( <Rating key={`rating_${i}`}
        rating={rating} />
        ))} 
    </div>
    )
}


export default ProductDetail;
