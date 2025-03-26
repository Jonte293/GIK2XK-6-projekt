import { useParams, useLocation, useNavigate, Link } from 'react-router-dom';
import ProductList from '../components/ProductList';
import { Box, Button, Chip, Container } from '@mui/material';
import CategoryList from '../components/CategoryList';
import Inventory2Icon from '@mui/icons-material/Inventory2';
function Products() {
  const navigate = useNavigate();

  console.log(useParams(), useLocation());
  const location = useLocation();

  return (
    <Container>
      <Box display='flex' alignItems="center" gap={2} mt={-2}>
        <h2>Kategorier: </h2>
        <Link to={`/products`}>
      <Chip icon={<Inventory2Icon/>} label={'Alla Produkter'}></Chip>
    </Link>
      <CategoryList/>
        <Button
          sx={{ ml: 'auto'}}
          variant='contained'
          color='success'
          onClick={() => navigate(`/products/new`)}
        >
          Skapa ny produkt
        </Button>
      </Box>
      <ProductList pathname={location.pathname} />
    </Container>
  );
}
export default Products;
