import axios from 'axios';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

interface AddressFormValues {
  fullName: string;
  phoneNumber: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

export const AddressForm = ({onSubmit, initialValues: propInitialValues, onClose}: { onSubmit: (values: AddressFormValues) => void;initialValues?:Partial<AddressFormValues>;onClose:()=>void}) => {
  const [user, setUser] = useState<null|string>()

  useEffect(()=>{
    const localUser = localStorage.getItem('kisanKart_userId')
    setUser(localUser)
  },[])
  console.log('user', user)
  const API_URL = process.env.NEXT_PUBLIC_API_URL
  const defaultInitialValues: AddressFormValues = {
    fullName: '',
    phoneNumber: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    postalCode: '',
    country: 'India',
  };
  const initialValues = { ...defaultInitialValues, ...propInitialValues };
  const validate = (values: AddressFormValues) => {
    const errors: Partial<AddressFormValues> = {};

    if (!values.fullName) {
      errors.fullName = 'Full Name is required';
    }
    if (!values.phoneNumber) {
      errors.phoneNumber = 'Phone Number is required';
    } else if (!/^\d{10}$/.test(values.phoneNumber)) {
      errors.phoneNumber = 'Phone Number must be 10 digits';
    }
    if (!values.addressLine1) {
      errors.addressLine1 = 'Address Line 1 is required';
    }
    if (!values.city) {
      errors.city = 'City is required';
    }
    if (!values.state) {
      errors.state = 'State is required';
    }
    if (!values.postalCode) {
      errors.postalCode = 'Postal Code is required';
    }

    return errors;
  };
  const handleUpdateAddress = async(body: any)=>{
    try{const res = await axios.put(`${API_URL}/user/address/${body.userId}`,body,
      {headers:{
        'Accept':'application/json'}
      }
      )
      console.log('address update--->', res)
      if(res.status === 200){
        toast.success('Address updtaed')
        onClose();
      }
    }catch(err:any){
      console.log("ERROR-----------",err)
    }
  }

  const handleSubmit = async(values: typeof initialValues)=>{
    const body = {
      "userId": user,
      "fullName": values.fullName,
      "phoneNumber": values.phoneNumber,
      "addressLine1": values.addressLine1,
      "addressLine2": values.addressLine2,
      "city": values.city,
      "state": values.state,
      "postalCode": values.postalCode,
      "country": values.country
    }
    try{const res = await axios.post(`${API_URL}/user/address`,body,
      {headers:{
        'Accept':'application/json'}
      }
      )
      console.log('address add--->', res)
      if(res.status === 201){
        toast.success('Address added')
        onClose();
      }
    }catch(err:any){
      console.log("ERROR-----------",err)
      if(err.status === 400 && err.response.data.message === "Address already exists for this user"){
        handleUpdateAddress(body)
      }
      else{
        toast.warning(err.message)
      }
    }

  }

  return (
    <div className="p-4">
      <Formik
        initialValues={initialValues}
        validate={validate}
        onSubmit={(values, { resetForm }) => {
          handleSubmit(values);
          resetForm();
        }}
      >
        {() => (
          <Form className="grid grid-cols-2 gap-4">
            {/* First column */}
            <div className="flex flex-col">
              <label>Full Name</label>
              <Field name="fullName" className="border p-2 rounded" />
              <ErrorMessage name="fullName" component="div" className="text-red-500 text-sm" />

              <label>Phone Number</label>
              <Field name="phoneNumber" className="border p-2 rounded" />
              <ErrorMessage name="phoneNumber" component="div" className="text-red-500 text-sm" />

              <label>Address Line 1</label>
              <Field name="addressLine1" className="border p-2 rounded" />
              <ErrorMessage name="addressLine1" component="div" className="text-red-500 text-sm" />

              <label>Address Line 2</label>
              <Field name="addressLine2" className="border p-2 rounded" />
            </div>

            {/* Second column */}
            <div className="flex flex-col">
              <label>City</label>
              <Field name="city" className="border p-2 rounded" />
              <ErrorMessage name="city" component="div" className="text-red-500 text-sm" />

              <label>State</label>
              <Field name="state" className="border p-2 rounded" />
              <ErrorMessage name="state" component="div" className="text-red-500 text-sm" />

              <label>Postal Code</label>
              <Field name="postalCode" className="border p-2 rounded" />
              <ErrorMessage name="postalCode" component="div" className="text-red-500 text-sm" />

              <label>Country</label>
              <Field name="country" className="border p-2 rounded" disabled />
            </div>

            <div className="col-span-2 mt-4">
              <button type="submit" className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700">
                Save Address
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};
