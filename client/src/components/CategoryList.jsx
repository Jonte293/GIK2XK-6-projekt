import Category from './Category';
import { useEffect, useState } from 'react';
import { useParams, useLocation} from 'react-router-dom';
import { getAll } from '../services/CategoryService';
import { Box } from '@mui/material';

function CategoryList() {

  console.log(useParams(), useLocation());
  const location = useLocation();


  
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getAll().then((categories) => setCategories(categories));
  }, []);
    return (
      <ul style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', listStyle: 'none', padding: 0, margin: 0 }}>
          {categories?.length > 0 ? (
            categories.map((category) => (
              <li key={`products_${category.id}`}>
                <Category id={category.id} text={category.name} />
              </li>
            ))
          ) : (
            <h3>Kunde inte hämta produkt</h3>
          )}
        </ul>
      );
      
    }


export default CategoryList;



/* import Category from './Category';

function CategoryList() {
    const categories = [
        {
            "id": 2,
            "name": "Choklad",
            "createdAt": "2025-03-19T13:24:16.000Z",
            "updatedAt": "2025-03-19T13:24:16.000Z"
        },
        {
            "id": 3,
            "name": "Energi dryck",
            "createdAt": "2025-03-19T13:25:59.000Z",
            "updatedAt": "2025-03-19T13:25:59.000Z"
        },
        {
            "id": 4,
            "name": "Proteinpulver",
            "createdAt": "2025-03-20T14:21:20.000Z",
            "updatedAt": "2025-03-20T14:21:20.000Z"
        },
        {
            "id": 5,
            "name": "Kosttillskott",
            "createdAt": "2025-03-20T14:22:08.000Z",
            "updatedAt": "2025-03-20T14:22:08.000Z"
        }
    ];
    return (
        <ul>
          {categories?.length > 0 ? (
            categories.map((category) => (
              <li key={`products_${category.id}`}>
                <Category id={category.id} text={category.name} />
              </li>
            ))
          ) : (
            <h3>Kunde inte hämta produkt</h3>
          )}
        </ul>
      );
      
    }


export default CategoryList; */