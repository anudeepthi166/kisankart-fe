"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import axios from "axios"
import Link from "next/link"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"

export default function Cart(){
    const API_URL =  process.env.NEXT_PUBLIC_API_URL
    const {userId} = useParams()
    const [cartItems, setCartItems] = useState<any[]>([])

    useEffect(()=>{
        getCart()
    },[])

    const getCart = async() =>{
        try{
            const res = await axios.get(`${API_URL}/cart/${userId}`)
            console.log(res)
            setCartItems(res.data.items)
        }
        catch(err:any){
            console.log("Error while getting cart items: ",err)
        }
    }

    const deleteFromCart = async(userId: Number, productId: Number) =>{
        try{
            const res = await axios.delete(`${API_URL}/cart/delete/cartItem/user/12/product/${productId}`)
            console.log(res)
            console.log('deleted')
        }
        catch(err:any){
            console.log("Error while deleting cart items: ",err)
        }
    }
    const clearCart = async() =>{
        try{
            const res = await axios.delete(`${API_URL}/cart/clear/user/12`)
            console.log(res)
            console.log('cleared')
        }
        catch(err:any){
            console.log("Error while deleting cart items: ",err)
        }
    }
    const updateQuantity = async(userId: Number, productId: Number, itemId: Number, quantity:Number) =>{
        try{
            const res = await axios.put(`${API_URL}/cart/update/${itemId}`,{
                'userId': userId,
                'productId': productId,
                'quantity':quantity
            },{
                headers:{
                    'Accept':'application/json'
                }
            })
            console.log(res)
            console.log('updated quantuty')
        }
        catch(err:any){
            console.log("Error while deleting cart items: ",err)
        }
    }

    return(
        <div>
            <button
              onClick={() => {clearCart()}}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
            >
              clear cart
          </button>
       <div className="flex flex-col gap-4 p-4">
            {cartItems && cartItems.length !== 0 ? (
                cartItems.map((cartItem) => (
                <div key={cartItem.cartId} className="flex items-center gap-6 border-b pb-4">
                    
                    {/* Product Image */}
                    <img 
                    src={cartItem.product.imageUrl} 
                    alt={cartItem.product.name} 
                    className="w-24 h-24 object-contain rounded-md bg-gray-100"
                    />

                    {/* Product Name */}
                    <div className="flex-1 min-w-[150px]">
                    <h2 className="text-base font-semibold">{cartItem.product.name}</h2>
                    </div>

                    {/* Price */}
                    <div className="flex flex-col items-start min-w-[100px]">
                    <span className="text-lg font-bold text-red-600">₹{100}</span>
                    <span className="text-sm text-gray-500 line-through">₹{cartItem.product.price}</span>
                    </div>

                    {/* Quantity */}
                    <div className="flex items-center gap-2 min-w-[120px]">
                        <span className="text-gray-700">Qty:</span>

                        <div className="flex items-center border rounded px-2 py-1">
                            {/* Minus button */}
                            <button
                            className="px-2 text-lg"
                            onClick={() => updateQuantity(12,cartItem.product.id,cartItem.itemId,cartItem.quantity-1 )}
                            >
                            -
                            </button>

                            {/* Quantity value */}
                            <span className="px-2">{cartItem.quantity || 1}</span>

                            {/* Plus button */}
                            <button
                            className="px-2 text-lg"
                            onClick={() => updateQuantity(12,cartItem.product.id,cartItem.itemId,cartItem.quantity+1 )}
                            >
                            +
                            </button>
                        </div>
                    </div>


                    {/* Action Buttons */}
                    <div className="flex gap-2 min-w-[150px]">
                    <Button 
                        variant="outline" 
                        className="border-green-700 text-green-700 hover:bg-green-100"
                    >
                        Buy Now
                    </Button>
                    <Button 
                        variant="destructive" 
                        className="hover:bg-red-600"
                        onClick={()=>{deleteFromCart(cartItem.userId, cartItem.product.id)}}
                    >
                        Delete
                    </Button>
                    </div>

                </div>
                ))
            ) : (
                <p className="text-center text-gray-500">Your cart is empty.</p>
            )}
            </div>

        </div>
    )
}