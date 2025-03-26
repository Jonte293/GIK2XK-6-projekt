import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getAll } from '../services/CategoryService'; // justera path om det behÃ¶vs

import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { Button } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';


export default function MenuAppBar() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  

  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    getAll().then((data) => {
      if (data) setCategories(data);
    });
  }, []);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{backgroundColor: 'grey'}}>
        <Toolbar>
        <Link to="/"><HomeIcon/></Link>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={handleMenu}
          >
            <MenuIcon/>
          </IconButton>
       
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
            transformOrigin={{ vertical: 'top', horizontal: 'left' }}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            {categories.map((cat) => (
              <MenuItem
                key={cat.id}
                onClick={() => {
                  navigate(`/categories/${cat.id}/products`);
                  handleClose();
                }}
              >
                {cat.name}
              </MenuItem>
            ))}

          </Menu>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Kategorier
          </Typography> 
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Link to="/products">
            Produkter
            </Link>
          </Typography> 
           <IconButton color="inherit">
            <ShoppingCartOutlinedIcon />
          </IconButton>
          <Button color="inherit">
          <Link to="carts/1"><ShoppingCartOutlinedIcon/>HEEEEJ</Link>
          </Button>

        </Toolbar>
      </AppBar>
    </Box>
  );
}

