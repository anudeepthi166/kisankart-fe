"use client";

import axios from "axios"
import { Field, Form, Formik } from "formik"
import { useRouter } from "next/navigation";

import { toast } from "react-toastify"
import Header from "@/components/header";
import { LoaderCircle } from "lucide-react";

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
            const res = await axios.post(`${API_URL}/product`,formData,{
                headers:{
                    'Accept':'application/json'
                }
            })
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
        <>
          <Header />
          <div className="flex justify-center px-4 pt-10 pb-16 bg-gray-50 min-h-screen">
            <div className="w-full max-w-2xl bg-white p-8 rounded-2xl shadow-lg">
              
              {/* Title */}
              <h1 className="text-green-700 font-bold text-4xl text-center mb-10">
                Add Your Product
              </h1>

              <Formik initialValues={initialValues} validate={validate} onSubmit={handleSubmit}>
                {({ isSubmitting }) => (
                  <Form className="space-y-8">
                    {/* Name and Description */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="name" className="block text-gray-700 text-sm font-semibold mb-2">
                          Name
                        </label>
                        <Field name="name">
                          {({ field, meta }: any) => (
                            <input
                              {...field}
                              type="text"
                              placeholder="Product name"
                              className={`w-full p-3 rounded-lg border text-sm focus:outline-none focus:ring-2 transition
                                ${meta.touched && meta.error
                                  ? 'border-red-500 placeholder-red-400 focus:ring-red-400'
                                  : 'border-gray-300 focus:border-green-500 focus:ring-green-400'}`}
                            />
                          )}
                        </Field>
                      </div>

                      <div>
                        <label htmlFor="description" className="block text-gray-700 text-sm font-semibold mb-2">
                          Description
                        </label>
                        <Field name="description">
                          {({ field, meta }: any) => (
                            <input
                              {...field}
                              type="text"
                              placeholder="Product description"
                              className={`w-full p-3 rounded-lg border text-sm focus:outline-none focus:ring-2 transition
                                ${meta.touched && meta.error
                                  ? 'border-red-500 placeholder-red-400 focus:ring-red-400'
                                  : 'border-gray-300 focus:border-green-500 focus:ring-green-400'}`}
                            />
                          )}
                        </Field>
                      </div>
                    </div>

                    {/* Price and Stock */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="price" className="block text-gray-700 text-sm font-semibold mb-2">
                          Price
                        </label>
                        <Field name="price">
                          {({ field, meta }: any) => (
                            <input
                              {...field}
                              type="number"
                              placeholder="Product price"
                              className={`w-full p-3 rounded-lg border text-sm focus:outline-none focus:ring-2 transition
                                ${meta.touched && meta.error
                                  ? 'border-red-500 placeholder-red-400 focus:ring-red-400'
                                  : 'border-gray-300 focus:border-green-500 focus:ring-green-400'}`}
                            />
                          )}
                        </Field>
                      </div>

                      <div>
                        <label htmlFor="stock" className="block text-gray-700 text-sm font-semibold mb-2">
                          Stock
                        </label>
                        <Field name="stock">
                          {({ field, meta }: any) => (
                            <input
                              {...field}
                              type="number"
                              placeholder="Available stock"
                              className={`w-full p-3 rounded-lg border text-sm focus:outline-none focus:ring-2 transition
                                ${meta.touched && meta.error
                                  ? 'border-red-500 placeholder-red-400 focus:ring-red-400'
                                  : 'border-gray-300 focus:border-green-500 focus:ring-green-400'}`}
                            />
                          )}
                        </Field>
                      </div>
                    </div>

                    {/* Category */}
                    <div>
                      <label htmlFor="category" className="block text-gray-700 text-sm font-semibold mb-2">
                        Category
                      </label>
                      <Field name="category">
                        {({ field, meta }: any) => (
                          <input
                            {...field}
                            type="text"
                            placeholder="Product category"
                            className={`w-full p-3 rounded-lg border text-sm focus:outline-none focus:ring-2 transition
                              ${meta.touched && meta.error
                                ? 'border-red-500 placeholder-red-400 focus:ring-red-400'
                                : 'border-gray-300 focus:border-green-500 focus:ring-green-400'}`}
                          />
                        )}
                      </Field>
                    </div>

                    {/* Image */}
                    <div>
                      <label htmlFor="image" className="block text-gray-700 text-sm font-semibold mb-2">
                        Image
                      </label>
                      <Field name="image">
                        {({ form, meta }: any) => (
                          <input
                            type="file"
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                              if (event.currentTarget.files && event.currentTarget.files[0]) {
                                form.setFieldValue('image', event.currentTarget.files[0]);
                              }
                            }}
                            className={`w-full p-3 rounded-lg border text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold
                              file:bg-green-100 file:text-green-700 hover:file:bg-green-200 focus:outline-none
                              ${meta.touched && meta.error
                                ? 'border-red-500 focus:ring-red-400'
                                : 'border-gray-300 focus:border-green-500 focus:ring-green-400'}`}
                          />
                        )}
                      </Field>
                    </div>

                    {/* Submit Button */}
                    <div className="flex justify-end">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-8 rounded-md text-lg transition shadow-md flex items-center hover:cursor-pointer"
                      >
                        {isSubmitting && (
                         <LoaderCircle className="animate-spin w-6 h-6 text-gray-200 mr-4"/>
                        )}
                        Add Product
                      </button>
                      <button  
                        className="bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-8 rounded-md text-lg transition shadow-md flex items-center ml-5 hover:cursor-pointer"
                        onClick={()=>{router.push('/home')}}
                      >
                        Cancel</button>
                    </div>

                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </>

      
    )
}

