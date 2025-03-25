import ProductItemSmall from './ProductItemSmall';
import { getAll } from '../services/ProductService';

function ProductList() {
  const products = [
    {
      id: 1,
      name: 'nocco',
      price: '18.90',
      description: null,
      imageUrl: null,
      createdAt: '2025-03-19T13:31:10.000Z',
      updatedAt: '2025-03-19T13:31:10.000Z',
      category: {
        id: 3,
        name: 'Energi dryck',
      },
    },
    {
      id: 2,
      name: 'nocco',
      price: '18.90',
      description: null,
      imageUrl: null,
      createdAt: '2025-03-19T13:37:11.000Z',
      updatedAt: '2025-03-19T13:37:11.000Z',
      category: {
        id: 3,
        name: 'Energi dryck',
      },
    },
    {
      id: 3,
      name: 'Marabou',
      price: '55.99',
      description: null,
      imageUrl: null,
      createdAt: '2025-03-19T13:47:34.000Z',
      updatedAt: '2025-03-19T14:58:58.000Z',
      category: {
        id: 2,
        name: 'Choklad',
      },
    },
    {
      id: 4,
      name: 'Nocco Ramonade',
      price: '20.00',
      description: null,
      imageUrl:
        'https://www.sportkost.se/pub_images/original/nocco_focus_ramonade_330ml.jpg',
      createdAt: '2025-03-20T13:40:57.000Z',
      updatedAt: '2025-03-20T13:45:06.000Z',
      category: {
        id: 3,
        name: 'Energi dryck',
      },
    },
    {
      id: 5,
      name: 'Blåvita flingor',
      price: '20.00',
      description: null,
      imageUrl: null,
      createdAt: '2025-03-20T09:48:20.000Z',
      updatedAt: '2025-03-20T09:48:20.000Z',
      category: {
        id: 2,
        name: 'Choklad',
      },
    },
    {
      id: 6,
      name: 'Blåvita flingor',
      price: '20.00',
      description: null,
      imageUrl: null,
      createdAt: '2025-03-20T13:10:17.000Z',
      updatedAt: '2025-03-20T13:10:17.000Z',
      category: {
        id: 2,
        name: 'Choklad',
      },
    },
    {
      id: 7,
      name: 'nocco Golden Era',
      price: '20.20',
      description: 'En smak av pierre',
      imageUrl:
        'https://snackje.com/wp-content/uploads/2023/09/Nocco-BCAA-Golden-Era-330ml.webp',
      createdAt: '2025-03-20T13:11:14.000Z',
      updatedAt: '2025-03-20T13:11:14.000Z',
      category: {
        id: 2,
        name: 'Choklad',
      },
    },
  ];
  getAll().then((products) => console.log(products));
  return (
    <ul>
      {products?.length > 0 ? (
        products.map((product) => (
          <li key={`products_${product.id}`}>
            <ProductItemSmall product={product} />
          </li>
        ))
      ) : (
        <h3>Kunde inte hämta produkt</h3>
      )}
    </ul>
  );
}

export default ProductList;
