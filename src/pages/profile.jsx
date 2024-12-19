import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import baseUrl from '../constants'
import moment from 'moment'

const Profile = () => {
    const { id } = useParams()
    const [data, setData] = useState(null)

    useEffect(() => {
        const getData = async () => {
            try {
                const res = await axios.get(`${baseUrl}/users/${id}`);
                setData(res.data || []); // Ensure `data` is always an array
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };

        getData();
    }, [id]);

    return (
        <div className='flex flex-col items-center my-12 border p-12 bg-gray-300 rounded-lg'>
            <div className='flex justify-between w-full mb-8'>
                <Link to={`/profile/modify/${id}`}
                    className='p-2 border text-sm rounded-lg bg-green-500'>
                    Modify
                </Link>
                <h2 >User Profile</h2>
            </div>

            <div className='flex flex-col items-start'>
                <p className='my-2 font-semibold '>
                    Your fullname: <b>{data?.name}</b>
                </p>
                <p className='my-2 font-semibold'>
                    Your email address: <span className='text-lg'>{data?.email}</span>
                </p>
                <p className='my-2 font-semibold'>
                    Your role: <span className='text-lg'>{data?.type}</span>
                </p>
                <p className='my-2 font-semibold'>
                    Your created:
                    <span className='text-lg'>
                        {moment(data?.created_at).fromNow()}
                    </span>
                </p>
            </div>
        </div>
    )
}

export default Profile