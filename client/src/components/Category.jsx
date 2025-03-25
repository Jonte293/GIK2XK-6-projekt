import { Chip } from '@mui/material';
import { Link } from 'react-router-dom';


function Category({ id, text }) {
    return  (
    <Link to={`/categories/${id}/products`}>
        <Chip label={text}></Chip>
        </Link>
        );
}

export default Category;
