function ProductItemSmall({ product }) {
    return (
        <> 
        <li>
        <h3>{product.name}</h3>
        <p>Pris: {product.price}</p>
        <p>Kategori: {product.category.name}</p>  
        </li>   
    </>
     );
}

export default ProductItemSmall;