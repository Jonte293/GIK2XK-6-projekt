function ProductItemSmall({ product }) {
    return (
        <> 
        <h3>{product.name}</h3>
        <p>Pris: {product.price}</p>
        <p>Kategori: {product.category.name}</p>
        <img width="300" src={product.imageUrl} />  
 
    </>
     );
}

export default ProductItemSmall;