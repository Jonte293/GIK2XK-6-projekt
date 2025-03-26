/* import PostList from '../components/PostList';
import TagList from '../components/TagList';
import UserList from '../components/UserList'; */
/* import { Grid2 } from '@mui/material'; */
import ProductList from '../components/ProductList';
import CategoryList from '../components/CategoryList';
import {Grid2, Typography} from '@mui/material';
import HomeBanner from '../components/HomeBanner';

function Home() {
  return (
    <>
    <Grid2 container spacing={8}>
      <Grid2 component="section" item xs={12} md={8}>
        <HomeBanner
        title="Webshop X-Treme!"
        image="https://nocco.co.uk/wp-content/uploads/sites/2/2024/02/UK_NOCCO_WEBSHOP_Packshot_Trag_2800x2800_RAMONADE-768x768.png"></HomeBanner>
        <div elevation={3} sx={{p: 2, mt: 4, borderRadius: 2 }}>
          <Typography variant="h2"></Typography>
          <ProductList />
        </div>
      </Grid2>
      <Grid2 component="section" item xs={12} md={4}>
      </Grid2>
    </Grid2>
    </>
  );
}

export default Home;