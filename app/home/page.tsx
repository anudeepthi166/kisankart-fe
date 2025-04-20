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

  const carouselItems = [
    {
      image: "carousel_1.png",
      heading: "Nourish Naturally",
      description: "Enrich your crops with powerful organic fertilizers, unlocking vibrant growth and lasting soil health."
    },
    {
      image: "carousel_2.png",
      heading: "Nature's Protection",
      description: "Shield your fields with eco-friendly solutions like seaweed and fish extracts, ensuring resilient and thriving harvests."
    },
    {
      image: "carousel_3.png",
      heading: "Pure Growth, Pure Harvest",
      description: "Cultivate stronger, healthier crops with trusted organic insecticides — for a safer farm and a richer yield."
    }
  ];
  
  const getAllProducts = async() =>{
    try{
      const res = await axios.get(`${API_URL}/product?categoryFlag=false`)
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
      const res = await axios.post(`${API_URL}/cart`,{
        'userId':user,
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
    <>
    <Header />
    <div className="p-5 bg-gradient-to-b from-green-100 via-gray-200 to-gray-100 min-h-screen">
      <div >
        {/* Carousel Section */}
        <div className="flex justify-center mb-5 mt-5">
          <Carousel opts={{ loop: true }} plugins={[autoplay.current]} className="relative w-full rounded-xl overflow-hidden">
            <CarouselContent>
              {carouselItems.map((carouselItem) => (
                <CarouselItem key={carouselItem.image} className="flex w-full items-center justify-center">
                   <div className="flex items-center justify-center text-green-800 p-4 w-1/2 -ml-20">
                    <div className="text-center">
                      <h2 className="text-2xl font-semibold mb-2">{carouselItem.heading}</h2>
                      <p className="text-sm break-words whitespace-pre-line w-1/2 mx-auto">{carouselItem.description}</p>
                    </div>
                  </div>
                  <div className="-ml-30">
                    <img
                      src={carouselItem.image}
                      alt={`farming related image`}
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
                images={["pest_1.png", "pest_2.png", "organic_pests.png", "organic_1.png" ]}
                heading= "Pesticides"
                paragraph="Protect your crops from harmful pests and diseases"
                link={'pesticides'}
              />
              <ImageCard
                images={["organic_insecticide_1.png", "organic_insecticide.png", "organic_insecticide_2.png", "organic_insecticide_3.png" ]}
                heading= "Isecticides"
                paragraph="Control and eliminate harmful insects that damage your crops"
                link={'insecticides'}
              />
              <ImageCard
                images={["fertilizer.png", "seeds.png", "fertile_land.png", "fertilizers_1.png" ]}
                heading= "Fertilizers"
                paragraph="Enrich the soil with essential nutrients  and improve your crop yields"
                link={'fertilizers'}
              />
              <ImageCard
                images={["spray.png", "gloves.webp", "sticky.jpg", "tools.jpg" ]}
                heading= "Farm tools"
                paragraph="Make farming more efficient and productive"
                link={'farmTools'}
              />

        </div>

        <Products products={products}/>
      </div>
    </div>

    </>
    
  )
}
