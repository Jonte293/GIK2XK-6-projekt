import ProductList from '../components/ProductList';
import {Grid2} from '@mui/material';
import HomeBanner from '../components/HomeBanner';
// Funktion som renderar innehåll för startsidan på webbshoppen
// Visar en HomeBanner med innehåll om webshop x-treme och utförsälning.
// Visar också alla produkter med ProductList och använder grid för layout
function Home() {
  return (
    <>
    <Grid2 container spacing={8}>
      <Grid2 component="section" item xs={12} md={8}>
        <HomeBanner
        title="Webshop X-Treme!"
        text="Utförsäljning"
        text2="Just nu! 150kr per platta Nocco Ramonade"
        image="https://nocco.co.uk/wp-content/uploads/sites/2/2024/02/UK_NOCCO_WEBSHOP_Packshot_Trag_2800x2800_RAMONADE-768x768.png"></HomeBanner>
        <div elevation={3} sx={{p: 2, mt: 4, borderRadius: 2 }}>
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