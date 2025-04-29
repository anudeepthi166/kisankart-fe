"use client"
import Header from "@/components/header"
import Products from "@/components/products"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"
import axios from "axios"
import { useParams, useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"

export default function Category(){
    const router = useRouter()
    const {category} = useParams()
    const API_URL = process.env.NEXT_PUBLIC_API_URL
    const [products, setProducts] = useState<any[]>([])
    const [user, setUser] = useState<null|string>()
    const [userRole, setUserRole] = useState<null|string>()

    const getProductsByCategory = async() =>{
        try{
          console.log(category)
          const res = await axios.get(`${API_URL}/product?category=${category}`)
          console.log("products by category-->",res)
          if(res.status === 200){
            setProducts(res.data.products)
          }
        }
        catch(err:any){
          console.log("Error while getting products", err)
        }
      }

      useEffect(()=>{
        const user = localStorage.getItem('kisanKart_userId')
        const userRole = localStorage.getItem('kisanKart_userRole')
        setUser(user)
        setUserRole(userRole)
        getProductsByCategory()
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

      return(
        <div>
            <Header/>
            <h2 className="text-4xl font-bold text-green-700 mb-6 tracking-wide capitalize text-center mt-5">
                {products.length > 0 && products[0].category}
            </h2>
            <div className="ml-15 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3 mt-6">
                
                    {products && products.length !== 0 && products.map((product: any) => (
                        <Card 
                            key={product.id} 
                            className="flex flex-col cursor-pointer shadow-md hover:shadow-xl "
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

                            <CardFooter className="flex justify-center gap-2 ">
                            <Button 
                                className="flex-1 border border-2 bg-white border-green-600 text-green-600 hover:bg-green-600 hover:text-white -mt-15 cursor-pointer"
                                onClick={(e) => {
                                e.stopPropagation()
                                addToCart(product);
                                }}
                            >
                                Add to Cart
                            </Button>
                            <Button 
                                className="flex-1 bg-green-600 text-white hover:bg-green-700 -mt-15 cursor-pointer"
                                onClick={(e) => {
                                e.stopPropagation()
                                addToCart(product);
                                }}
                            >
                                Buy now
                            </Button>
                            </CardFooter>
                        </Card>
                    ))}
            </div>
        </div>
    )
}