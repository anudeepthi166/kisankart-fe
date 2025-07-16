"use client";

import { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { v4 as uuidv4 } from "uuid";
import Header from "@/components/header";
import { CircleCheck, Pen, Trash2, Truck } from "lucide-react";
import AddressModal from "@/components/ui/address";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { setAddress } from "@/store/addressSlice";

// interface Address {
//   id: string;
//   fullName: string;
//   street: string;
//   city: string;
//   state: string;
//   pincode: string;
//   country: string;
// }

export default function Address() {
  const router = useRouter()
  const [addresses, setAddresses] = useState<[]>([]);
  const [user, setUser] = useState<Number|null>(null);
  const [selectedAddressId, setSelectedAddressId] = useState<string | null>(null);
  const [editingAddress, setEditingAddress] = useState<any>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(null); // for edit
  const dispatch = useDispatch()
  const API_URL = process.env.NEXT_PUBLIC_API_URL

  const handleAdd = () => {
    router.push("/address")

  };

  const handleEdit = (address: any) => {
    dispatch(setAddress(address))
    router.push("/address")
  };

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
    setUser(Number(user))
  }

  const getUserAddress = async()=>{
      try {
        const response = await axios.get(`${API_URL}/user/address/${user}`);
        console.log(response)
        const add = response?.data?.address
        if(response?.data?.address){
          setAddresses(add)
        }
        const selectedAdd = add?.filter((a:any)=> a.isSelected == true)
      } catch (err) {
        console.log(err);
      }
  }

  const handleDelivery = async(address: any) => {
      try{
        const res = await axios.put(`${API_URL}/user/${user}/address/${address.id}`)
        if(res.status===200){
          toast.success("Delivery address changed")
        }
      }
      catch(err){
        console.log("Error while changing delivery address", err)
      }
  };

  const handleDelete = async(addressId: string)=> {
     try{
        const res = await axios.delete(`${API_URL}/user/address/${addressId}`)
        console.log(res)
        if(res.status===200){
          toast.success("Address Deleted")
        }
      }
      catch(err){
        console.log("Error while deleting  address", err)
      }
  }

  return (
    <>
        <div className="p-6 mx-auto max-h-90 overflow-y-auto">
       
        {addresses && addresses.length && 
        <div className="grid gap-4 ">
            {addresses.map((address: any) => (
              <div key={address.id}  className={`border flex flex-col justify-start pl-6 ${
                  address.isSelected
                      ? "border-green-600 bg-green-50"
                      : "border-green-400"
                  } rounded-lg p-4 shadow hover:shadow-md hover:cursor-pointer transition`}
             >
                  <div>
                      <div className="flex justify-between"> 
                        <p className="font-bold ">{address.fullName} <span className="pl-2 font-semibold"> {address.phoneNumber}</span></p> 
                        {address.isSelected && <div className="text-sm flex items-center flex-row px-3 py-2 gap-2 border border-green-300 rounded"><CircleCheck size={15} fill="#22c55e" />Delivering to this address</div>}
                      </div>
                      <p className="font-semibold text-gray-800">
                      {address.address}, {address.city}, {address.state}
                      </p>
                      <p className="text-sm text-gray-500">
                      {address.postalCode}
                      </p>
                  </div> 

                <div className="flex flex-row gap-3 mt-3 justify-end">
                  <button
                    onClick={() => handleEdit(address)}
                    className="flex items-center gap-2 px-3 py-1 text-yellow-600 font-medium border border-yellow-600 rounded hover:bg-yellow-700 hover:text-white transition"
                  >
                    <Pen size={15} />
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelivery(address)}
                    className="flex items-center gap-2 px-3 py-1 text-green-600 font-medium border border-green-600 rounded hover:bg-green-700 hover:text-white transition"
                  >
                    <Truck size={15} />
                    Delivery
                  </button>
                  <button
                    onClick={() => handleDelete(address.id)}
                    className="flex items-center gap-2 px-3 py-1 text-red-600 font-medium border border-red-600 rounded hover:bg-red-700 hover:text-white transition"
                  >
                    <Trash2 size={15} />
                    Delete
                  </button>
                </div>

              </div>
            ))}
        </div>
        }

        {/* ➕ Add New Address Button */}
        <div className="text-center mt-6 float-right">
            <button
            onClick={() => handleAdd()}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 hover:cursor-pointer"
            >
            + Add New Address
            </button>
        </div>

        </div>
    </>
  );
}
