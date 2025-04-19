'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import AddProduct from '../addProduct/page';
import { toast, ToastContainer } from 'react-toastify';
import { CircleUser, LogOut } from 'lucide-react';
import Loading from '@/components/loading';

export default function Header() {
  const router = useRouter();
  const [showModal, setShowModal] = useState(false)
  const [user, setUser] = useState<null|string>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [open, setOpen] = useState(false);

  useEffect(()=>{
    getUserFromLocalStorage()
  },[])
  const getUserFromLocalStorage = ()=>{
    const user = localStorage.getItem('kisanKart_userId')
    setUser(user)
    setIsLoading(false)
  }

  if(isLoading){
    return <Loading/>
  }

  const handleLogout = ()=>{
    localStorage.removeItem('kisanKart_userId')
    toast.warn('Successfully logged out')
    router.push('/')
  }

  return (
    <div>
      <div className="flex justify-between items-center px-4 ">
        {/* Logo */}
        <div>
          <img src="KisanKart.png" className="w-24 h-12 object-contain" alt="KisanKart" />
        </div>

        {/* Buttons */}
        <div className="flex gap-4">
          <button
              onClick={() => {setShowModal(true)}}
              className="text-green-700 p-2 hover:cursor-pointer transition hover:border hover:border-green-700"
            >
              Add product
          </button>
          <button
              className="text-green-700 p-2 hover:cursor-pointer transition hover:border hover:border-green-700"
              onClick={()=> router.push(`/cart/${12}`)}
            >
              Cart
          </button>
          <button
              className="text-green-700 p-2 hover:cursor-pointer transition hover:border hover:border-green-700"
              onClick={()=> router.push(`/cart/${12}`)}
            >
              Orders
          </button>
          
          <CircleUser className="w-6 h-6 text-green-800 my-2" onClick={() => setOpen(!open)}/>
          {open && (
            <div className="absolute right-5 top-11 w-32 bg-white border border-gray-200 rounded-md shadow-lg z-10 rounded-tr-none">
              <button
                onClick={handleLogout}
                className=" flex gap-3 block w-full text-left px-4 py-2 text-sm text-green-800 hover:cursor-pointer hover:bg-gray-100  rounded-md rounded-tr-none"
              >
                <LogOut/>Logout
              </button>
            </div>
          )}
        </div>
        
      </div>
      <div>
        {showModal && (
          <div className="fixed inset-0 bg-gray-300 bg-opacity-40 flex items-center justify-center z-50">
            <div className="bg-white p-8 rounded-md w-[600px] max-h-[90vh] overflow-y-auto relative">
              {/* Close button */}
              <button
                onClick={() => setShowModal(false)}
                className="absolute top-2 right-2 text-green-600 hover:text-gray-900 text-2xl transition duration-200 hover:cursor-pointer"
              >
                ✖
              </button>


              {/* Render the AddProduct page here */}
              <AddProduct />
            </div>
          </div>
        )}
        <ToastContainer />
      </div>
    </div>
  );
}
