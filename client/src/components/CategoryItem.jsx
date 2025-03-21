import { Chip } from '@mui/material';
import { Link } from 'react-router-dom';


function CategoryItem({ text }) {
    return <Link to={`/categories/${text}/products`}><Chip label={text}></Chip></Link>
}

export default CategoryItem;
