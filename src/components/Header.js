"use client";
import Link from "next/link";
import { FiSearch, FiShoppingCart } from "react-icons/fi";
import { useCart } from "@/context/CartContext";

const Header = () => {
  const { state } = useCart();
  console.log("state",state)
  const totalItems = state.cart.reduce(
    (total, item) => total + (item.quantity || 1),
    0
  );

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold text-gray-800">
          MyStore
        </Link>

        {/* Navigation Links */}
        <nav className="hidden md:flex space-x-8">
          <Link
            href="/"
            className="text-gray-600 hover:text-gray-900 transition"
          >
            Home
          </Link>
        </nav>

        {/* Search Bar */}
        <div className="flex-1 max-w-xs mx-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search products..."
              className="w-full pl-10 pr-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
        </div>

        {/* Cart Icon */}
        <Link href="/cart" className="relative">
          <FiShoppingCart className="text-2xl text-gray-600 hover:text-gray-900" />
          {totalItems > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
              {totalItems}
            </span>
          )}
        </Link>
      </div>
    </header>
  );
};

export default Header;
