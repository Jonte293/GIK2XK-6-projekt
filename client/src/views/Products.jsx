import { useLocation, useParams } from "react-router-dom";

function Products() {
    console.log(useParams(), useLocation());
    return <h2>Produkter</h2>;
}

export default Products;