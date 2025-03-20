/* import PostList from '../components/PostList';
import TagList from '../components/TagList';
import UserList from '../components/UserList'; */
/* import { Grid2 } from '@mui/material'; */
import ProductList from '../components/ProductList';
import CategoryList from '../components/CategoryList';
import {Grid2} from '@mui/material';

function Home() {
  return (
    <>
    <Grid2 container spacing={2}>
      <Grid2 item xs={12} md={8}>
      <ProductList/>
      </Grid2>
      <Grid2 item xs={12} md={4}>
        <CategoryList />
      </Grid2>
      </Grid2>
    </>
  );
}

export default Home;
