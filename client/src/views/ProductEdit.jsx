import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useMemo, useState } from 'react';
import { getOne, create, update, remove } from '../services/ProductService';
import { getAll } from '../services/CategoryService';
import {
  Button,
  Chip,
  FormControl,
  InputLabel,
  NativeSelect,
  TextField,
  Typography,
  Container,
  Box,
} from '@mui/material';
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import DeleteIcon from "@mui/icons-material/Delete";
import SaveIcon from "@mui/icons-material/Save";

// Hanterar redigering och skapande av produkter
function ProductEdit() {
  // används för att hämta URL-parametrar
  const { id } = useParams();
  // används för navigering mellan sidor
  const navigate = useNavigate();
  // Används för att skapa en tom produkt.
  const emptyProduct = useMemo(
    () => ({ id: 0, name: '', price: '', description: '', imageUrl: '', categoryId: null }),
    []
  );
  // useState används för att hantera state i komponenter.
  const [product, setProduct] = useState(emptyProduct);
  const [categories, setCategory] = useState([]);
  // useEffect används för att köra kod när något ändras
  useEffect(() => {
    if (id) {
      getOne(id).then((product) => setProduct(product));
    } else {
      setProduct(emptyProduct);
    }
  }, [emptyProduct, id]);
  // useEffect används för att köra kod när något ändras
  useEffect(() => {
    getAll().then((category) => {
      console.log('Categories:', category);
      setCategory(category);
    });
  }, []);
  // useEffect används för att köra kod när något ändras
  useEffect(() => {
    if (categories.length > 0 && !product.categoryId) {
      setProduct((prev) => ({
        ...prev,
        categoryId: categories[0].id,
      }));
    }
  }, [categories, product.categoryId]);

  
  // Uppdaterar produktens data
  function onChange(e) {
    const name = e.target.name;
    const value = e.target.value;

    const newProduct = { ...product, [name]: value };
    setProduct(newProduct);
  }
  // Om produktens id är 0 skapas en ny produkt
  // Annars uppdateras den befintliga produkten
  function onSave() {
    if (product.id === 0) {
      create(product).then((response) => {
        navigate('/', { replace: true, state: response });
      });
    } else {
      update(product).then((response) =>
        navigate(`/products/${product.id}`, { replace: true, state: response })
      );
    }
  }

  // Tar bort en produkt baserat på id
  function onDelete() {
    remove(product.id).then((response) =>
      navigate('/', { replace: true, state: response })
    );
  }

  // Return med saker som textfält, chip, kategori lista,
  // knappar med dess funktionalitet.
  return (
    <Container>
      <Typography variant="h4" component="h2">Redigera Produkt</Typography>
      <Box mt={4}>
        <form>
          <Box>
            <TextField
              fullWidth
              margin="normal"
              onChange={onChange}
              value={product.name}
              name='name'
              id='name'
              label='Produktnamn: '
            />
          </Box>
          <Box>
            <TextField
              fullWidth
              margin="normal"
              onChange={onChange}
              value={product.price}
              name='price'
              id='price'
              label='Pris: '
            />
          </Box>
          <Box>
            <TextField
              fullWidth
              margin="normal"
              onChange={onChange}
              value={product.description}
              multiline
              minRows={5}
              name='description'
              id='description'
              label='Produktbeskrivning: '
            />
          </Box>
          <Box>
            <TextField
              fullWidth
              margin="normal"
              onChange={onChange}
              value={product.imageUrl}
              name='imageUrl'
              id='imageUrl'
              label='Bild URL: '
            />
          </Box>
          <Box>
            {product?.category && (
              <Chip key={product.category.id} label={product.category.name} />
            )}
          </Box>
          <Box>
            <FormControl maxWidth>
              <InputLabel variant='standard' htmlFor='uncontrolled-native' shrink>
                Kategori:
              </InputLabel>
              <NativeSelect
                // Denna bit av koden användes chatgpt:
                value={product.categoryId || ''}
                onChange={(e) =>
                  setProduct({ ...product, categoryId: +e.target.value })
                }
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
          </Box>
          <Box sx={{mt: 1}}display="flex">
            <Box flexGrow={1}>
            <Button startIcon={<ChevronLeftIcon/>} sx={{mr: 1}}variant='contained' onClick={() => navigate(-1)}>
              Tillbaka
            </Button>
            {id && (
              <Button startIcon={<DeleteIcon/>} onClick={onDelete} variant='contained' color='error'>
                {' '}
                Ta bort produkt{' '}
              </Button>
            )}
            </Box>
              <Button startIcon={<SaveIcon/>} onClick={onSave} variant='contained' color='success'>
                Spara
              </Button>
          </Box>
        </form>
      </Box>
    </Container>
  );
}
export default ProductEdit;