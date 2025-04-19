"use client"

import { useRef } from "react"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Autoplay from "embla-carousel-autoplay"
import Header from "../header/page"
import Link from "next/link"

const products = [
  {
    id: 1,
    name: "Organic Pesticide",
    image: "/KisanKart.png",
    price: 299,
    offerPrice: 199,
  },
  {
    id: 2,
    name: "Insect Killer",
    image: "/KisanKart.png",
    price: 399,
    offerPrice: 249,
  },
  {
    id: 3,
    name: "Growth Booster",
    image: "/KisanKart.png",
    price: 199,
    offerPrice: 149,
  },
  {
    id: 4,
    name: "Soil Enhancer",
    image: "/KisanKart.png",
    price: 499,
    offerPrice: 349,
  },
]

export default function HomePage() {
  const autoplay = useRef(Autoplay({ delay: 3000 }))

  return (
    <div>
      <Header />
      <div className="p-6 bg-gradient-to-b from-green-100 via-gray-200 to-gray-100 min-h-screen">
        {/* Carousel Section */}
        <div className="flex justify-center mb-10">
          <Carousel opts={{ loop: true }} plugins={[autoplay.current]} className="relative w-full rounded-xl shadow-xl overflow-hidden max-w-5xl">
            <CarouselContent>
              {[1, 2, 3].map((i) => (
                <CarouselItem key={i} className="flex justify-center items-center">
                  <img
                    src="/KisanKart.png"
                    alt={`Slide ${i}`}
                    className="w-full h-[300px] object-cover rounded-xl"
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="absolute left-3 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white rounded-full shadow-md" />
            <CarouselNext className="absolute right-3 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white rounded-full shadow-md" />
          </Carousel>
        </div>

        {/* Product Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {products.map((product) => (
           <Link href={`/product/${product.id}`} key={product.id}>
           <Card className="cursor-pointer shadow-md hover:shadow-xl transition-shadow duration-300">
             <img src={product.image} alt={product.name} className="w-full h-48 object-cover rounded-t-md" />
             <CardHeader className="pt-4 pb-0">
               <CardTitle className="text-lg text-green-800">{product.name}</CardTitle>
             </CardHeader>
             <CardContent className="pt-2">
               <div className="flex items-center gap-2">
                 <span className="text-xl font-semibold text-red-600">₹{product.offerPrice}</span>
                 <span className="text-gray-500 line-through">₹{product.price}</span>
                 <span className="ml-auto text-sm text-white bg-red-500 px-2 py-1 rounded">Save ₹{product.price - product.offerPrice}</span>
               </div>
             </CardContent>
             <CardFooter className="flex justify-between">
               <Button className="bg-green-600 text-white hover:bg-green-700">Add to Cart</Button>
               <Button variant="outline" className="border-green-700 text-green-700 hover:bg-green-100">Buy Now</Button>
             </CardFooter>
           </Card>
         </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
