import CategoryItem from './CategoryItem';

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
                <CategoryItem text={category.name} />
              </li>
            ))
          ) : (
            <h3>Kunde inte hämta produkt</h3>
          )}
        </ul>
      );
    }


export default CategoryList;