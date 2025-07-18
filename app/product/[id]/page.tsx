"use client"

import Header from "@/components/header"
import Loading from "@/components/loading"
import Products from "@/components/products"
import axios from "axios"
import { useParams, useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import BuyNowButton from "@/components/buyButton"
import { Heart, MapPin } from "lucide-react"


export default function ProductDetailPage() {
  const router = useRouter()
  const API_URL = process.env.NEXT_PUBLIC_API_URL
  const { id } = useParams()
  const [product, setProduct] = useState<any>({})
  const [products, setProducts] = useState<any[]>([])
  const [user, setUser] = useState<null | string>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isAddingToCart, setIsAddingToCart] = useState(false) 
  const [address, setAddress]=useState<any>({})

  useEffect(()=>{
    getUserAddress()
  }, [user])

  const getUserAddress = async()=>{
    try {
      const response = await axios.get(`${API_URL}/user/address/${user}`);
      if(response?.data?.address){
        setAddress(response.data.address);
      }
    } catch (err) {
      console.log(err);
    }
}

  const getProduct = async () => {
    try {
      const res = await axios.get(`${API_URL}/product/${id}`)
      if (res.status === 200) {
        setProduct(res.data.products) 
      }
    } catch (err) {
      console.log("Error while getting product by id", err)
      toast.error("Failed to load product details")
    }
  }

  const getAllProducts = async () => {
    try {
      const res = await axios.get(`${API_URL}/product/?categoryFlag=true`)
      if (res.status === 200) {
        setProducts(res.data.products.test) // Assuming "products" is the correct key in the response
      }
    } catch (err: any) {
      console.log("Error while getting products", err)
      toast.error("Failed to load products")
    }
  }


  useEffect(()=>{
      getProduct()
  },[])

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

  const addToCart = async (product: any) => {
    setIsAddingToCart(true) // Disable button when adding to cart
    try {
      const res = await axios.post(`${API_URL}/cart`, {
        'userId': user,
        'productId': product.id,
        'quantity': 1
      }, {
        headers: {
          'Accept': 'application/json'
        }
      })
      if (res.status === 200) {
        toast.success("Product added to cart")
      } else {
        toast.warn("Something went wrong")
      }
    } catch (err: any) {
      console.log("Error while adding to cart-->", err)
      if (err.message) {
        toast.error(err.message)
      }
    } finally {
      setIsAddingToCart(false) // Enable button after request completes
    }
  }

  if (isLoading) {
    return <Loading />
  }

  if (!product.id) { // Check for valid product
    return <div className="p-10 text-center text-red-600">Product not found</div>
  }

  const createOrder = async(product: any)=>{
    try {
      const res = await axios.post(`${API_URL}/order`, {
        'userId': user,
        'totalAmount': 300,
        "items": [
          { "productId": 14, "quantity": 2, "price": 100 },
          { "productId": 15, "quantity": 1, "price": 100 }
        ]
      }, {
        headers: {
          'Accept': 'application/json'
        }
      })
      if (res.status === 201) {
        toast.success("Order placed successfully")
      } else {
        toast.warn("Something went wrong")
      }
    } catch (err: any) {
      console.log("Error while placing odrder-->", err)
      if (err.message) {
        toast.error(err.message)
      }
    } 
  }

  return (
    <>
      <Header/>
      <div className="p-10 max-w-4xl mx-auto bg-white">
        <div className="flex gap-5">
          <div className="flex-1 relative">
            <img
              src={product.imageUrl}
              alt={product.name}
              className="w-full h-[300px] object-contain rounded-lg mb-6"
            />
            <button className="absolute top-2 right-15 p-2 bg-white rounded-full shadow cursor-pointer group"
              onClick={(e:any)=>{e.stopPropagation()}}
              >
              <Heart className={`w-5 h-5 transition-colors duration-300 ${ 
                product.isWishListed 
                ?'fill-red-500 text-red-500'
                :'text-gray-400 group-hover:fill-red-500 group-hover:text-red-500'
              }` }/>
            </button>
          </div>
          <div className="flex-1 my-auto">
            <h1 className="text-3xl font-bold text-green-800 mb-2">{product.name}</h1>
            <p className="text-gray-700 text-lg mb-4">{product.description}</p>
            <div className="flex flex-col gap-3 mb-4">
              <div className="text-xl font-bold text-green-900">₹{product.price}</div>
              <div>
              <strong>Used for: </strong>
            </div>
            </div>
           
            <div className="flex gap-4 ">
              <button
                className="border border-green-600 text-green-600 hover:text-white hover:bg-green-600 px-6 py-2 rounded hover:bg-green-700  hover:cursor-pointer"
                onClick={() => addToCart(product)}
                disabled={isAddingToCart} // Disable button while adding to cart
              >
                {isAddingToCart ? "Adding..." : "Add to Cart"}
              </button>
              {/* <button className="border border-green-700 text-green-700 px-6 py-2 rounded hover:bg-green-100"
                 onClick={() => createOrder(product)}>
                Buy Now
              </button> */}
              <BuyNowButton product={product} user={user} />

            </div>
            <div className="mt-2 -ml-3 flex items-center gap-2 p-2 rounded-md hover:bg-gray-100 cursor-pointer">
              <div className="text-green-600">
                <MapPin className="w-6 h-6" />
              </div>
              <div className="flex flex-col leading-tight">
                <span className="text-xs text-gray-500">Delivering to    
                  <span className="text-sm text-gray-800 ml-1">{address.city} {address.postalCode }</span>
                </span>
                <span className="text-sm font-semibold text-green-800">Update location</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="p-5">
        <Products products={products} />
      </div>

    </>
   
  )
}
