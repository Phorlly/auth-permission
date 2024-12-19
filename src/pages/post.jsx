import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import axios from 'axios';
import baseUrl from '../constants';
import { ConfirmDelete } from '../constants/confirm-delete';
import ShowTitle from '../components/show-title';

const Post = ({ user }) => {
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getData = async () => {
            try {
                const res = await axios.get(`${baseUrl}/posts`);
                setData(res.data);
            } catch (error) {
                console.error('Error fetching posts:', error);
                setError('Failed to load posts. Please try again later.');
            } finally {
                setIsLoading(false);
            }
        };

        getData();
    }, [data]); // Empty dependency array ensures this runs only once

    return (
        <div className="title">
            <ShowTitle title='Post' />
            <div className="flex justify-between px-6 my-4">
                <h1>Post List</h1>
                <Link to="/post/create" className="p-2 border text-sm rounded-lg bg-blue-500">
                    Create new
                </Link>
            </div>
            <hr />
            {isLoading ? (
                <p className="text-center my-4">Loading posts...</p>
            ) : error ? (
                <p className="text-center text-red-500">{error}</p>
            ) : data?.length > 0 ? (
                <table className="w-full border-collapse border border-gray-300 mt-4">
                    <thead>
                        <tr>
                            <th className="border border-gray-300 p-2">ID</th>
                            <th className="border border-gray-300 p-2">Posted by</th>
                            <th className="border border-gray-300 p-2">Title</th>
                            <th className="border border-gray-300 p-2">Content</th>
                            <th className="border border-gray-300 p-2">Created</th>
                            <th className="border border-gray-300 p-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item, index) => (
                            <tr key={item.id || Math.random()}>
                                <td className="border border-gray-300 p-2">{index + 1 || 'N/A'}</td>
                                <td className="border border-gray-300 p-2">{item.user?.name || 'Unknown'}</td>
                                <td className="border border-gray-300 p-2">{item.title}</td>
                                <td className="border border-gray-300 p-2">{item.content}</td>
                                <td className="border border-gray-300 p-2">
                                    {moment(item.created_at).fromNow()}
                                </td>
                                {item.user_id === user?.id && (
                                    <td className="space-x-2 border border-gray-300 p-2">
                                        <Link to={`/post/edit/${item.id}`}
                                            className="border bg-green-500 rounded-md px-2">
                                            Edit
                                        </Link>
                                        <Link onClick={() => ConfirmDelete({ path: `/posts/${item.id}` })}
                                            className="border bg-red-400 rounded-md px-2">
                                            Delete
                                        </Link>
                                    </td>
                                )}
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p className="text-center my-4">No posts available.</p>
            )}
        </div>
    );
};

export default Post;
