import axios from 'axios';
import React, { useEffect, useState } from 'react';
import baseUrl from '../constants';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { ConfirmDelete } from '../constants/confirm-delete';
import ShowTitle from '../components/show-title';


const User = ({ user }) => {
  const [data, setData] = useState([]); // Initialize as an empty array
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await axios.get(`${baseUrl}/users`);
        setData(res.data || []); // Ensure `data` is always an array
      } catch (error) {
        console.error('Error fetching users:', error);
        setError('Failed to load user data. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };

    getData();
  }, [data]);

  if (!user) {
    return <p className="text-red-500">Error: User data is not available.</p>;
  }

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="title">
      <ShowTitle title='User' />

      <div className="flex justify-between px-6 my-4">
        <h1>User List</h1>
        <Link to="/user/create" className="p-2 border text-sm rounded-lg bg-blue-500">
          Create new
        </Link>
      </div>
      <hr />
      {data.length === 0 ? (
        <p>No users found.</p>
      ) : (
        <table className="w-full border-collapse border border-gray-300 mt-4">
          <thead>
            <tr>
              <th className="border border-gray-300 px-4 py-2">ID</th>
              <th className="border border-gray-300 px-4 py-2">Name</th>
              <th className="border border-gray-300 px-4 py-2">Email</th>
              <th className="border border-gray-300 px-4 py-2">Type</th>
              <th className="border border-gray-300 px-4 py-2">Created</th>
              <th className="border border-gray-300 px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => item.id !== user.id &&
              (
                <tr key={item.id} className="hover:bg-gray-100">
                  <td className="border border-gray-300 px-4 py-2">{index + 1}</td>
                  <td className="border border-gray-300 px-4 py-2">{item.name}</td>
                  <td className="border border-gray-300 px-4 py-2">{item.email}</td>
                  <td className="border border-gray-300 px-4 py-2">{item.type}</td>
                  <td className="border border-gray-300 px-4 py-2">
                    {moment(item.created_at).fromNow()}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 space-x-2">
                    {(item.type === user.type || item.type === 'guest' || user.type === 'admin') && (
                      <>
                        <Link to={`/user/edit/${item.id}`}
                          className="border bg-green-500 rounded-md px-2">
                          Edit
                        </Link>
                        <Link onClick={() => ConfirmDelete({ path: `/users/${item.id}` })}
                          className="border bg-red-400 rounded-md px-2">
                          Delete
                        </Link>
                      </>
                    )}
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default User;
