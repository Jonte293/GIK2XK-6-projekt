
import CartProduct from "./CartProduct";
import { useEffect, useState } from "react";
import { getOne } from '../services/CartService';
import { useNavigate, useParams } from "react-router-dom";

function CartDetail() {
  const { id } = useParams;
  console.log(id)
  const [cart, setCart] = useState(null);

  useEffect(() => {
    getOne(id).then((cart) => setCart(cart));
  }, [id]);
  
  const navigate = useNavigate();

return cart ? (
<div>
<CartProduct cart={cart}/>
<Button onClick={() => navigate(-1)}>Tillbaka</Button>
</div>
) : (
  <h3>Kunde inte hitta kundvagn</h3>
);
}
export default CartDetail;

/* function CartDetail({ pathname }) {
  const [carts, setCart] = useState([]);

  useEffect(() => {
      getAll(pathname).then((carts) => {
          setCart(carts);
      });
  }, [pathname]);

return (
<ul>
  {carts?.length > 0 ? (
    carts.map((cart) => (
      <li key={`carts_${cart.id}`}>
        <CartProduct cart={cart} />      
      </li>
    ))
  ) : (
    <h3>Kunde inte hämta produkt</h3>
  )}
</ul>
);
}
export default CartDetail; */