"use client";
import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { useRouter } from "next/navigation";
import Image from "next/image";

const CheckoutForm = ({ cartItems, totalAmount }) => {
  const { dispatch } = useCart();
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.phone || !form.address) {
      alert("Please fill all required fields.");
      return;
    }

    setSubmitted(true);
    dispatch({ type: "CLEAR_CART" });
    setTimeout(() => {
      router.push("/");
    }, 3000);
  };

  if (submitted) {
    return (
      <div className="text-center py-16">
        <h2 className="text-2xl font-bold text-green-600 mb-4">
          Order Placed Successfully!
        </h2>
        <p className="text-gray-600">
          Thank you, {form.name}! We’ll deliver to your address soon.
        </p>
        <p className="text-gray-500 mt-2">Payment Mode: Cash on Delivery</p>
      </div>
    );
  }

  return (
    <div className="space-y-10">
      <div className="space-y-4">
        <h3 className="text-xl font-semibold">Your Cart</h3>
        {cartItems.map((item, i) => (
          <div key={i} className="flex items-center gap-4 border p-4 rounded">
            <div className="relative w-16 h-16">
              <Image
                src={item.image}
                alt={item.name}
                fill
                className="object-cover rounded"
              />
            </div>
            <div className="flex-1">
              <p className="font-medium">{item.name}</p>
              <p className="text-sm text-gray-600">
                Size: {item.size} | Color: {item.color}
              </p>
              <p className="text-sm">Qty: {item.quantity}</p>
              <p className="text-blue-600 font-semibold">
                ₹{item.price * item.quantity}
              </p>
            </div>
          </div>
        ))}
        <div className="text-right text-lg font-bold">
          Total: ₹{totalAmount.toFixed(2)}
        </div>
      </div>
      <form
        onSubmit={handleSubmit}
        className="space-y-4 bg-white p-6 rounded shadow"
      >
        <h3 className="text-xl font-semibold mb-4">Shipping Details</h3>

        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={form.name}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2"
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={form.email}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2"
          required
        />
        <input
          type="tel"
          name="phone"
          placeholder="Phone Number"
          value={form.phone}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2"
          required
        />
        <textarea
          name="address"
          placeholder="Shipping Address"
          value={form.address}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2"
          rows={3}
          required
        />
        <div>
          <p className="font-medium mb-2">Payment Method</p>

          <label className="flex items-center gap-2 mb-1">
            <input
              type="radio"
              name="paymentMethod"
              value="cod"
              checked={paymentMethod === "cod"}
              onChange={() => setPaymentMethod("cod")}
              className="accent-blue-600"
            />
            Cash on Delivery
          </label>

          <label className="flex items-center gap-2 text-gray-400">
            <input type="radio" disabled className="accent-gray-400" />
            Credit/Debit Card (coming soon)
          </label>
          <label className="flex items-center gap-2 text-gray-400">
            <input type="radio" disabled className="accent-gray-400" />
            UPI (coming soon)
          </label>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Place Order
        </button>
      </form>
    </div>
  );
};

export default CheckoutForm;
