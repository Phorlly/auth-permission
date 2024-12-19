import React, { useEffect, useState } from 'react'
import InputFiel from './input-field'
import { Link, useNavigate, useParams } from 'react-router-dom';
import SelectOption from './select-option';
import axios from 'axios';
import baseUrl from '../constants';
import { toast } from 'react-toastify';

const UserForm = ({ path, title, user }) => {
    const { id } = useParams()
    const [data, setData] = useState({
        name: '',
        email: '',
        password: '',
        type: ''
    })
    const navigate = useNavigate();

    useEffect(() => {
        if (id) {
            const getData = async () => {
                try {
                    const response = await axios.get(`${baseUrl}/users/${id}`)
                    // console.log(response.data);
                    setData(response.data);
                } catch (error) {
                    console.error(error)
                }
            }
            getData()
        }

        // setData({
        //     name: '',
        //     email: '',
        //     password: '',
        //     type: ''
        // })
    }, [id])
    const [errors, setErrors] = useState({});

    const handleUser = async (e) => {
        e.preventDefault();
        setErrors({}); // Clear previous errors before new request

        try {
            const url = path === '/user/create' ? `${baseUrl}/users` : `${baseUrl}/users/${id}`;
            const res = path === '/user/create'
                ? await axios.post(url, data)
                : await axios.put(url, data);

            // Handle success response
            if (res) navigate('/user');
            toast.success("Success!", {
                autoClose: 3000
            });
        } catch (error) {
            console.log(error.response.data);
            setErrors(error.response.data);
        } finally {
            // console.log('Auth request completed');
            setErrors({});
        }
    }

    return (
        <div className='border  rounded-lg my-8 pb-8 bg-slate-300'>
            <div className='flex justify-between px-12 my-4'>
                <Link to='/user' className='p-2 border text-sm rounded-lg bg-gray-500'>
                    Go back
                </Link>
                <h1>{title}</h1>
            </div>
            <hr />

            <form className='w-1/2 mx-auto' onSubmit={handleUser}>
                <InputFiel
                    label="Full Name"
                    placeholder='Enter your name'
                    value={data.name || ''}
                    onChange={(e) => setData({ ...data, name: e.target.value })}
                    error={errors.name}
                />
                <InputFiel
                    label="Email Address"
                    placeholder='Enter your email address'
                    value={data.email || ''}
                    type='email'
                    error={errors.email}
                    onChange={(e) => setData({ ...data, email: e.target.value })}
                />
                <SelectOption
                    label='Assign Role'
                    value={data.type || ''}
                    error={errors.type}
                    user={user}
                    onChange={(e) => setData({ ...data, type: e.target.value })}
                />
                <InputFiel
                    label="Password"
                    placeholder='Enter your password'
                    type='password'
                    value={data.password || ''}
                    error={errors.password}
                    onChange={(e) => setData({ ...data, password: e.target.value })}
                />
                <button className='block w-full rounded-lg bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mt-8'>
                    Submit
                </button>
            </form>
        </div>
    )
}

export default UserForm