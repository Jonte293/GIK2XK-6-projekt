import { useParams, useLocation } from "react-router-dom";
import CartDetail from "../components/CartDetail";

function Products() {
    console.log(useParams(), useLocation());
    const location = useLocation();
    return <CartDetail pathname={location.pathname}/>;
}
export default Products;