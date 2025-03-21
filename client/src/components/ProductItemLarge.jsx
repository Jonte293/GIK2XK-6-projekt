import CategoryItem from "./CategoryItem";

function ProductItemLarge({ product }) {
  return (
    <div>
      <h3>{product.name}</h3>
      {product.categories &&
        product.categories.map((categories) => 
          <CategoryItem key={`category_${categories}`} text={categories} />
        )}
    </div>
  );
}

export default ProductItemLarge;
