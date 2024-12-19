import React, { useEffect, useState } from 'react'
import InputFiel from './input-field'
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import baseUrl from '../constants';
import { toast } from 'react-toastify';

const ProfileForm = ({ title }) => {
    const { id } = useParams()
    const navigate = useNavigate();
    const [data, setData] = useState({
        name: '',
        email: '',
        password: '',
    })

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
    }, [id])
    const [errors, setErrors] = useState({});

    const handleUser = async (e) => {
        e.preventDefault();
        setErrors({}); // Clear previous errors before new request

        try {
            const res = await axios.put(`${baseUrl}/users/${id}`, data);

            // Handle success response
            if (res) navigate('/profile/' + id, { replace: true });
            toast.success("Success!", {
                autoClose: 3000
            });
        } catch (error) {
            console.log(error.response.data);
            setErrors(error.response.data);
        } finally {
            setErrors({});
        }
    }

    return (
        <div className='border  rounded-lg my-8 pb-8 bg-slate-300'>
            <div className='flex justify-between px-12 my-4'>
                <Link to={'/profile/' + id} className='p-2 border text-sm rounded-lg bg-gray-500'>
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
                    readOnly={true}
                    error={errors.email}
                    onChange={(e) => setData({ ...data, email: e.target.value })}
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

export default ProfileForm