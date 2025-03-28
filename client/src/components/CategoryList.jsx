import Category from './Category';
import { useEffect, useState } from 'react';
import { useParams, useLocation} from 'react-router-dom';
import { getAll } from '../services/CategoryService';

/* En komponent som visar en lista med alla kategorier, useEffect används så att kategorierna hämtas
   när komponenten körs, returnen returnerar varje kategori (som en länk med hjälp av category.jsx)
   i en lista */
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
