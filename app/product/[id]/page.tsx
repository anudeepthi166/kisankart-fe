// app/product/[id]/page.tsx

"use client"

import { useParams } from "next/navigation"

const mockProducts = {
  1: {
    name: "Organic Pesticide",
    image: "/KisanKart.png",
    description: "A powerful yet eco-friendly pesticide made from natural ingredients.",
    price: 299,
    offerPrice: 199,
  },
  2: {
    name: "Insect Killer",
    image: "/KisanKart.png",
    description: "Effective insect killer that keeps crops safe from bugs.",
    price: 399,
    offerPrice: 249,
  },
  // add more products...
}

export default function ProductDetailPage() {
  const { id } = useParams()
  const product = mockProducts[id as keyof typeof mockProducts]

  if (!product) {
    return <div className="p-10 text-center text-red-600">Product not found</div>
  }

  return (
    <div className="p-10 max-w-4xl mx-auto bg-white shadow-xl rounded-xl mt-6">
      <img src={product.image} alt={product.name} className="w-full h-[300px] object-cover rounded-lg mb-6" />
      <h1 className="text-3xl font-bold text-green-800 mb-2">{product.name}</h1>
      <p className="text-gray-700 text-lg mb-4">{product.description}</p>
      <div className="flex items-center gap-3 mb-4">
        <span className="text-2xl font-bold text-red-600">₹{product.offerPrice}</span>
        <span className="text-gray-400 line-through text-lg">₹{product.price}</span>
        <span className="text-sm bg-red-500 text-white px-2 py-1 rounded">Save ₹{product.price - product.offerPrice}</span>
      </div>
      <div className="flex gap-4">
        <button className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700">Add to Cart</button>
        <button className="border border-green-700 text-green-700 px-6 py-2 rounded hover:bg-green-100">Buy Now</button>
      </div>
    </div>
  )
}
