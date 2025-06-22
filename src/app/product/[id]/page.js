"use client";
import { use } from "react";
import data from "@/data/products.json";
import { notFound } from "next/navigation";
import ProductDetail from "@/components/ProductDetail";

export default function ProductDetailPage({ params }) {
  const { id } = use(params);
  const product = data.find((item) => item.id === id);
    if (!product) return notFound();
  return  <ProductDetail product={product} />;;
}
