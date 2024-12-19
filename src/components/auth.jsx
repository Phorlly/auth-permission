import React, { useState } from 'react'
import InputFiel from './input-field'
import axios from 'axios'
import baseUrl from '../constants';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Auth = ({ path, title, setToken }) => {
    const navigate = useNavigate();
    const [data, setData] = useState({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });
    const [errors, setErrors] = useState({});

    const authUser = async (e) => {
        e.preventDefault();
        setErrors({}); // Clear previous errors before new request

        try {
            const url = path === 'sign-up' ? `${baseUrl}/register` : `${baseUrl}/login`;
            const res = await axios.post(url, data);

            // Handle success response
            const resData = res.data;
            // console.log('Success:', resData);

            if (resData) {
                localStorage.setItem('token', resData.token)
                setToken(resData.token) // Update token in context

                navigate('/'); // Redirect to home page after successful sign up/login
                toast.success("Success!", {
                    autoClose: 1500
                });
            }

        } catch (error) {
            console.log(error.response.data.data);
            setErrors(error.response.data.data);
            toast.success("Something went wrong..! =>" + error.response.data, {
                autoClose: 3000
            });
        } finally {
            console.log('Auth request completed');
            setErrors({});
        }
    }

    return (
        <div className='border  rounded-lg my-8 pb-8 bg-slate-300'>
            <h1 className='title'> {title} </h1>

            <form className='w-1/2 mx-auto' onSubmit={authUser}>
                {path === 'sign-up' && (
                    <InputFiel
                        label="Full Name"
                        placeholder='Enter your name'
                        value={data.name}
                        onChange={(e) => setData({ ...data, name: e.target.value })}
                        error={errors.name}
                    />
                )}
                <InputFiel
                    label="Email Address"
                    placeholder='Enter your email address'
                    value={data.email}
                    type='email'
                    error={errors.email}
                    onChange={(e) => setData({ ...data, email: e.target.value })}
                />
                <InputFiel
                    label="Password"
                    placeholder='Enter your password'
                    type='password'
                    value={data.password}
                    error={errors.password}
                    onChange={(e) => setData({ ...data, password: e.target.value })}
                />
                {path === 'sign-up' && (
                    <InputFiel
                        label="Confirm Password"
                        type='password'
                        placeholder='Enter your confirmation password'
                        value={data.password_confirmation}
                        onChange={(e) => setData({ ...data, password_confirmation: e.target.value })}
                    />
                )}
                <button className='block w-full rounded-lg bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mt-8'>
                    {path === 'sign-up' ? 'Sign Up' : 'Sign In'}
                </button>
            </form>
        </div>
    )
}

export default Auth

