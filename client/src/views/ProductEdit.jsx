import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getOne } from '../services/ProductService';
import { Chip, TextField } from '@mui/material';

function ProductEdit() {
  const { id } = useParams();

  const [product, setProduct] = useState(null);

  useEffect(() => {
    if (id) {
      getOne(id).then((product) => setProduct(product));
    } else {
      setProduct(null);
    }
  }, [id]);

  console.log(product);
  return (
    <form>
      <div>
        <TextField name='title' id='title' label='Produktnamn: ' />
      </div>
      <div>
        <TextField name='price' id='price' label='Pris: ' />
      </div>
      <div>
        <TextField
          multiline
          minRows={5}
          name='description'
          id='description'
          label='Produktbeskrivning: '
        />
      </div>
      <div>
        <TextField name='imageUrl' id='imageUrl' label='Bild URL: ' />
      </div>
      <div>
      {product?.category && (
  <Chip key={product.category.id} label={product.category.name} />
)}</div> 
    </form>
  );
}

export default ProductEdit;
