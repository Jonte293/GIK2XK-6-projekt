
import CartProduct from "../components/CartProduct";
import { useEffect, useState } from "react";
import { getOne } from '../services/CartService';
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@mui/material";

function CartDetail() {
  const { id } = useParams();
  console.log(id)
  const [cart, setCart] = useState(null);

  console.log("Cart ID from useParams:", id);

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

