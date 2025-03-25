import { useParams, useLocation, useNavigate } from "react-router-dom";
import ProductList from "../components/ProductList";
import { Button } from "@mui/material";

function Products() {

    const navigate = useNavigate();

    console.log(useParams(), useLocation());
    const location = useLocation();

    return <div>
    <Button variant="contained" color="success" onClick={() => navigate(`/products/new`)}>Skapa ny produkt</Button>
    <ProductList pathname={location.pathname}/>
    </div>;

}
export default Products;

