import { Chip } from '@mui/material';
import { Link } from 'react-router-dom';
import LocalDrinkIcon from '@mui/icons-material/LocalDrink';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import CakeIcon from '@mui/icons-material/Cake';
import FlashOnIcon from '@mui/icons-material/FlashOn';
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety';

/* Används för att returnera rätt ikon baserat på kategorinamnet, ikonenrna importeras från mui */
const getIcon = (label) => {
  switch (label.toLowerCase()) {
    case 'energidryck':
      return <LocalDrinkIcon />;
    case 'godis':
      return <CakeIcon />;
    case 'pwo':
      return <FlashOnIcon />;
    case 'kosttillskott':
      return <HealthAndSafetyIcon />;
    case 'proteinpulver':
      return <FitnessCenterIcon />;
    default:
      return null;
  }
};

/* En komponent som visar en länk till kategorier, använder reacts Link, importerar chip från mui */
function Category({ id, text }) {
  return (
    <Link to={`/categories/${id}/products`}>
      <Chip icon={getIcon(text)} label={text}></Chip>
    </Link>
  );
}

export default Category;
