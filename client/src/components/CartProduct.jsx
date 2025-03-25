function CartProduct( product) {
    return( <>
    <div style={{ border: '1px solid black', margin: '5px' }}>
    <h4>Produktnamn {product.product.name}</h4>
    <p>Antal: {product.product.quantity}</p>
    <img width="300" src={product.product.imageUrl} /> 
    </div>
    </>
    );
}
export default CartProduct;