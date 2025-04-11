"use client";

import { ErrorMessage, Field, Form, Formik } from "formik";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SignUp() {
    const router = useRouter();
    const [otp, setOtp] = useState(false);
    const initialValues = {
        name: '',
        email: '',
        password: '',
        phoneNumber: '',
        otp: '',
    };

    const validate = (values: typeof initialValues) => {
        const errors: { [key: string]: string } = {};
        if (!values.name) {
            errors.name = "Enter your name";
        }
        if (!values.phoneNumber) {
            errors.phoneNumber = "Enter your phone number";
        }
        if (!values.password) {
            errors.password = "Enter your password";
        }
        if (otp && !values.otp) {
            errors.otp = "Please enter your OTP";
        }
        return errors;
    };

    const handleSubmit = (values: typeof initialValues) => {
        console.log("signUp details", values);
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
                        <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-1">Phone number</label>
                        <Field name="phoneNumber">
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

                    {/** OTP Field */}
                    {otp && (
                        <div className="mb-1">
                            <label htmlFor="otp" className="block text-sm font-medium text-gray-700 mb-1">OTP</label>
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

                    <div className="text-center text-sm my-1">
                        <button
                            type="button"
                            className="text-green-700 underline font-semibold cursor-pointer"
                            onClick={() => setOtp(true)}
                        >
                            {!otp ? 'Get OTP' : 'OTP sent'}
                        </button>
                    </div>

                    <button
                        type="submit"
                        className="w-full mt-2 bg-green-600 text-white py-2 rounded hover:bg-green-700 transition shadow-md cursor-pointer"
                    >
                        Sign up
                    </button>
                </Form>
            </Formik>
        </div>
    );
}
