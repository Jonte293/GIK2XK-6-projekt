import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import ProductEdit from './views/ProductEdit.jsx';
import Products from './views/Products.jsx';
import ProductDetail from './views/ProductDetail.jsx';
import CartDetail from './views/CartDetail.jsx';
import ProductAdd from './views/ProductAdd.jsx';
import Home from './views/Home.jsx';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { CssBaseline } from '@mui/material';
import { createTheme, ThemeProvider} from "@mui/material/styles";
import { blue, blueGrey, grey, red, teal } from '@mui/material/colors';

const theme = createTheme({palette: {
  mode: 'light',
    background: {
      default: '#f3f3f3',
      paper: grey[50]
    },
    primary: {
      main: blue[800]
    },
    secondary: {
      main: blueGrey[500]
    },
    success: {
      main: teal['600']
    },
    error: {
      main: red['900']
    }
},
typography: {
  fontFamily: '"Ubuntu", "Roboto", "Helvetica", "Arial", "sans-serif"',
  h1: {
    color: "white",
    fontSize:'2rem',
    fontWeight: 'bold'
  },
  h2: {
    fontSize:'2rem',
    fontWeight: 'bold'
  },
  h4: {
    fontSize:'2.5rem',
    fontWeight: 'bold'
  }
  ,
  h6: {
    fontSize:'1.2rem'
  },
  p: {
    fontSize: "1rem"
  }
}});

const router = createBrowserRouter([
  {
    path: '/', 
    element: <App />,
    children: [ 
      {
        path: '/',
        element: <Home />
      },
      {
        path: '/products/:id/edit',
        element: <ProductEdit />
      },
      {
        path: '/products/new',
        element: <ProductEdit />
      },
      {
        path: '/products/',
        element: <Products />
      },
      {
        path: '/products/:id',
        element: <ProductDetail />
      },
      {
        path: '/carts/:id',
        element: <CartDetail />
      },
      {
        path: '/products/add',
        element: <ProductAdd />
      },
      {
        path: '/categories/:id/products',
        element: <Products />
      }
    ]}
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <RouterProvider router={router}/>
    </ThemeProvider>
  </StrictMode>,
);