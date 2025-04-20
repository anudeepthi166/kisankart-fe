type productPropsType ={
    products: any[]
}
import Link from "next/link";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "./ui/card";
import { Button } from "./ui/button";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";


export default function Products({products}: productPropsType){
    const router = useRouter()
    const API_URL = process.env.NEXT_PUBLIC_API_URL
    const [user, setUser] = useState<null|string>(null)

    useEffect(()=>{
      const localUser = localStorage.getItem('kisanKart_userId')
      setUser(localUser);
    },[])
    
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
          if(res.status === 200){
            toast.success("Product added to cart")
          }
        }
    
        catch(err:any){
          console.log("Error while adding to cart-->", err)
        }
      }
    
    return(
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 mt-6">
        
            {products && products.length !== 0 && products.map((product: any) => (
                <Card 
                    key={product.id} 
                    className="flex flex-col cursor-pointer shadow-md hover:shadow-xl transition-transform duration-300 transform hover:scale-110"
                    onClick={() => {
                        router.push(`/product/${product.id}`)}}
                >
                    <img 
                    src={product.imageUrl} 
                    alt={product.name} 
                    className="w-full h-38 object-contain rounded-t-md" 
                    />
                    
                    <CardHeader >
                    <CardTitle className="text-xl text-green-800 font-bold">{product.name}</CardTitle>
                    </CardHeader>

                    <CardContent className="flex flex-col gap-2 flex-grow justify-between -mt-5 mb-10">
                    <div className="text-lg font-semibold text-green-800">₹{product.price}</div>
                    <div className="text-sm text-gray-600  -mt-3">{product.category}</div>
                    </CardContent>

                    <CardFooter className="flex justify-between gap-2 ">
                    <Button 
                        className="flex-1 bg-green-600 text-white hover:bg-green-700 -mt-15"
                        onClick={(e) => {
                          e.stopPropagation()
                        addToCart(product);
                        }}
                    >
                        Add to Cart
                    </Button>
                   
                    </CardFooter>
                </Card>
            ))}
      </div>
    )
}