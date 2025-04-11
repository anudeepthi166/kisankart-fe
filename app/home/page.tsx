"use client"

import { useRef } from "react"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Autoplay from "embla-carousel-autoplay"

export default function HomePage() {
  const autoplay = useRef(Autoplay({ delay: 3000 }))

  return (
    <div>
        <div className="p-6 bg-gradient-to-b from-green-100 via-gray-200 to-gray-100 ">
            {/* Carousel Section */}
            <div className="flex justify-center">
                <Carousel
                opts={{ loop: true }}
                plugins={[autoplay.current]}
                className="relative w-full rounded-xl shadow-xl overflow-hidden"
                >
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
             {/* Cards Section */}
      <div className="grid grid-cols-3 gap-10 mt-10">
        <Card className="w-full max-w-4xl shadow-xl rounded-none">
          <CardHeader>
            <CardTitle className="text-green-800">Our Products</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-2">
              {[1, 2, 3, 4].map((i) => (
                <img
                  key={i}
                  src="/KisanKart.png"
                  alt={`Image ${i}`}
                  className="w-full h-28 object-cover rounded-lg"
                />
              ))}
            </div>
          </CardContent>
          <CardFooter className="justify-center">
            <Button variant="outline" className="text-green-700 border-green-700 hover:bg-green-100">
              See More
            </Button>
          </CardFooter>
        </Card>
        <Card className="w-full max-w-4xl shadow-xl rounded-none">
          <CardHeader>
            <CardTitle className="text-green-800">Our Products</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <img
                  key={i}
                  src="/KisanKart.png"
                  alt={`Image ${i}`}
                  className="w-full h-28 object-cover rounded-lg"
                />
              ))}
            </div>
          </CardContent>
          <CardFooter className="justify-center">
            <Button variant="outline" className="text-green-700 border-green-700 hover:bg-green-100">
              See More
            </Button>
          </CardFooter>
        </Card>
        <Card className="w-full max-w-4xl shadow-xl rounded-none">
          <CardHeader>
            <CardTitle className="text-green-800">Our Products</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <img
                  key={i}
                  src="/KisanKart.png"
                  alt={`Image ${i}`}
                  className="w-full h-28 object-cover rounded-lg"
                />
              ))}
            </div>
          </CardContent>
          <CardFooter className="justify-center">
            <Button variant="outline" className="text-green-700 border-green-700 hover:bg-green-100">
              See More
            </Button>
          </CardFooter>
        </Card>
        <Card className="w-full max-w-4xl shadow-xl rounded-nonne">
          <CardHeader>
            <CardTitle className="text-green-800">Our Products</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <img
                  key={i}
                  src="/KisanKart.png"
                  alt={`Image ${i}`}
                  className="w-full h-28 object-cover rounded-lg"
                />
              ))}
            </div>
          </CardContent>
          <CardFooter className="justify-center">
            <Button variant="outline" className="text-green-700 border-green-700 hover:bg-green-100">
              See More
            </Button>
          </CardFooter>
        </Card>
      </div>
        </div>
         
       
    </div>
  )
}
