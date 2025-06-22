"use client";
import CheckoutForm from "@/components/CheckoutForm";
import { useCart } from "@/context/CartContext";

const CheckoutPage = () => {
  const { state } = useCart();
  const cartItems = state.cart;

  const totalAmount = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <h2 className="text-2xl font-bold mb-6">Checkout</h2>
      <CheckoutForm cartItems={cartItems} totalAmount={totalAmount} />
    </div>
  );
};

export default CheckoutPage;
