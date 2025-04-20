'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import AddProduct from '../add_product/page';
import { toast, ToastContainer } from 'react-toastify';
import { CircleUser, LogOut } from 'lucide-react';
import Loading from '@/components/loading';

export default function Header() {
  const router = useRouter();
  const pathName = usePathname();
  const [showModal, setShowModal] = useState(false)
  const [user, setUser] = useState<null|string>(null)
  const [userRole, setUserRole] = useState<null|string>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [open, setOpen] = useState(false);

  useEffect(()=>{
    getUserFromLocalStorage()
  },[])
  const getUserFromLocalStorage = ()=>{
    const user = localStorage.getItem('kisanKart_userId')
    const userRole = localStorage.getItem('kisanKart_userRole')
    setUser(user)
    setUserRole(userRole)
    setIsLoading(false)
  }

  const handleLogout = ()=>{
    localStorage.removeItem('kisanKart_userId')
    toast.warn('Successfully logged out')
    router.push('/')
  }

  const getButtonClass = (target: string) => (
    pathName.startsWith(target)
      ? 'text-white font-medium transition bg-green-700 p-2 rounded-md hover:cursor-pointer'
      : 'text-green-700 font-medium hover:border-b-2 hover:border-green-700 transition hover:cursor-pointer'
  );

  return (
    <div className="w-full shadow-md bg-white sticky top-0 z-50">
      <div className="flex justify-between items-center pr-6 py-1">
        {/* Logo */}
          <img src="KisanKart.png" className="w-20 h-12 object-contain hover:cursor-pointer" alt="KisanKart"  onClick={()=>{router.push('/home')}}/>


        {/* Buttons */}
        <div className="flex items-center gap-6 ">
          <button
            onClick={() => router.push('/home')}
            className={getButtonClass('/home')}
          >
            Home
          </button>
          {userRole === 'Admin' &&
            <button
            onClick={() => {
              router.push(`/add_product`)}}
            className={getButtonClass('/addProduct')}
          >
            Add Product
            </button>
          }
          <button
            onClick={() => {router.push(`/cart/${user}`)}}
            className={getButtonClass('/cart')}
          >
            Cart
          </button>
          <button
            onClick={() => router.push(`/order/${user}`)}
            className={getButtonClass('/orders')}
          >
            Orders
          </button>

          <div className="relative">
            <CircleUser
              className="w-7 h-7 text-green-800 cursor-pointer hover:scale-105 transition"
              onClick={() => setOpen(!open)}
            />
            {open && (
              <div className="absolute right-0 mt-2 w-36 bg-white border border-gray-300 rounded-md shadow-md rounded-tr-none">
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 w-full px-4 py-2 text-sm text-green-800 hover:bg-gray-100 rounded-md "
                >
                  <LogOut /> Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modal
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white rounded-md p-8 w-[600px] max-h-[90vh] overflow-y-auto relative">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-2 right-2 text-green-600 text-2xl hover:text-gray-900 transition"
            >
              ✖
            </button>
            <AddProduct />
          </div>
        </div>
      )} */}

      <ToastContainer />
    </div>

  );
}
