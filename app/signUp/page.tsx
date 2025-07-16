"use client";

import axios from "axios";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { LoaderCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {toast} from 'react-toastify'

export default function SignUp() {
    const API_URL = process.env.NEXT_PUBLIC_API_URL
    const [loading, setLoading] = useState(false)
    const router = useRouter();
    const initialValues = {
        name: '',
        email: '',
        password: '',
        contact: '',
    };

    const validate = (values: typeof initialValues) => {
        const errors: { [key: string]: string } = {};
        if (!values.name) {
            errors.name = "Enter your name";
        }
        if (!values.contact) {
            errors.contact = "Enter your phone number";
        }
        if (!values.password) {
            errors.password = "Enter your password";
        }
        return errors;
    };

    const handleSubmit = async(values: typeof initialValues) => {
        setLoading(true)
        try{
            const res = await axios.post(`${API_URL}/auth/signup`,
                values)
            if(res.status === 200){
                toast.success("User account created ")
                localStorage.setItem('kisanKart_userId', res.data.user.id)
                localStorage.setItem('kisanKart_userRole', res.data.user.Role.name)

                router.push('/home')
            }
            else{
                toast.warning("Something went wrong")
            }
        }catch(err:any){
            console.log("error in signup", err)
            if(err?.message==="Network Error"){
                toast.error("Network Error")
            }
            else toast.error(err.response.data.message)
        }
        finally{
            setLoading(false)
        }

    };

    return (
        <div>
            <div className="text-green-700 font-bold text-center text-2xl mb-5">Create your account</div>
            <Formik
                initialValues={initialValues}
                validate={validate}
                onSubmit={handleSubmit}
            >
                <Form>
                    {/** Name Field */}
                    <div className="mb-1">
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                        <Field name="name">
                            {({ field, meta }: any) => (
                                <input
                                    {...field}
                                    type="text"
                                    placeholder={meta.touched && meta.error ? meta.error : "Enter your name"}
                                    className={`w-full px-4 py-2 rounded-md shadow-sm transition duration-200
                                        ${meta.touched && meta.error
                                            ? 'border border-red-500 placeholder-red-500 focus:ring-red-500 focus:border-red-500'
                                            : 'border border-gray-300 focus:border-green-400 focus:ring-2 focus:ring-green-400 focus:outline-none focus:shadow-md'}
                                    `}
                                />
                            )}
                        </Field>
                    </div>

                    {/** Email Field */}
                    <div className="mb-1">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                        <Field name="email">
                            {({ field, meta }: any) => (
                                <input
                                    {...field}
                                    type="text"
                                    placeholder={meta.touched && meta.error ? meta.error : "Enter your email"}
                                    className={`w-full px-4 py-2 rounded-md shadow-sm transition duration-200
                                        ${meta.touched && meta.error
                                            ? 'border border-red-500 placeholder-red-500 focus:ring-red-500 focus:border-red-500'
                                                : 'border border-gray-300 focus:border-green-400 focus:ring-2 focus:ring-green-400 focus:outline-none focus:shadow-md'}
                                    `}
                                />
                            )}
                        </Field>
                    </div>

                    {/** Phone Number Field */}
                    <div className="mb-1">
                        <label htmlFor="contact" className="block text-sm font-medium text-gray-700 mb-1">Phone number</label>
                        <Field name="contact">
                            {({ field, meta }: any) => (
                                <input
                                    {...field}
                                    type="text"
                                    placeholder={meta.touched && meta.error ? meta.error : "Enter phone number"}
                                    className={`w-full px-4 py-2 rounded-md shadow-sm transition duration-200
                                        ${meta.touched && meta.error
                                            ? 'border border-red-500 placeholder-red-500 focus:ring-red-500 focus:border-red-500'
                                                : 'border border-gray-300 focus:border-green-400 focus:ring-2 focus:ring-green-400 focus:outline-none focus:shadow-md'}
                                    `}
                                />
                            )}
                        </Field>
                    </div>

                    {/** Password Field */}
                    <div className="mb-1">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                        <Field name="password">
                            {({ field, meta }: any) => (
                                <input
                                    {...field}
                                    type="password"
                                    placeholder={meta.touched && meta.error ? meta.error : "Enter password"}
                                    className={`w-full px-4 py-2 rounded-md shadow-sm transition duration-200
                                        ${meta.touched && meta.error
                                            ? 'border border-red-500 placeholder-red-500 focus:ring-red-500 focus:border-red-500'
                                                : 'border border-gray-300 focus:border-green-400 focus:ring-2 focus:ring-green-400 focus:outline-none focus:shadow-md'}
                                    `}
                                />
                            )}
                        </Field>
                    </div>
                    <button
                        type="submit"
                        className="flex justify-center gap-3 w-full mt-2 bg-green-600 text-white py-2 rounded hover:bg-green-700 transition shadow-md cursor-pointer"
                    >
                        {loading && <LoaderCircle className="animate-spin"/>}Sign up
                    </button>
                </Form>
            </Formik>
        </div>
    );
}
