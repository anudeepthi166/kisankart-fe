// app/product/[id]/page.tsx

"use client"

import axios from "axios"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"


export default function ProductDetailPage() {
  const API_URL = process.env.NEXT_PUBLIC_API_URL
  const { id } = useParams()
  const [product, setProduct] = useState<any>({})

  useEffect(()=>{
    getProduct()
  },[])

  const getProduct = async() =>{
    try{
      const res = await axios.get(`${API_URL}/product/${id}`)
      console.log("product by id-->", res)
      if(res.status === 200){
        setProduct(res.data.products)
      }
    }
    catch(err){
      console.log("Error while getting product by id", err)
    }
  }

  if (!product) {
    return <div className="p-10 text-center text-red-600">Product not found</div>
  }

  const addToCart = async(product: any)=>{
    try{
      const res = await axios.post(`${API_URL}/cart/add`,{
        'userId':12,
        'productId': product.id,
        'quantity': 1 
      },{
        headers:{
          'Accept': 'application/json'
        }
      })
      console.log('Added to cart:',res)
    }

    catch(err:any){
      console.log("Error while adding to cart-->", err)
    }
  }


  return (
    <div className="p-10 max-w-4xl mx-auto bg-white shadow-xl rounded-xl mt-6">
      <img src={product.imageUrl} alt={product.name} className="w-full h-[300px] object-contain rounded-lg mb-6" />
      <h1 className="text-3xl font-bold text-green-800 mb-2">{product.name}</h1>
      <p className="text-gray-700 text-lg mb-4">{product.description}</p>
      <div className="flex items-center gap-3 mb-4">
        <span className="text-2xl font-bold text-red-600">₹{100}</span>
        <span className="text-gray-400 line-through text-lg">₹{product.price}</span>
        <span className="text-sm bg-red-500 text-white px-2 py-1 rounded">Save ₹{product.price - 100}</span>
      </div>
      <div className="flex gap-4">
        <button className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700  hover:cursor-pointer" onClick={()=>addToCart(product)}>Add to Cart</button>
        <button className="border border-green-700 text-green-700 px-6 py-2 rounded hover:bg-green-100">Buy Now</button>
      </div>
    </div>
  )
}
