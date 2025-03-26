import { Link } from 'react-router-dom';
import Category from './Category';
import Rating from '@mui/material/Rating';

function ProductItemSmall({ product }) {
    
    // ChatGpt lösning, frågade om att räkna ut genomsnittligt betyg
    const scores = product.ratings?.map(r => r.score).filter(score => score !== null) || [];
    const averageRating = scores.length ? scores.reduce((a, b) => a + b, 0) / scores.length : 0;
    return (
        <> 
        <Link to={`/products/${product.id}`}>
        <h3>{product.name}</h3>
        </Link>

        <Rating value={averageRating} precision={0.5} readOnly />

        <p>Pris: {product.price}</p>
        {product.category && (
        <Category key={`category_${product.category.id}`} id={product.category.id} text={product.category.name} /> )}
              <p>{product.body}</p>
      {/*   <p>Kategori: {product.category.name}</p> */}
        <img width="300" src={product.imageUrl} /> 
    </>
     );
}

export default ProductItemSmall;