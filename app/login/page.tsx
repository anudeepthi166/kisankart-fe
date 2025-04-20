"use client";

import axios from "axios";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

export default function Login() {
    const API_URL = process.env.NEXT_PUBLIC_API_URL
    const router = useRouter();
    const [usePassword, setUsePasword] = useState(true);

    const initialValues = {
        contact: '',
        password: '',
        otp: '',
    };

    const validate = (values: typeof initialValues) => {
        const errors: { [key: string]: string } = {};
        if (!values.contact) {
            errors.contact = "Enter your phone number";
        }
        if (usePassword) {
            if (!values.password) {
                errors.password = "Enter your password";
            }
        } else {
            if (!values.otp) {
                errors.otp = "Please enter OTP";
            }
        }
        return errors;
    };

    const handleSubmit = async(values: typeof initialValues) => {
        console.log("Login details", values);
        try{
            const res = await axios.post(`${API_URL}/auth/login`,
                values
            )
            if(res.status === 200){
                console.log(res)
                toast.success("Successfully logged in")
                localStorage.setItem('kisanKart_userId', res.data.user.id)
                localStorage.setItem('kisanKart_userRole', res.data.user.Role.name)
                router.push('/home')
            }
            else{
                toast.warning("Something went wrong")
            }
        }catch(err: any){
            console.log("error in login", err)
            toast.error(err.response.data.message)
        }
    };

    return (
        <div>
            <div className="text-green-700 font-bold text-center text-2xl mb-5">Welcome back</div>
            <Formik initialValues={initialValues} validate={validate} onSubmit={handleSubmit}>
                <Form>
                    {/* contact field */}
                    <div className="mb-4">
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Contact</label>
                        <Field name="contact">
                            {({ field, meta }: any) => (
                                <input
                                    {...field}
                                    type="text"
                                    placeholder={meta.touched && meta.error ? meta.error : "Enter email or phone number"}
                                    className={`w-full px-4 py-2 rounded-md shadow-sm transition duration-200
                                        ${meta.touched && meta.error
                                            ? 'border border-red-500 placeholder-red-500 focus:ring-red-500 focus:border-red-500'
                                            : 'border border-gray-300 focus:border-green-400 focus:ring-2 focus:ring-green-400 focus:outline-none focus:shadow-md'
                                        }
                                    `}
                                />
                            )}
                        </Field>
                    </div>

                    {/* Password or OTP field */}
                    {usePassword ? (
                        <div className="mb-4">
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                            <Field name="password">
                                {({ field, meta }: any) => (
                                    <input
                                        {...field}
                                        type="password"
                                        placeholder={meta.touched && meta.error ? meta.error : "Enter your password"}
                                        className={`w-full px-4 py-2 rounded-md shadow-sm transition duration-200
                                            ${meta.touched && meta.error
                                                ? 'border border-red-500 placeholder-red-500 focus:ring-red-500 focus:border-red-500'
                                                : 'border border-gray-300 focus:border-green-400 focus:ring-2 focus:ring-green-400 focus:outline-none focus:shadow-md'}

                                        `}
                                    />
                                )}
                            </Field>
                        </div>
                    ) : (
                        <div className="mb-4">
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">OTP</label>
                            <Field name="otp">
                                {({ field, meta }: any) => (
                                    <input
                                        {...field}
                                        type="text"
                                        placeholder={meta.touched && meta.error ? meta.error : "Enter OTP"}
                                        className={`w-full px-4 py-2 rounded-md shadow-sm transition duration-200
                                            ${meta.touched && meta.error
                                                ? 'border border-red-500 placeholder-red-500 focus:ring-red-500 focus:border-red-500'
                                                : 'border border-gray-300 focus:border-green-400 focus:ring-2 focus:ring-green-400 focus:outline-none focus:shadow-md'}
                                        `}
                                    />
                                )}
                            </Field>
                        </div>
                    )}

                    {/* Toggle password/otp */}
                    {/* <div className="text-sm mt-4">
                        <button
                            type="button"
                            className="text-green-700 underline font-semibold cursor-pointer"
                            onClick={() => setUsePasword(!usePassword)}
                        >
                            {usePassword ? 'Use OTP instead' : 'Use password instead'}
                        </button>
                    </div> */}

                    {/* Submit */}
                    <button
                        type="submit"
                        className="w-full mt-4 bg-green-600 text-white py-2 rounded hover:bg-green-700 transition shadow-md cursor-pointer"
                    >
                        Login
                    </button>
                </Form>
            </Formik>
        </div>
    );
}
