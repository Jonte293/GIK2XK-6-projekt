function CartProduct( {cart}) {
    return( <>
    <div style={{ border: '1px solid black', margin: '5px' }}>
    <h4>Kundvagns id: {cart.id}</h4>
    <h4>Användare: {cart.user.username} </h4>
    <ul>
    {cart.products.map((product, index) => (
    <li key={index}>
      <p>Product Name: {product.name}</p>
      <p>Quantity: {product.quantity}</p>
      <p>Price: ${product.price}</p>
    </li>
  ))}
</ul>
    </div>
    </>
    );
}
export default CartProduct;