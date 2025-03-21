import { Link } from 'react-router-dom';
import CategoryItem from './CategoryItem';


function ProductItemSmall({ product }) {
    return (
        <> 
        <Link to={`/products/${product.id}`}>
        <h3>{product.name}</h3>
        </Link>
        <p>Pris: {product.price}</p>
        <p>Kategori: {product.category.name}</p>
        <img width="300" src={product.imageUrl} /> 
              {product.category.length > 0 &&
                product.category.map((category) => <CategoryItem key={category} text={category} />)}
              <p>{product.body}</p>
 
    </>
     );
}

export default ProductItemSmall;