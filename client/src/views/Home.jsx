/* import PostList from '../components/PostList';
import TagList from '../components/TagList';
import UserList from '../components/UserList'; */
/* import { Grid2 } from '@mui/material'; */
import ProductList from '../components/ProductList';
import CategoryList from '../components/CategoryList';
import {Grid2, Paper, Typography} from '@mui/material';

function Home() {
  return (
    <>
    <Grid2 container spacing={8}>
      <Grid2 component="section" item xs={12} md={8}>
        <Paper elevation={3} sx={{p: 2, mt: 4, borderRadius: 2 }}>
          <Typography variant="h2">Produkter</Typography>
          <ProductList />
        </Paper>
      </Grid2>
      <Grid2 component="section" item xs={12} md={4}>
      </Grid2>
    </Grid2>
    </>
  );
}

export default Home;