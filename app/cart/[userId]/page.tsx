"use client"

import Header from "@/components/header"
import BuyNowButton from "@/components/buyButton"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import axios from "axios"
import Link from "next/link"
import { useParams, useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import Swal from 'sweetalert2'
import { Trash, Trash2 } from "lucide-react"


export default function Cart(){
    const router = useRouter()
    const API_URL =  process.env.NEXT_PUBLIC_API_URL
    const {userId} = useParams()
    const[user, setUser] = useState<null|string>()
    const [cartItems, setCartItems] = useState<any[]>([])
    const subtotal = cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
    const shipping = subtotal > 1000 ? 0 : 50; // free shipping over 1000
    const tax = Math.round(subtotal * 0.05);
    const total = subtotal + shipping + tax;

    useEffect(() => {
        const userFromStorage = localStorage.getItem('kisanKart_userId')
        if (userFromStorage) {
          setUser(userFromStorage)
          getCart()
        } else {
          router.push('/')
        }
      }, [router])

    const getCart = async() =>{
        try{
            const res = await axios.get(`${API_URL}/cart/user/${userId}`)
            setCartItems(res.data.items)
        }
        catch(err:any){
            console.log("Error while getting cart items: ",err)
        }
    }

    const deleteFromCart = async( productId: Number) =>{
        try{
            const res = await axios.delete(`${API_URL}/cart/cartItem/user/${userId}/product/${productId}`)
            getCart()
        }
        catch(err:any){
            console.log("Error while deleting cart items: ",err)
        }
    }
    const clearCart = async() =>{
        try{
            const res = await axios.delete(`${API_URL}/cart/clear/user/${userId}`)
            getCart()
        }
        catch(err:any){
            console.log("Error while deleting cart items: ",err)
        }
    }
    const updateQuantity = async(productId: Number, itemId: Number, quantity:Number) =>{
        try{
            const res = await axios.put(`${API_URL}/cart/itemId/${itemId}`,{
                'userId': userId,
                'productId': productId,
                'quantity':quantity
            },{
                headers:{
                    'Accept':'application/json'
                }
            })
            getCart()
        }
        catch(err:any){
            console.log("Error while deleting cart items: ",err)
        }
    }

    const handleClearCart = () => {
        Swal.fire({
          title: 'Are you sure?',
          text: "You are about to clear all items from your cart!",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#16a34a', // green
          cancelButtonColor: '#d33',      // red
          confirmButtonText: 'Yes, clear it!',
          cancelButtonText: 'Cancel',
          background: '#f9fafb', // light gray background (optional, matches your theme)
          color: '#111827', // black text color
        }).then((result) => {
          if (result.isConfirmed) {
            clearCart();  // <-- call your clearCart function only if user confirmed
            Swal.fire(
              'Cleared!',
              'Your cart has been cleared.',
              'success'
            )
          }
        })
      }

    return(
        <div className="min-h-screen bg-gray-50 pb-20">
        <Header />
      
        {/* Clear Cart Button */}
        {cartItems && cartItems.length !== 0 &&
            <div className="flex justify-end p-4">
            <button
                onClick={handleClearCart}            
                className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition duration-300 shadow-md hover:cursor-pointer"
            >
                Clear Cart
            </button>
            </div>
        }
      
        {/* Cart Items */}
        <div className="flex flex-col gap-6 p-6 max-w-5xl mx-auto">
          {cartItems && cartItems.length !== 0 ? (
            cartItems.map((cartItem) => (
              <div
              key={cartItem.cartId ?? `${cartItem.product.id}-${cartItem.userId}`}

                className="flex flex-col md:flex-row items-center gap-6 bg-white p-6 rounded-lg shadow hover:shadow-md transition"
              >
                {/* Product Image */}
                <img
                  src={cartItem.product.imageUrl}
                  alt={cartItem.product.name}
                  className="w-28 h-28 object-contain rounded-md"
                />
      
                {/* Product Details */}
                <div className="flex flex-1 flex-col gap-2">
                  <h2 className="text-lg font-bold text-gray-800">{cartItem.product.name}</h2>
                  <div className="flex items-center gap-4">
                    {/* <span className="text-xl font-bold text-red-600">₹{100}</span> */}
                  <div className="flex flex-col">
                    <span className="text-sm text-green-500">Price: ₹{cartItem.product.price}</span>
                    <span className="text-sm text-gray-600 font-semibold mt-2">
                      Total: <span className="font-bold">₹ {cartItem.product.price * cartItem.quantity}</span>
                    </span>
                  </div>                  
                </div>
              </div>
      
                {/* Quantity Controls */}
                <div className="flex items-center gap-2">
                  <span className="text-gray-600">Qty:</span>
                  <div className="flex items-center border rounded px-2 py-1">
                    <button
                      className="px-2 text-lg text-gray-700 hover:text-red-600 transition hover:cursor-pointer font-bold"
                      onClick={() =>
                        updateQuantity(
                          cartItem.product.id,
                          cartItem.itemId,
                          cartItem.quantity - 1
                        )
                      }
                    >
                      -
                    </button>
                    <span className="px-3">{cartItem.quantity || 1}</span>
                    <button
                      className="px-2 text-lg text-gray-700 hover:text-green-600 transition hover:cursor-pointer font-bold"
                      onClick={() =>
                        updateQuantity(
                          cartItem.product.id,
                          cartItem.itemId,
                          cartItem.quantity + 1
                        )
                      }
                    >
                      +
                    </button>
                  </div>
                </div>
      
                {/* Action Buttons */}
                <div className="flex flex-col md:flex-row gap-2 min-w-[150px]">
                <BuyNowButton product={cartItem.product} user={user} />

                  <button
                    className="border  text-red-500 p-2 rounded hover:bg-red-500 hover:text-white cursor-pointer"
                    onClick={() => {
                      deleteFromCart(cartItem.product.id);
                    }}
                  >
                    <Trash2 size={20}/>
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500 text-lg mt-20">
                Your cart is empty.
            </p>
          )}
        </div>
       
       {/* Cost Summary Section */}
{cartItems.length > 0 && (
  <div className="max-w-5xl mx-auto px-6 mt-4 mb-36">
    <div className="bg-white p-4 rounded-lg shadow-md w-full md:w-1/2 ml-auto">
      <h4 className="text-md font-semibold text-gray-700 mb-2">Cost Summary</h4>

      <div className="flex justify-between text-gray-600 mb-1">
        <span>Subtotal</span>
        <span>₹{subtotal}</span>
      </div>

      <div className="flex justify-between text-gray-600 mb-1">
        <span>Shipping</span>
        <span>{shipping === 0 ? "Free" : `₹${shipping}`}</span>
      </div>

      <div className="flex justify-between text-gray-600 mb-1">
        <span>Tax (5%)</span>
        <span>₹{tax}</span>
      </div>

      <div className="flex justify-between font-bold text-gray-800 border-t pt-2 mt-2 mb-4">
        <span>Total</span>
        <span>₹{total}</span>
      </div>

      {/* Proceed to Checkout Button */}
      <button
        className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-md transition"
        onClick={() => {
          window.scrollTo({ top: 0, behavior: "smooth" });
          router.push(`/checkout?userId=${userId}`); // Update route as needed
        }}
      >
        Proceed to Checkout
      </button>
    </div>
  </div>
)}


      </div>
      
    )
}