"use client";

import { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { v4 as uuidv4 } from "uuid";
import Header from "@/components/header";
import { Pen } from "lucide-react";
import AddressModal from "@/components/ui/addressModal";

interface Address {
  id: string;
  name: string;
  street: string;
  city: string;
  state: string;
  pincode: string;
  country: string;
}

export default function AvailableAddresses() {
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [selectedAddressId, setSelectedAddressId] = useState<string | null>(null);
  const [editingAddress, setEditingAddress] = useState<Address | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
 const [isModalOpen, setModalOpen] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(null); // for edit

  const handleAdd = () => {
    setSelectedAddress(null);
    setModalOpen(true);
  };

  const handleEdit = (address: any) => {
    setSelectedAddress(address);
    setModalOpen(true);
  };
  useEffect(() => {
    const fetchSampleAddresses = () => {
      const sampleData: Address[] = [
        {
          id: "1",
          name:"Anudeepthi",
          street: "123 Green Avenue",
          city: "Hyderabad",
          state: "Telangana",
          pincode: "500081",
          country: "India",
        },
        {
          id: "2",
            name:"Hima",

          street: "45 Mango Street",
          city: "Bangalore",
          state: "Karnataka",
          pincode: "560001",
          country: "India",
        },
      ];
      setAddresses(sampleData);
    };

    fetchSampleAddresses();
  }, []);

  const handleUpdate = (values: Address) => {
    setAddresses((prev) =>
      prev.map((addr) => (addr.id === values.id ? values : addr))
    );
    setEditingAddress(null);
  };


  const handleDeliver = (id: string) => {
    setSelectedAddressId(id);
    alert(`Delivering to Address ID: ${id}`);
  };

  return (
    <>
        <Header/>
        <div className="p-6 max-w-2xl mx-auto">
        <h2 className="text-2xl font-bold text-green-700 mb-6 text-center">
            {addresses.length ? "Your Addresses" : "Add your address"}
        </h2>

        <div className="grid gap-4 ">
            {addresses.map((address) => (
            <div
                key={address.id}
                className={`border flex justify-between items-center ${
                selectedAddressId === address.id
                    ? "border-green-600 bg-green-50"
                    : "border-green-400"
                } rounded-lg p-4 shadow hover:shadow-md hover:cursor-pointer transition`}
            >
                <div>
                    <p className="font-bold ">{address.name}</p>
                    <p className="font-semibold text-gray-800">
                    {address.street}, {address.city}, {address.state}
                    </p>
                    <p className="text-sm text-gray-500">
                    {address.pincode}, {address.country}
                    </p>
                </div> 

                <div className="flex flex-col gap-3">
                    <button
                        onClick={() => handleEdit(address)}
                        className="flex items-center gap-2 px-3 py-1 rounded text-green-600 font-semibold border border-green-600 hover:bg-green-700 hover:text-white hover:cursor-pointer"
                    >
                        <Pen size={15}/><span>Update address</span>
                    </button>
                    <button
                        onClick={() => handleDeliver(address.id)}
                        className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 hover:cursor-pointer"
                    >
                        Deliver to this address
                    </button>
                </div>
            </div>
            ))}
        </div>

        {/* ➕ Add New Address Button */}
        <div className="text-center mt-6">
            <button
            onClick={() => handleAdd()}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
            + Add New Address
            </button>
        </div>

        <AddressModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        initialData={selectedAddress}
      />
        </div>
    </>
  );
}
