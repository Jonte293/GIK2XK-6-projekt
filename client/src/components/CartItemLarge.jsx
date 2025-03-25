import CartProduct from "./CartProduct";

function CartItemLarge( cart ) {
  return (
    <div style={{ border: '1px solid black' }}>
    <h4>CartId: {cart.cart.id}</h4>
    <p>Skapad: {cart.cart.createdAt}</p>
    
    </div>
  );
}

export default CartItemLarge;