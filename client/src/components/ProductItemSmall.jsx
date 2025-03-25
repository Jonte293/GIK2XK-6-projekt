import { Link } from 'react-router-dom';
import Category from './Category';


function ProductItemSmall({ product }) {
    return (
        <> 
        <Link to={`/products/${product.id}`}>
        <h3>{product.name}</h3>
        </Link>
        <p>Pris: {product.price}</p>
        <Link to={`/categories/${product.category.id}/products`}>
          {product.category.name}
        </Link>
      {/*   <p>Kategori: {product.category.name}</p> */}
        <img width="300" src={product.imageUrl} /> 
        {product.category && (
        <Category key={`category_${product.category.id}`} text={product.category.name} /> )}
              <p>{product.body}</p>
 
    </>
     );
}

export default ProductItemSmall;