import Category from "./Category";


function ProductItemLarge({ product }) {
  return (
    <div style={{ border: '1px solid black' }}>
      <h3>{product.name}</h3>
      <h3>{product.price}</h3>
      {product.category && (
        <Category key={`category_${product.category.id}`} text={product.category.name} /> )}
        <div>
          <img src={product.imageUrl} height="200" />
        </div>
    </div>
  );
}

export default ProductItemLarge;
