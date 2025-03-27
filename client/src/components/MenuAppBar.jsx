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
import '../index.css';


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
      <AppBar class='appBar' position="static" sx={{}}>
        <Toolbar>
        <Link to="/"><img src="https://i.imgur.com/R6bXFol.png" alt="Logo" style={{ height: '100px' }} /></Link>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={handleMenu}
          >
            {/* <MenuIcon/> */}
          </IconButton>
       
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
            transformOrigin={{ vertical: 'top', horizontal: 'left' }}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            {categories.map((category) => (
              <MenuItem
                key={category.id}
                onClick={() => {
                  navigate(`/categories/${category.id}/products`);
                  handleClose();
                }}
              >
                {category.name}
              </MenuItem>
            ))}

          </Menu>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Link to="/products">
            <Typography variant='h1'>Artiklar</Typography>
            </Link>
          </Typography> 
           <IconButton color="inherit">
           <Link to="carts/1">
            <ShoppingCartOutlinedIcon fontSize='large'sx={{ color: 'white' }}/>
            </Link>
          </IconButton>
          <Button color="inherit">
          
          </Button>

        </Toolbar>
      </AppBar>
    </Box>
  );
}

