"use client";

import axios from "axios"
import { Field, Form, Formik } from "formik"
import { useRouter } from "next/navigation";

import { toast } from "react-toastify"

export default function AddProduct (){
    const router = useRouter()
    const API_URL = process.env.NEXT_PUBLIC_API_URL
    const initialValues = {
        name:'',
        description:'',
        price:'',
        stock:'',
        category:'',
        image:''
    }
    const validate = (values: typeof initialValues)=>{
        const errors: { [key: string]: string } = {};
        if (!values.name) {
            errors.name = "Enter your name here";
        }
        if (!values.description) {
            errors.description = "Enter product description here";
        }
        if (!values.price) {
            errors.price = "Enter your product price";
        }
        if (!values.stock) {
            errors.stock = "Enter your avialable stock ";
        }
        if (!values.category) {
            errors.category = "Enter your product category here";
        }
        if (!values.image) {
            errors.image = "Plese select image of your product to upload";
        }
        return errors;
    }
    const handleSubmit = async(values: typeof initialValues) =>{
        console.log("add product details",values)
        const formData = new FormData()
        formData.append('name', values.name);
        formData.append('description', values.description);
        formData.append('price', values.price.toString());  
        formData.append('stock', values.stock.toString());  
        formData.append('category', values.category);
      
        if (values.image) {
          formData.append('image', values.image);
        }
        try{
            const res = await axios.post(`${API_URL}/product/add`,formData,{
                headers:{
                    'Accept':'application/json'
                }
            })
            console.log(res)
            if(res.status==201){
                toast.success("Product added succesfully")
                router.push('/home')
            }
        }
        catch(err:any){
            console.log("Error while adding product-->", err)
            if(err.message){
                toast.error(err.message)}
        }

    }
    return (
        <div className="flex justify-center pb-2 px-4">
        <div className="w-full max-w-2xl bg-white px-8 pb-2 rounded-lg shadow-md">
          <div className="text-green-700 font-bold text-center text-3xl mb-8">Add Your Product</div>
      
          <Formik
            initialValues={initialValues}
            validate={validate}
            onSubmit={handleSubmit}
          >
            <Form className="space-y-6">
              {/* First Row - Name and Description */}
              <div className="flex gap-6">
                {/* Name Field */}
                <div className="w-1/2">
                  <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-1">Name</label>
                  <Field name="name">
                    {({ field, meta }: any) => (
                      <input
                        {...field}
                        type="text"
                        placeholder="Product name"
                        className={`w-full px-4 py-2 rounded-md border text-sm focus:outline-none focus:ring-2 transition
                          ${meta.touched && meta.error 
                            ? 'border-red-500 placeholder-red-400 focus:ring-red-400' 
                            : 'border-gray-300 focus:border-green-500 focus:ring-green-400'}`}
                      />
                    )}
                  </Field>
                </div>
      
                {/* Description Field */}
                <div className="w-1/2">
                  <label htmlFor="description" className="block text-sm font-semibold text-gray-700 mb-1">Description</label>
                  <Field name="description">
                    {({ field, meta }: any) => (
                      <input
                        {...field}
                        type="text"
                        placeholder="Product description"
                        className={`w-full px-4 py-2 rounded-md border text-sm focus:outline-none focus:ring-2 transition
                          ${meta.touched && meta.error 
                            ? 'border-red-500 placeholder-red-400 focus:ring-red-400' 
                            : 'border-gray-300 focus:border-green-500 focus:ring-green-400'}`}
                      />
                    )}
                  </Field>
                </div>
              </div>
      
              {/* Second Row - Price and Stock */}
              <div className="flex gap-6">
                {/* Price Field */}
                <div className="w-1/2">
                  <label htmlFor="price" className="block text-sm font-semibold text-gray-700 mb-1">Price</label>
                  <Field name="price">
                    {({ field, meta }: any) => (
                      <input
                        {...field}
                        type="text"
                        placeholder="Product price"
                        className={`w-full px-4 py-2 rounded-md border text-sm focus:outline-none focus:ring-2 transition
                          ${meta.touched && meta.error 
                            ? 'border-red-500 placeholder-red-400 focus:ring-red-400' 
                            : 'border-gray-300 focus:border-green-500 focus:ring-green-400'}`}
                      />
                    )}
                  </Field>
                </div>
      
                {/* Stock Field */}
                <div className="w-1/2">
                  <label htmlFor="stock" className="block text-sm font-semibold text-gray-700 mb-1">Stock</label>
                  <Field name="stock">
                    {({ field, meta }: any) => (
                      <input
                        {...field}
                        type="text"
                        placeholder="Available stock"
                        className={`w-full px-4 py-2 rounded-md border text-sm focus:outline-none focus:ring-2 transition
                          ${meta.touched && meta.error 
                            ? 'border-red-500 placeholder-red-400 focus:ring-red-400' 
                            : 'border-gray-300 focus:border-green-500 focus:ring-green-400'}`}
                      />
                    )}
                  </Field>
                </div>
              </div>
      
              {/* Category Field */}
              <div>
                <label htmlFor="category" className="block text-sm font-semibold text-gray-700 mb-1">Category</label>
                <Field name="category">
                  {({ field, meta }: any) => (
                    <input
                      {...field}
                      type="text"
                      placeholder="Product category"
                      className={`w-full px-4 py-2 rounded-md border text-sm focus:outline-none focus:ring-2 transition
                        ${meta.touched && meta.error 
                          ? 'border-red-500 placeholder-red-400 focus:ring-red-400' 
                          : 'border-gray-300 focus:border-green-500 focus:ring-green-400'}`}
                    />
                  )}
                </Field>
              </div>
      
              {/* Image Field */}
              <div>
                <label htmlFor="image" className="block text-sm font-semibold text-gray-700 mb-1">Image</label>
                <Field name="image">
                  {({ form, meta }: any) => (
                    <input
                      type="file"
                      onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                        if (event.currentTarget.files && event.currentTarget.files[0]) {
                          form.setFieldValue('image', event.currentTarget.files[0]);
                        }
                      }}
                      className={`w-full px-3 py-2 rounded-md border text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold
                        file:bg-green-100 file:text-green-700 hover:file:bg-green-200 focus:outline-none
                        ${meta.touched && meta.error 
                          ? 'border-red-500 focus:ring-red-400' 
                          : 'border-gray-300 focus:border-green-500 focus:ring-green-400'}`}
                    />
                  )}
                </Field>
              </div>
      
              {/* Submit Button */}
              <button
                type="submit"
                className="w-1/2 float-right mt-1 bg-green-600 text-white py-3 rounded-md hover:bg-green-700 transition font-semibold text-lg shadow-md"
              >
                Add Product
              </button>
            </Form>
          </Formik>
        </div>
      </div>
      
    )
}

