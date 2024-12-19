import React, { useEffect, useState } from 'react'
import InputFiel from './input-field'
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import baseUrl from '../constants';
import { toast } from 'react-toastify';
import TextArea from './text-area';

const PostForm = ({ path, title, user }) => {
    const { id } = useParams()
    const [caption, setCaption] = useState('')
    const [content, setContent] = useState('')
    const navigate = useNavigate();

    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (id) {
            const getPost = async () => {
                try {
                    const response = await axios.get(`${baseUrl}/posts/${id}`)
                    // console.log(response.data);
                    setCaption(response.data.title);
                    setContent(response.data.content);
                } catch (error) {
                    console.error(error)
                }
            }
            getPost()
        }
    }, [id])

    const handlePost = async (e) => {
        e.preventDefault();
        setErrors({}); // Clear previous errors before new request

        try {
            const url = path === '/post/create' ? `${baseUrl}/posts` : `${baseUrl}/posts/${id}`;
            const res = path === '/post/create'
                ? await axios.post(url, {
                    user_id: user.id,
                    title: caption,
                    content
                })
                : await axios.put(url, {
                    title: caption,
                    content
                });

            // Handle success response
            if (res) navigate('/post');
            toast.success("Success!", {
                autoClose: 3000
            });
        } catch (error) {
            // console.log(error.response.data);
            setErrors(error.response.data);
        } finally {
            // console.log('Request completed');
            setErrors({});
        }
    }

    return (
        <div className='border  rounded-lg my-8 pb-8 bg-slate-300'>
            <div className='flex justify-between px-12 my-4'>
                <Link to='/post' className='p-2 border text-sm rounded-lg bg-gray-500'>
                    Go back
                </Link>
                <h1>{title}</h1>
            </div>
            <hr />

            <form className='w-1/2 mx-auto' onSubmit={handlePost}>
                <InputFiel
                    label="Title"
                    placeholder='Enter your title'
                    value={caption}
                    onChange={(e) => setCaption(e.target.value)}
                    error={errors.title}
                />
                <TextArea
                    label="Content"
                    placeholder='Enter your content'
                    value={content || ''}
                    error={errors.content}
                    onChange={(e) => setContent(e.target.value)}
                />
                <button className='block w-full rounded-lg bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mt-8'>
                    Submit
                </button>
            </form>
        </div>
    )
}

export default PostForm