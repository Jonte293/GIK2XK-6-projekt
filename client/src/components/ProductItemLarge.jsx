import Category from "./Category";
import { getOne } from '../services/ProductService';
import { useParams } from "react-router-dom";
import { useEffect, useState } from 'react';
import { Rating } from "@mui/material";

function ProductItemLarge() {

  const { id } = useParams();
  console.log(id);
  const [product, setProduct] = useState(null);

  useEffect(() => {
    getOne(id).then((product) => setProduct(product));
  }, [id]);

// ChatGpt lösning, frågade om att räkna ut genomsnittligt betyg
  const scores = product?.ratings?.map(rating => rating.score).filter(score => score !== null) || [];
  const averageRating = scores.length ? scores.reduce((a, b) => a + b, 0) / scores.length : 0;

  return product ? (

    
    <div style={{ border: '1px solid black' }}>
      <h3>{product.name}</h3>
      <h3>{product.price}</h3>
      <p>Produkbeskrivning {product.description}</p>
      {product.category && (
        <Category key={`category_${product.category.id}`} id={product.category.id} text={product.category.name} /> )}
              <p>{product.body}</p>
              <Rating value={averageRating} precision={0.5} readOnly />
        <div>
          <img src={product.imageUrl} height="200" />
        
        </div>
    </div>
  ) : (
    <h3>Kunde inte hitta Produkt</h3>
  );
}

export default ProductItemLarge;
