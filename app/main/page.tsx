"use client";

import { useRouter } from "next/navigation";
import Login from "../login/page";
import SignUp from "../signUp/page";
import { useEffect, useState } from "react";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loading from "@/components/loading";

export default function Main() {
  const router = useRouter()
  const [signUpOpen, setSignUpOpen] = useState(false)
  const [products, setProducts] = useState<any[]>([])
  const [user, setUser] = useState<null|string>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const userFromStorage = localStorage.getItem('kisanKart_userId');
    
    if (userFromStorage) {
      setUser(userFromStorage);
      router.replace('/home');
    }
    setIsLoading(false);
  }, []);

  if(isLoading){
    return <Loading/>
  }
  
   
  return (
   <>
    {!isLoading && <> 
      <div className="flex w-full">
      <div className="w-[60%]">
        <img src="KisanKart.png" className="h-screen w-full object-cover" />
      </div>
      <div className="w-[40%]">
        <div className="flex items-center justify-center h-screen w-full bg-gray-200">
          <div className="w-[70%] shadow-md px-8 py-5  rounded-md bg-gray-100">
              {!signUpOpen 
              ? <>
                  <Login /> 
                  <div className="text-green-700 font-bold underline mt-4 text-center cursor-pointer" onClick={() => setSignUpOpen(true)}>Don't have an account? register here</div>
                </>
              :<>
                <SignUp/>
                <div  className="text-green-700 font-bold underline mt-4 text-center cursor-pointer" onClick={() => setSignUpOpen(false)}>Already have an account? login here</div>
              </>
              }
          </div>
        </div>

      </div>
      </div>
      <ToastContainer/>
    </>}
   </>
    

  )
}
