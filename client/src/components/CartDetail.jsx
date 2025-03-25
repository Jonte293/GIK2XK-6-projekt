/* import CartProduct from "./CartProduct";

function CartDetail( cart ) {
  return (
    <div style={{ border: '1px solid black' }}>
    <h4>CartId: {cart.cart.id}</h4>
    <p>Skapad: {cart.cart.createdAt}</p>
    
    </div>
  );
}

export default CartDetail; */


import CartProduct from "../components/CartProduct";
import { getAll } from '../services/CartService';
import { useEffect, useState } from "react";
/* import { getOne } from '../services/CartService'; */

function CartDetail( pathname ) {
    const [cart, setCarts] = useState([]);

    useEffect(() => {
        getAll(pathname).then((cart) => {
            setCarts(cart);
        });
    }, [pathname]);
   /*  getAll().then((cart) => console.log(cart)); */
/*     getOne().then((cart) => console.log(cart)); */
    
    return (
        <div>
            <h2>Hej</h2>
            <CartProduct cart={cart}/>
{/*             {cart.products && 
            cart.products.map((product, i) => 
        ( <CartProduct key={`product_${i}`} product={product} />
))} */}
        {cart.products && (
        <CartProduct key={`cart_${cart.products.id}`} id={cart.products.id} text={cart.products.name} /> )}
              <p>{cart.body}</p>
        </div>
    )
}
export default CartDetail;