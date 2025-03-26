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
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

/* const router = createBrowserRouter([
  { path: '/', element: <App></App> }
]); */

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
    <RouterProvider router={router}/>
  </StrictMode>,
);
