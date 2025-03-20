import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import ProductEdit from './views/ProductEdit.jsx';
import Products from './views/Products.jsx';
import ProductDetail from './views/ProductDetail.jsx';
import Cart from './views/Cart.jsx';
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
        path: '/products/edit',
        element: <ProductEdit />
      },
      {
        path: '/products/',
        element: <Products />
      },
      {
        path: '/products/1',
        element: <ProductDetail />
      },
      {
        path: '/Cart/',
        element: <Cart />
      },
      {
        path: '/products/add',
        element: <ProductAdd />
      }  
    ]}
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
);
