import { useParams, useLocation, useNavigate, Link } from 'react-router-dom';
import ProductList from '../components/ProductList';
import { Box, Button, Chip, Container, Typography } from '@mui/material';
import CategoryList from '../components/CategoryList';
import Inventory2Icon from '@mui/icons-material/Inventory2';
// Funktion för att hantera visning av produkter och kategorilistor med navigering
function Products() {
  // Hantererar routing, hämtar URL-parametrar och navigering.
  const navigate = useNavigate();

  console.log(useParams(), useLocation());
  const location = useLocation();
  // Return som visar kategorier, lista med produkter och knappar till 
  // alla produkter och skapa ny produkt
  return (
    <Container>
      <Box display='flex' alignItems="center" gap={2} mt={-2} mb={2}>
      <Typography variant='h2'>Kategorier: </Typography>
      <Link to={`/products`}>
        <Chip icon={<Inventory2Icon/>} label={'Alla Produkter'}></Chip>
        </Link>
        <Box>
          <CategoryList/>
        </Box>
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
