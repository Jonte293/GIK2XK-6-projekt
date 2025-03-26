import { Link, Outlet} from "react-router-dom";
import { Box, AppBar, Toolbar, Typography, Button } from '@mui/material';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
function App() {
  return (
    <>
     <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Link to="/"> Webshop X-treme </Link>
            <Link to="/products"> Produkter </Link>
          </Typography>
          <Button color="inherit">
          <Link to="carts/1"><ShoppingCartOutlinedIcon/></Link>
          
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
      <Outlet></Outlet>
    </>
  );
}

export default App;
