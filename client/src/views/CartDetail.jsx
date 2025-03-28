import CartProduct from "../components/CartProduct";
import { useEffect, useState } from "react";
import { createEmptyCart, getOne, create, removeCartProduct } from '../services/CartService';
import { useNavigate, useParams } from "react-router-dom";
import { Button, Modal } from '@mui/material';
import { update } from "../services/CartService";
// Hanterar kundvagnen genom visning av innehåll, betalning och tillbaka knapp.
function CartDetail() {
  const { id } = useParams();
  const [cart, setCart] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const navigate = useNavigate();
  // useEffect används för att köra kod när något ändras
  useEffect(() => {
    getOne(id).then((cart) => {
      if (cart && cart.payed) {
        createEmptyCart().then((emptiedCart) => setCart(emptiedCart));
      } else {
        setCart(cart);
      }
    });
  }, [id]);

  //Uppdaterar kundvagnen när den ändras
  const updateCart = (updatedCart) => {
    setCart(updatedCart);
  };
  
  // Hanterar betalning av kundvagnen i webbshoppen och uppdatering
  // av kundvagnen.
  const handlePayment = async () => {
    try {
        const updatedCart = { ...cart, payed: true };
        await update(updatedCart); 

        // Skapar en ny kundvagn med nytt id
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
        // Tömmer kundvagnen efter man betalat och payed sätts till false
        const emptiedCart = { 
          ...cart,
          userId: 1, 
          products: [], 
          payed: false  
      };

      await update(emptiedCart);

      // Hämtar cart med getOne och sätter den tomma kundvagnen så den visas
      const refreshedCart = await getOne(cart.id);
      setCart(refreshedCart);

        setModalOpen(true);

    } catch (error) {
        console.error("Fel vid betalning:", error);
    }
};

// Stänger modalfönstrer och användaren navigeras tillbaka till hemsidan
const handleCloseModal = () => {
  setModalOpen(false);
  navigate("/");
};
// Visar produkter i kundvagnen och knappar för att gå tillbaka och betala
// med en modal ruta att betalning gått igenom.
return cart ? (
<div>
  <CartProduct cart={cart} updateCart={updateCart}/>
  <Button onClick={() => navigate(-1)}>Tillbaka</Button>
  <Button variant="contained" color="primary" onClick={handlePayment}> Betala </Button>
  

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