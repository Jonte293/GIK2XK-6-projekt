import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getOne } from '../services/ProductService';
import { getAll } from '../services/CategoryService';
import {
  Button,
  Chip,
  FormControl,
  InputLabel,
  NativeSelect,
  TextField,
} from '@mui/material';

function ProductEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const emptyProduct = { name: '', price: '', description: '', imageUrl: '' };
  const [product, setProduct] = useState(emptyProduct);
  const [categories, setCategory] = useState([]);

  useEffect(() => {
    if (id) {
      getOne(id).then((product) => setProduct(product));
    } else {
      setProduct(emptyProduct);
    }
  }, [id]);

  useEffect(() => {
    getAll().then((category) => {
      console.log('Categories:', category);
      setCategory(category);
    });
  }, []);

  console.log(product);

  return (
    <form>
      <div>
        <TextField
          value={product.name}
          name='name'
          id='name'
          label='Produktnamn: '
        />
      </div>
      <div>
        <TextField
          value={product.price}
          name='price'
          id='price'
          label='Pris: '
        />
      </div>
      <div>
        <TextField
          value={product.description}
          multiline
          minRows={5}
          name='description'
          id='description'
          label='Produktbeskrivning: '
        />
      </div>
      <div>
        <TextField
          value={product.imageUrl}
          name='imageUrl'
          id='imageUrl'
          label='Bild URL: '
        />
      </div>
      <div>
        {product?.category && (
          <Chip key={product.category.id} label={product.category.name} />
        )}
      </div>
      <div>
        <FormControl maxWidth>
          <InputLabel variant='standard' htmlFor='uncontrolled-native' shrink>
            Kategori:
          </InputLabel>
          <NativeSelect
            // Denna bit av koden användes chatgpt:
            /*  Promt till chatgpt:   this chip worked earlier.

      {product?.category && (
  <Chip key={product.category.id} label={product.category.name} />

Can i do something very similar with the nativeselect? */
            value={product?.category?.id || ''}
            onChange={(e) => {
              const category = categories.find((c) => c.id === +e.target.value);
              setProduct({ ...product, category });
            }}
            inputProps={{
              name: 'age',
              id: 'uncontrolled-native',
            }}
          >
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </NativeSelect>
        </FormControl>
      </div>
      <Button variant='contained' onClick={() => navigate(-1)}>
        Tillbaka
      </Button>
      {id && (
        <Button variant='contained' color='error'>
          {' '}
          Ta bort produkt{' '}
        </Button>
      )}
      <Button variant='contained' color='success'>
        Spara
      </Button>
    </form>
  );
}
export default ProductEdit;
