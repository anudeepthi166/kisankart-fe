'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import AddProduct from '../addProduct/page';
import { ToastContainer } from 'react-toastify';

export default function Header() {
  const router = useRouter();
  const [showModal, setShowModal] = useState(false)

  return (
    <div>
      <div className="flex justify-between items-center px-5 py-3 shadow-md">
        {/* Logo */}
        <div>
          <img src="KisanKart.png" className="w-24 h-12 object-contain" alt="KisanKart" />
        </div>

        {/* Buttons */}
        <div className="flex gap-4">
          <button
              onClick={() => {setShowModal(true)}}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
            >
              Add product
          </button>
          <button
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
              onClick={()=> router.push(`/cart/${12}`)}
            >
              Cart
          </button>
          <button
            onClick={() => router.push('/signUp')}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
          >
            Sign Up
          </button>
          <button
            onClick={() => router.push('/login')}
            className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition"
          >
            Login
          </button>
          <button
            onClick={() => router.push('/login')}
            className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition"
          >
            Logout
          </button>
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
