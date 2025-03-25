
import CartProduct from "../components/CartProduct";

import CartItemLarge from '../components/CartItemLarge';
import { getAll } from '../services/CartService';
import { useEffect, useState } from "react";
/* import { getOne } from '../services/CartService'; */

function Cart() {
    const [cart, setCarts] = useState([]);

    useEffect(() => {
        getAll().then((cart) => {
            setCarts(cart);
        });
    }, []);
   /*  getAll().then((cart) => console.log(cart)); */
/*     getOne().then((cart) => console.log(cart)); */
    
    return (
        <div>
            <h2>Hej</h2>
            <CartItemLarge cart={cart}/>
            {cart.products && 
            cart.products.map((product, i) => 
        ( <CartProduct key={`product_${i}`} product={product} />
))}
        </div>
    )
}

export default Cart;