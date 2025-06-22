"use client";
import { useCart } from "@/context/CartContext";
import Image from "next/image";
import Link from "next/link";

const Cart = () => {
  const { state, dispatch } = useCart();
  const cartItems = state.cart;

  const totalAmount = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  if (cartItems.length === 0) {
    return <p className="text-gray-600">Your cart is empty.</p>;
  }

  return (
    <div className="space-y-6">
      {cartItems.map((item, index) => (
        <div
          key={index}
          className="flex items-center border rounded-lg p-4 shadow-sm"
        >
          <div className="relative w-24 h-24 mr-4">
            <Image
              src={item.image}
              alt={item.name}
              fill
              className="object-cover rounded"
            />
          </div>
          <div className="flex-1">
            <h2 className="text-lg font-semibold">{item.name}</h2>
            <p className="text-sm text-gray-600">
              Size: {item.size} | Color: {item.color}
            </p>

            <div className="flex items-center gap-2 mt-2">
              <button
                className="px-2 py-1 border rounded text-gray-600 hover:bg-gray-100"
                onClick={() => dispatch({ type: "DECREMENT_QTY", index })}
              >
                −
              </button>
              <span className="px-3">{item.quantity}</span>
              <button
                className="px-2 py-1 border rounded text-gray-600 hover:bg-gray-100"
                onClick={() => dispatch({ type: "INCREMENT_QTY", index })}
              >
                +
              </button>
            </div>

            <p className="text-blue-600 font-medium mt-1">
              ₹{item.price * item.quantity}
            </p>
          </div>
        </div>
      ))}

      <div className="text-right mt-6">
        <h3 className="text-xl font-semibold">
          Total: ₹{totalAmount.toFixed(2)}
        </h3>
        <Link
          href="/checkout"
          className="inline-block mt-4 bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
        >
          Proceed to Checkout
        </Link>
      </div>
    </div>
  );
};

export default Cart;
