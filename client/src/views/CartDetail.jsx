import CartProduct from "../components/CartProduct";
import { useEffect, useState } from "react";
import { createEmptyCart, getOne, create, removeCartProduct } from '../services/CartService';
import { useNavigate, useParams } from "react-router-dom";
import { Button, Modal } from '@mui/material';
import { update } from "../services/CartService";

function CartDetail() {
  const { id } = useParams();
  const [cart, setCart] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const navigate = useNavigate();


  useEffect(() => {
    getOne(id).then((cart) => {
      if (cart && cart.payed) {
        createEmptyCart().then((emptiedCart) => setCart(emptiedCart));
      } else {
        setCart(cart);
      }
    });
  }, [id]);

  const updateCart = (updatedCart) => {
    setCart(updatedCart); // Uppdatera kundvagnens tillstånd i föräldern
  };
  

  const handlePayment = async () => {
    try {
        const updatedCart = { ...cart, payed: true };
        await update(updatedCart); 

        const newCart = {
          ...cart,
          id: undefined,     
          payed: true,
          userId: 1  
        };
        await create(newCart);

        for (const product of cart.products) {
          await removeCartProduct(cart.id, product.id);
      }

        const emptiedCart = { 
          ...cart,
          userId: 1, 
          products: [], 
          payed: false  
      };

      await update(emptiedCart);

      const refreshedCart = await getOne(cart.id);
      setCart(refreshedCart);

        setModalOpen(true);

    } catch (error) {
        console.error("Fel vid betalning:", error);
    }
};

const handleCloseModal = () => {
  setModalOpen(false);
  navigate("/"); // Gå tillbaka till en annan sida efter betalningen
};

return cart ? (
<div>
  <CartProduct cart={cart} updateCart={updateCart}/>
  <Button variant="contained" color="primary" onClick={handlePayment}> Betala </Button>
  <Button onClick={() => navigate(-1)}>Tillbaka</Button>

  <Modal open={modalOpen} onClose={handleCloseModal}>
          <div style={{
            position: "absolute", top: "50%", left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "white", padding: "20px", borderRadius: "10px"
          }}>
            <h3>✅ Betalning genomförd!</h3>
            <p>Varorna är framme inom 2 arbetsdagar 🚚</p>
            <Button variant="contained" onClick={handleCloseModal}>Stäng</Button>
          </div>
  </Modal>
</div>
) : (
  <h3>Kunde inte hitta kundvagn</h3>
);
}
export default CartDetail;