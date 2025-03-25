import { useParams, useLocation } from "react-router-dom";
import CartDetail from "../components/CartDetail2";

function Carts() {
    console.log(useParams(), useLocation());
    const location = useLocation();
    return <CartDetail pathname={location.pathname}/>;
}
export default Carts;

// HELA DEN HÄR FILEN KAN NOG TAS BORT!! 