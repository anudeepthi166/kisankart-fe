"use client";
import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation"

type ImageCardProps = {
    images : string[],
    heading: string,
    paragraph: string,
    link:string

}
export default function ImageCard({images, heading, paragraph, link}: ImageCardProps){
  const router = useRouter() 

  return (
      <div className="flex w-1/4 shadow-lg flex-col gap-2 p-4 rounded-lg transition-transform duration-300 transform hover:scale-110">
      {/* Image Grid Section */}
      <div className="flex gap-2 ">
        <div className="flex-1 overflow-hidden">
          <img 
            src={images[0]} 
            alt="some image"  
            className="w-full h-full object-cover transition-transform duration-300 transform hover:scale-110"
          />
        </div>  
        <div className="flex-1  overflow-hidden">
          <img 
            src={images[1]} 
            alt="some image"  
            className="w-full h-full object-cover transition-transform duration-300 transform hover:scale-110"
          />
        </div>
      </div>
    
      <div className="flex gap-2 mt-4">
        <div className="flex-1 overflow-hidden">
          <img 
            src={images[2]} 
            alt="some image"  
            className="w-full h-full object-cover transition-transform duration-300 transform hover:scale-110"
          />
        </div>
        <div className="flex-1 overflow-hidden">
          <img 
            src={images[3]} 
            alt="some image"  
            className="w-full h-full object-cover transition-transform duration-300 transform hover:scale-110"
          />
        </div>
      </div>
    
      {/* Text and Button Section */}
      <div className="text-center mt-4">
        <h2 className="text-2xl font-semibold text-gray-800">{heading}</h2>
        <p className="text-gray-600 mt-2 text-sm">{paragraph}</p>
        <button 
          className="flex ml-18 mt-4 py-2 px-6 border border-2 border-green-600 text-green-600 font-bold rounded-md hover:bg-green-600 hover:text-white transition-colors duration-300 hover:cursor-pointer"
          onClick={()=> {
            const category = link
            router.push(`/category/${category}`)}}
        >
          <span>See more</span>
          <span><ArrowRight className="ml-2 w-5 h-7"/></span>
        </button>
      </div>
    </div>
    
    )
}