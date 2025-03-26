import { useParams, useLocation, useNavigate } from 'react-router-dom';
import ProductList from '../components/ProductList';
import { Box, Button, Container } from '@mui/material';

function Products() {
  const navigate = useNavigate();

  console.log(useParams(), useLocation());
  const location = useLocation();

  return (
    <Container>
      <Box display='flex'>
        <Button
          sx={{ ml: 'auto', mb: 1, mt: -3 }}
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
