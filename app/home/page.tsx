"use client"

import { useEffect, useRef, useState } from "react"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Autoplay from "embla-carousel-autoplay"
import Header from "../header/page"
import Link from "next/link"
import axios from "axios"
import Loading from "@/components/loading"
import { useRouter } from "next/navigation"
import { toast } from "react-toastify"
import ImageCard from "@/components/imageCard"
import Products from "@/components/products"

export default function HomePage() {
  const router = useRouter()
  const API_URL = process.env.NEXT_PUBLIC_API_URL
  const autoplay = useRef(Autoplay({ delay: 3000 }))

  const [products, setProducts] = useState<any[]>([])
  const [user, setUser] = useState<null|string>(null)
  const [isLoading, setIsLoading] = useState(true)

  
  const getAllProducts = async() =>{
    try{
      const res = await axios.get(`${API_URL}/product`)
      console.log("all products-->",res)
      if(res.status === 200){
        setProducts(res.data.products.test)
      }
    }
    catch(err:any){
      console.log("Error while getting products", err)
    }
  }
  
  useEffect(() => {
    const userFromStorage = localStorage.getItem('kisanKart_userId')
    if (userFromStorage) {
      setUser(userFromStorage)
      setIsLoading(false)
      getAllProducts()
    } else {
      router.push('/')
    }
  }, [router])
  
  if (isLoading) {
    return <Loading />
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
      if(res.status===200){
        toast.success("Product added to cart")
      }
      else{
        toast.warn("Something went wrong")
      }
    }
    catch(err:any){
      console.log("Error while adding to cart-->", err)
      if(err.message){
        toast.error(err.message)
      }
    }
  }

  return (
    <div className="p-5 bg-gradient-to-b from-green-100 via-gray-200 to-gray-100 min-h-screen">
      <Header />
      <div >
        {/* Carousel Section */}
        <div className="flex justify-center mb-5 mt-5">
          <Carousel opts={{ loop: true }} plugins={[autoplay.current]} className="relative w-full rounded-xl overflow-hidden">
            <CarouselContent>
              {[1, 2, 3].map((i) => (
                <CarouselItem key={i} className="flex w-full items-center justify-center">
                   <div className="flex items-center justify-center text-green-800 p-4">
                    <div className="text-center">
                      <h2 className="text-2xl font-semibold mb-2">Product {i}</h2>
                      <p className="text-sm">Discover our amazing product range. Get started with KisanKart today!</p>
                    </div>
                  </div>
                  <div className="">
                    <img
                      src="/KisanKart.png"
                      alt={`Slide ${i}`}
                      className="w-full h-[230px] object-contain rounded-l-xl"
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="absolute left-3 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white rounded-full shadow-md" />
            <CarouselNext className="absolute right-3 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white rounded-full shadow-md" />
          </Carousel>
        </div>

        {/* Product Cards */}
        <div className="flex w-full gap-6">
              <ImageCard
                images={["KisanKart.png", "KisanKart.png", "KisanKart.png", "KisanKart.png" ]}
                heading= "Heading realted to images"
                paragraph="some dummy text"
                link={'http'}
              />
              <ImageCard
                images={["KisanKart.png", "KisanKart.png", "KisanKart.png", "KisanKart.png" ]}
                heading= "Heading realted to images"
                paragraph="some dummy text"
                link={'http'}
              />
              <ImageCard
                images={["KisanKart.png", "KisanKart.png", "KisanKart.png", "KisanKart.png" ]}
                heading= "Heading realted to images"
                paragraph="some dummy text"
                link={'http'}
              />
              <ImageCard
                images={["KisanKart.png", "KisanKart.png", "KisanKart.png", "KisanKart.png" ]}
                heading= "Heading realted to images"
                paragraph="some dummy text"
                link={'http'}
              />

        </div>

        <Products products={products}/>
      </div>
    </div>
  )
}
