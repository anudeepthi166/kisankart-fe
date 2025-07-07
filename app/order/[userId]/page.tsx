"use client"

import Header from "@/components/header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import axios from "axios"
import { useParams, useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export default function Orders() {
  const router = useRouter();
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const { userId } = useParams();
  const [user, setUser] = useState<null | string>(null);
  const [orders, setOrders] = useState<any[]>([]);

  useEffect(() => {
    const userFromStorage = localStorage.getItem('kisanKart_userId');
    if (userFromStorage) {
      setUser(userFromStorage);
      fetchOrders();
    } else {
      router.push('/');
    }
  }, [router]);

  const fetchOrders = async () => {
    try {
      const res = await axios.get(`${API_URL}/order/user/${userId}`);
      console.log(res.data);
      setOrders(res.data);
    } catch (err: any) {
      console.log("Error while fetching orders: ", err);
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Orders List */}
      <div className="flex flex-col gap-6 p-6 max-w-5xl mx-auto">
        {orders.length > 0 ? (
          orders.map((order) => (
            <Card key={order.id} className="shadow hover:shadow-md transition">
              <CardHeader>
                <CardTitle className="flex flex-col md:flex-row justify-between items-center text-lg">
                  <span>Order ID: {order.id}</span>
                  <span className="text-sm text-green-600">{order.status}</span>
                </CardTitle>
              </CardHeader>

              <CardContent className="flex flex-col gap-4">
                {/* Order Items */}
                {order.OrderItems.map((item: any) => (
                  <div
                    key={item.id}
                    className="flex flex-col md:flex-row items-center gap-4 border-b pb-4"
                  >
                    <img
                      src={item.Product.imageUrl}
                      alt={item.Product.name}
                      className="w-24 h-24 object-contain rounded-md"
                    />
                    <div className="flex flex-col flex-1">
                      <h2 className="text-md font-semibold text-gray-800">{item.Product.name}</h2>
                      <span className="text-sm text-gray-600">Price: ₹{item.price}</span>
                      <span className="text-sm text-gray-600">Quantity: {item.quantity}</span>
                    </div>
                  </div>
                ))}
              </CardContent>

              <CardHeader className="flex justify-end pt-0">
                <div className="text-right">
                  <div className="text-md font-bold text-gray-700">Total: ₹{order.totalAmount}</div>
                </div>
              </CardHeader>
            </Card>
          ))
        ) : (
          <p className="text-center text-gray-500 text-lg mt-20">
            You have no orders yet.
          </p>
        )}
      </div>
    </div>
  );
}
