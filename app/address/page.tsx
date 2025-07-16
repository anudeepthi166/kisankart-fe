"use client";
import { Field, Form, Formik, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import axios from "axios";
import Address from "@/components/ui/address";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";



const AddressForm = () => {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const router = useRouter();
  const [userId, setUserId] = useState<Number|null>(null)
  const selectedAddress = useSelector((state: RootState)=> state.address.address)

  const initialValues = selectedAddress || {
    fullName: "",
    phoneNumber: "",
    postalCode: "",
    address: "",
    landmark: "",
    city: "",
    state: "",
    addressType: "Home",
    userId: 0,

  };

  const validationSchema = Yup.object({
    fullName: Yup.string().required("Full name is required"),
    phoneNumber: Yup.string()
      .matches(/^[6-9]\d{9}$/, "Invalid phone number")
      .required("Mobile is required"),
    postalCode: Yup.string()
      .matches(/^\d{6}$/, "Pincode must be 6 digits")
      .required("Pincode is required"),
    address: Yup.string().required("Address is required"),
    city: Yup.string().required("City is required"),
    state: Yup.string().required("State is required"),
  });

  useEffect(()=>{
    const localUserId = localStorage.getItem("kisanKart_userId")
    setUserId(Number(localUserId))
  },[])
  const handleSubmit = async (values: typeof initialValues) => {
    console.log("address--->", values)
    if(userId){
      values.userId = Number(userId)

    }
    try{
      let res
      console.log("selected", selectedAddress)
        if(!selectedAddress){
           res = await axios.post(`${API_URL}/user/address`,
            values,
            {
                headers:{
                    'Accept':'application/json'
                }
            })
        }
        else{
          console.log("call for update")
           res = await axios.put(`${API_URL}/user/address/${selectedAddress.id}`,
            values,
            {
                headers:{
                    'Accept':'application/json'
                }
            })
        }
        console.log(res)
        if(res.status === 201){
          toast.success("Succesfully added your address")
          router.push(`/cart/${userId}`)
        }
    }
    catch(err){
      toast.success("Error while adding address")
      console.log("Error while adding address",err)
    }
  };


  const states = [
    "Andhra Pradesh",
    "Telangana",
    "Karnataka",
    "Maharashtra",
    "Tamil Nadu",
  ];
  return (
    <>
      <div className="max-w-xl mx-auto bg-white p-6 rounded shadow-md">
        <div className="text-green-700 font-bold text-xl mb-6 text-center">
          Add Delivery Address
        </div>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          <Form>
            {/* Full Name */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <Field name="fullName">
                {({ field, meta }: any) => (
                  <input
                    {...field}
                    placeholder="Enter full name"
                    className={`w-full px-4 py-2 rounded-md shadow-sm transition
                    ${
                      meta.touched && meta.error
                        ? "border border-red-500 placeholder-red-500 focus:ring-red-500 focus:border-red-500"
                        : "border border-gray-300 focus:border-green-400 focus:ring-2 focus:ring-green-400 focus:outline-none focus:shadow-md"
                    }`}
                  />
                )}
              </Field>
            </div>

            {/* Mobile */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Mobile Number
              </label>
              <Field name="phoneNumber">
                {({ field, meta }: any) => (
                  <input
                    {...field}
                    placeholder="10-digit phone number"
                    className={`w-full px-4 py-2 rounded-md shadow-sm transition
                    ${
                      meta.touched && meta.error
                        ? "border border-red-500 placeholder-red-500 focus:ring-red-500 focus:border-red-500"
                        : "border border-gray-300 focus:border-green-400 focus:ring-2 focus:ring-green-400 focus:outline-none focus:shadow-md"
                    }`}
                  />
                )}
              </Field>
            </div>

          

            {/* Address */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Address
              </label>
              <Field name="address">
                {({ field, meta }: any) => (
                  <textarea
                    {...field}
                    rows={3}
                    placeholder="Flat, House no., Building, Area"
                    className={`w-full px-4 py-2 rounded-md shadow-sm transition
                    ${
                      meta.touched && meta.error
                        ? "border border-red-500 placeholder-red-500 focus:ring-red-500 focus:border-red-500"
                        : "border border-gray-300 focus:border-green-400 focus:ring-2 focus:ring-green-400 focus:outline-none focus:shadow-md"
                    }`}
                  />
                )}
              </Field>
            </div>
            

            {/* Landmark */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Landmark
              </label>
              <Field name="landmark">
                {({ field, meta }: any) => (
                  <input
                    {...field}
                    placeholder="Near park,mall etc"
                    className={`w-full px-4 py-2 rounded-md shadow-sm transition
                    ${
                      meta.touched && meta.error
                        ? "border border-red-500 placeholder-red-500 focus:ring-red-500 focus:border-red-500"
                        : "border border-gray-300 focus:border-green-400 focus:ring-2 focus:ring-green-400 focus:outline-none focus:shadow-md"
                    }`}
                  />
                )}
              </Field>
            </div>

            {/* City */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                City
              </label>
              <Field name="city">
                {({ field, meta }: any) => (
                  <input
                    {...field}
                    placeholder="City"
                    className={`w-full px-4 py-2 rounded-md shadow-sm transition
                    ${
                      meta.touched && meta.error
                        ? "border border-red-500 placeholder-red-500 focus:ring-red-500 focus:border-red-500"
                        : "border border-gray-300 focus:border-green-400 focus:ring-2 focus:ring-green-400 focus:outline-none focus:shadow-md"
                    }`}
                  />
                )}
              </Field>
            </div>

            {/* State */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                State
              </label>
              <Field
                as="select"
                name="state"
                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:border-green-400 focus:ring-2 focus:ring-green-400 focus:outline-none"
              >
                <option value="">Select State</option>
                {states.map((state) => (
                  <option key={state} value={state}>
                    {state}
                  </option>
                ))}
              </Field>
              <ErrorMessage
                name="state"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

              {/* Pincode */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Pincode
              </label>
              <Field name="postalCode">
                {({ field, meta }: any) => (
                  <input
                    {...field}
                    placeholder="6-digit postalCode"
                    className={`w-full px-4 py-2 rounded-md shadow-sm transition
                    ${
                      meta.touched && meta.error
                        ? "border border-red-500 placeholder-red-500 focus:ring-red-500 focus:border-red-500"
                        : "border border-gray-300 focus:border-green-400 focus:ring-2 focus:ring-green-400 focus:outline-none focus:shadow-md"
                    }`}
                  />
                )}
              </Field>
            </div>

            {/* Address Type */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Address Type
              </label>
              <div className="flex space-x-4">
                <label className="flex items-center space-x-2">
                  <Field type="radio" name="addressType" value="Home" />
                  <span>Home</span>
                </label>
                <label className="flex items-center space-x-2">
                  <Field type="radio" name="addressType" value="Work" />
                  <span>Work</span>
                </label>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full mt-4 border-2 border-green-500 text-green-500 font-bold py-2 rounded hover:bg-green-500 hover:text-white transition shadow-md"
            >
              Save Address
            </button>
          </Form>
        </Formik>
      </div>
    </>
  );
};

export default AddressForm;

