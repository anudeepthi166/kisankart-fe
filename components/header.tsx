'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import AddProduct from '../app/add_product/page';
import { toast, ToastContainer } from 'react-toastify';
import { CircleUser, MapPin, LogOut, Search, ShoppingCart, Package, Heart, Plus, UserRoundPen, ChevronDown } from 'lucide-react';
import Loading from '@/components/loading';
import axios from 'axios';
import Cart from '../app/cart/[userId]/page';
import KisanKartLogo from '../public/KisanKart.png'
import Image from 'next/image';
import { useDispatch } from 'react-redux';
import { setProducts } from '@/store/productSlice';
import Modal from './ui/modal';
import Address from './ui/address';

export default function Header() {
  const router = useRouter();
  const pathName = usePathname();
  const API_URL = process.env.NEXT_PUBLIC_API_URL
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [user, setUser] = useState<null|string>(null)
  const [userRole, setUserRole] = useState<null|string>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [open, setOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('')
  const [searchText, setSearchText] = useState('')
  const [openCategory, setOpenCategory] = useState(false)
  const [address, setAddress]=useState<any>()
  const categories = [
    { label: "All", value: "" },
    { label: "Pesticides", value: "Pesticides" },
    { label: "Insecticides", value: "Insecticides" },
    { label: "Seeds", value: "Seeds" },
    { label: "Fertilizers", value: "Fertilizers" },
    { label: "Farm tools", value: "FarmTools" }
  ];
  const dispatch = useDispatch()

  useEffect(()=>{
    getUserFromLocalStorage()
  },[])
  useEffect(()=>{
    if(user){
      getUserAddress()}
  }, [user])
  const getUserFromLocalStorage = ()=>{
    const user = localStorage.getItem('kisanKart_userId')
    const userRole = localStorage.getItem('kisanKart_userRole')
    setUser(user)
    setUserRole(userRole)
    setIsLoading(false)
  }

  const getUserAddress = async()=>{
      try {
        const response = await axios.get(`${API_URL}/user/address/${user}`);
        console.log(response)
        if(response?.data?.address){
          let userAddresses = response.data.address
          let selectedAdd = userAddresses.filter((add: any)=> add.isSelected == true)
          console.log(selectedAdd[0])
          setAddress(selectedAdd[0])
        }
      } catch (err) {
        console.log(err);
      }
  }

  const handleLogout = ()=>{
    localStorage.removeItem('kisanKart_userId')
    toast.warn('Successfully logged out')
    router.push('/')
  }


  const handleCategoryChange = async(category:string)=>{
    if(!category) {
      const currentURL = window.location.href
      if(currentURL === "http://localhost:3000/home") {
        return
      }
      else {
        router.push(`/home`)
        return
      }
    }
    setSelectedCategory(category)
    router.push(`/category/${category}`)
  }
  const handleSearch = async()=>{
    if(!searchText){
      router.push('/home')
      return
    }
    let url = `${API_URL}/product/search?`
    if(selectedCategory){
      url+= `category=${selectedCategory}&`
    }
    url+= `productName=${searchText}`
    const res = await axios.get(url)
    const category = res.data?.products?.[0]?.category;
    //TODO: display only search results
    dispatch(setProducts(res.data.products))
    router.push(`/search_results/${searchText}`)
  }

  return (
    <div className="w-full shadow-md bg-white sticky top-0 z-50">
      <div className="flex justify-between items-center pr-6 py-1">
        {/* Logo */}
        <Image src={KisanKartLogo} className="ml-3 w-20 h-12 object-cover hover:cursor-pointer" alt="KisanKart"  onClick={()=>{router.push('/home')}}/>
        {/* Address */}
        <div className="flex items-center gap-2 p-2 rounded-md hover:bg-gray-100 cursor-pointer" onClick={()=>setIsModalOpen(true)}>
          <div className="text-green-600">
            <MapPin className="w-6 h-6" />
          </div>
          <div className="flex flex-col">
            {address ? <>
            <p className="text-xs text-gray-500">Deliver to  <span className='font-bold'>{address.fullName}</span>  </p>
            <p className="text-sm text-gray-800">{address.city} - {address.postalCode }</p>
            </>: <div>Add your address</div>
            }
          </div>
        </div>

        <div className="flex gap-2">
          <div className="flex bg-white shadow-md rounded-md border border-gray-100 w-[35rem]">
            
            {/* Dropdown */}
            <div className="relative inline-block w-20">
              <div
                className="rounded px-3 py-3  text-sm cursor-pointer select-none bg-gray-100 hover:border-green-400 transition-all w-full"
                onClick={(e) => {
                  e.stopPropagation(); // prevent closing immediately
                  setOpenCategory(!openCategory);
                }}
              >
                <div className='flex'>
                  {selectedCategory || "All"}
                  <span className='ml-auto'><ChevronDown/></span>
                </div>
              </div>

              {openCategory && (
                <div className='absolute left-0 w-30 z-50 rounded-md shadow-lg bg-white border border-gray-200'> {categories.map((category) => (
                    <div
                      key={category.value}
                      onClick={() => {
                        handleCategoryChange(category.value);
                        setOpenCategory(false); // close after selecting
                      }}
                      className="px-4 py-2 hover:bg-green-100 cursor-pointer text-sm transition-colors"
                    >
                      {category.label}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Search Input */}
            <input 
              type="text" 
              placeholder="Start your search here..." 
              className="flex-1 px-4 py-2 focus:outline-none text-md border border-gray-100 rounded"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleSearch();
                }
              }}
            />

            {/* Search Button */}
            <button className="p-2 bg-green-100 rounded" onClick={handleSearch}>
              <Search className="w-6 h-6 text-green-700" />
            </button>

          </div>
      </div>


        {/* Buttons */}
        <div className="flex items-center gap-6 ">
          <button
            onClick={() => {router.push(`/cart/${user}`)}}
            className="text-green-700 font-semibold hover:bg-green-100 p-1 rounded cursor-pointer"          
          >
            <div className='flex '>
              <ShoppingCart className='w-6 h-6 text-green-700'/>
               <span>Cart</span>
            </div>
          </button>
          <button
            onClick={() => {router.push(`/cart/${user}`)}}
            className="text-green-700 font-semibold hover:bg-green-100 p-1 rounded cursor-pointer"          
          >
            <div className='flex'>
              <Package className='w-6 h-6 text-green-700'/>
               <span>Orders</span>
            </div>
          </button>

          <div className="relative">
            <CircleUser
              className="w-7 h-7 text-green-800 cursor-pointer hover:scale-105 transition hover:bg-green-100  rounded hover:p-1 cursor-pointer"
              onClick={() => setOpen(!open)}
            />
            {open && (
              
              <div className="absolute right-0 mt-2 w-36 bg-white border border-gray-300 rounded-md shadow-md rounded-tr-none cursor-pointer">
                 {userRole === 'Admin' &&
                     <button
                     onClick={() => {
                      router.push(`/add_product`)}}
                     className="flex items-center gap-2 w-full px-4 py-2 text-sm text-green-800 hover:bg-gray-100 rounded-md cursor-pointer"
                   >
                     <Plus /> Add product
                   </button>
                  }
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 w-full px-4 py-2 text-sm text-green-800 hover:bg-gray-100 rounded-md cursor-pointer"
                >
                  <Heart /> Wish list
                </button>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 w-full px-4 py-2 text-sm text-green-800 hover:bg-gray-100 rounded-md cursor-pointer"
                >
                  <ShoppingCart /> Cart
                </button>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 w-full px-4 py-2 text-sm text-green-800 hover:bg-gray-100 rounded-md cursor-pointer"
                >
                  <Package /> Orders
                </button>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 w-full px-4 py-2 text-sm text-green-800 hover:bg-gray-100 rounded-md cursor-pointer "
                >
                  <MapPin /> Address
                </button>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 w-full px-4 py-2 text-sm text-green-800 hover:bg-gray-100 rounded-md cursor-pointer"
                >
                  <UserRoundPen /> Account
                </button>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 w-full px-4 py-2 text-sm text-green-800 hover:bg-gray-100 rounded-md cursor-pointer"
                >
                  <LogOut /> Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      <Modal isOpen={isModalOpen} title='Address' onClose={()=>setIsModalOpen(false)}>
        <Address/>
      </Modal>
      <ToastContainer />
    </div>

  );
}
