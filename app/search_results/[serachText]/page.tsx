"use client"
import Header from "@/components/header"
import Products from "@/components/products"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"
import { RootState } from "@/store/store"
import axios from "axios"
import { useParams, useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { toast } from "react-toastify"
import { usePathname } from "next/navigation"

export default function SearchResults(){
    const router = useRouter()
    const {category} = useParams()
    const products = useSelector((state: RootState)=> state.product.products )
    const API_URL = process.env.NEXT_PUBLIC_API_URL
    const [user, setUser] = useState<null|string>()
    const [userRole, setUserRole] = useState<null|string>()
    const pathname = usePathname().split('/')

      useEffect(()=>{
        const user = localStorage.getItem('kisanKart_userId')
        const userRole = localStorage.getItem('kisanKart_userRole')
        setUser(user)
        setUserRole(userRole)
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
              {products.length === 0 ?
               <h2 className="text-2xl font-bold text-green-700 mb-6 tracking-wide capitalize text-center mt-5">
                    No items found
                </h2>
               :<>
                  <h2 className="text-2xl font-bold text-green-700 mb-6 tracking-wide capitalize text-center mt-5">
                    Search results for {pathname[pathname.length-1]}
                </h2>
                <Products products={products}/>
               </>
              }
        </div>
    )
}