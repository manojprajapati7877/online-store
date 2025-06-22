"use client";
import { useState } from "react";
import { useCart } from "@/context/CartContext";
import data from "@/data/products.json";
import Image from "next/image";
import Link from "next/link";

const ProductCard = () => {
  const [products] = useState(data);
  const { dispatch } = useCart();
  const [variantSelections, setVariantSelections] = useState({});

  const handleSelectionChange = (productId, field, value) => {
    setVariantSelections((prev) => ({
      ...prev,
      [productId]: {
        ...prev[productId],
        [field]: value,
      },
    }));
  };

  const handleAddToCart = (product) => {
    const selection = variantSelections[product.id] || {};
    const selectedSize = selection.size;
    const selectedColor = selection.color;

    const selectedVariant = product.variants.find(
      (v) => v.size === selectedSize && v.color === selectedColor
    );

    if (!selectedVariant) {
      alert("Please select both size and color.");
      return;
    }

    dispatch({
      type: "ADD_TO_CART",
      payload: {
        id: selectedVariant.id,
        variantId: selectedVariant.id,
        name: product.name,
        image: product.images[0],
        price: selectedVariant.price,
        size: selectedVariant.size,
        color: selectedVariant.color,
      },
    });
  };

  return (
    <section className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6">Featured Products</h2>

      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {products.map((product) => {
          const sizes = [...new Set(product.variants.map((v) => v.size))];
          const colors = [...new Set(product.variants.map((v) => v.color))];

          const selected = variantSelections[product.id] || {};
          const selectedSize = selected.size || "";
          const selectedColor = selected.color || "";

          const selectedVariant = product.variants.find(
            (v) => v.size === selectedSize && v.color === selectedColor
          );

          return (
            <div
              key={product.id}
              className="bg-white border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition"
            >
              <Link href={`/product/${product.id}`}>
                <div className="relative w-full h-52">
                  <Image
                    src={product.images[0]}
                    alt={product.name}
                    fill
                    className="object-cover"
                  />
                </div>
              </Link>

              <div className="p-4">
                <h3 className="text-lg font-semibold">{product.name}</h3>
                <p className="text-gray-500 text-sm mb-2">
                  {product.description}
                </p>

                <div className="space-y-2 text-sm mb-2">
                  <div>
                    <label className="text-gray-700">Size:</label>
                    <select
                      className="w-full border rounded px-2 py-1 mt-1"
                      value={selectedSize}
                      onChange={(e) =>
                        handleSelectionChange(
                          product.id,
                          "size",
                          e.target.value
                        )
                      }
                    >
                      <option value="">Select Size</option>
                      {sizes.map((size) => (
                        <option key={size} value={size}>
                          {size}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="text-gray-700">Color:</label>
                    <select
                      className="w-full border rounded px-2 py-1 mt-1"
                      value={selectedColor}
                      onChange={(e) =>
                        handleSelectionChange(
                          product.id,
                          "color",
                          e.target.value
                        )
                      }
                    >
                      <option value="">Select Color</option>
                      {colors.map((color) => (
                        <option key={color} value={color}>
                          {color}
                        </option>
                      ))}
                    </select>
                  </div>
                  {selectedVariant ? (
                    <p className="text-green-600 font-medium">
                      ₹{selectedVariant.price}
                    </p>
                  ) : (
                    <p className="text-gray-400 text-sm">
                      Please select size and color to see price
                    </p>
                  )}
                </div>

                <button
                  onClick={() => handleAddToCart(product)}
                  className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
                >
                  Add to Cart
                </button>

                <Link
                  href={`/product/${product.id}`}
                  className="block mt-2 text-center text-blue-600 text-sm hover:underline"
                >
                  View Details
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default ProductCard;
