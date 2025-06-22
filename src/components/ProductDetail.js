"use client";
import { useState } from "react";
import Image from "next/image";
import { useCart } from "@/context/CartContext";

const ProductDetail = ({ product }) => {
  const { dispatch } = useCart();

  // State for selected variant
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");

  const handleAddToCart = () => {
    const variant = product.variants.find(
      (v) => v.size === selectedSize && v.color === selectedColor
    );

    if (!variant) {
      alert("Please select size and color");
      return;
    }

    dispatch({
      type: "ADD_TO_CART",
      payload: {
        id: variant.id,
        name: product.name,
        image: product.images[0],
        price: variant.price,
        size: variant.size,
        color: variant.color,
      },
    });
  };

  return (
    <div className="container mx-auto px-4 py-10">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Product Image */}
        <div className="relative w-full md:w-1/2 h-80 md:h-96">
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            className="object-cover rounded-lg"
          />
        </div>

        {/* Product Info */}
        <div className="md:w-1/2">
          <h1 className="text-2xl font-bold mb-2">{product.name}</h1>
          <p className="text-gray-600 mb-4">{product.description}</p>

          {/* Size selector */}
          <div className="mb-4">
            <label className="block mb-1 font-medium">Select Size:</label>
            <div className="flex gap-2">
              {[...new Set(product.variants.map((v) => v.size))].map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`px-3 py-1 border rounded ${
                    selectedSize === size
                      ? "bg-blue-600 text-white"
                      : "text-gray-700"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Color selector */}
          <div className="mb-4">
            <label className="block mb-1 font-medium">Select Color:</label>
            <div className="flex gap-2">
              {[...new Set(product.variants.map((v) => v.color))].map(
                (color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`px-3 py-1 border rounded ${
                      selectedColor === color
                        ? "bg-blue-600 text-white"
                        : "text-gray-700"
                    }`}
                  >
                    {color}
                  </button>
                )
              )}
            </div>
          </div>

          <button
            onClick={handleAddToCart}
            className="mt-6 bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
