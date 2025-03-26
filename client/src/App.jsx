import { Link, Outlet} from "react-router-dom";
import { Box, Toolbar, Typography, Button, Container } from '@mui/material';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import MenuAppBar from "./components/MenuAppBar";
import './index.css';
function App() {
  return (
    <>
     <Box sx={{ flexGrow: 1 }}>
      <MenuAppBar className='appbar' position="static" sx={ {backgroundColor: "grey"}}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Link to="/"> Webshop X-treme </Link>
            <Link to="/products"> Produkter </Link>
          </Typography>
          <Button color="inherit">
          <Link to="carts/1"><ShoppingCartOutlinedIcon/></Link>
          
          </Button>
        </Toolbar>
      </MenuAppBar>
    </Box>
    <Container sx={{ mt: 4 }} maxWidth="xl" component="main">
      <Outlet />
    </Container>
    </>
  );
}

export default App;
