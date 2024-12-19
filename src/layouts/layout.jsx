import React from 'react'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import baseUrl from '../constants'
import { toast } from 'react-toastify';

const Layout = ({ user, setUser, setToken, token }) => {
    const navigate = useNavigate();

    const signOff = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch(`${baseUrl}/logout`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });

            if (!res.ok) throw new Error("Logout failed");

            setUser(null);
            setToken(null);
            localStorage.removeItem("token");
            navigate("/sign-in");
            toast.success("Logged out successfully!", { autoClose: 1500 });
        } catch (error) {
            console.error("Error during logout:", error);
        }
    };

    return (
        <>
            <header>
                <nav>
                    <div className='space-x-1'>
                        {user?.name && (
                            <>
                                <Link to='/' className='nav-link border'>Home</Link>
                                {(user?.type === 'admin' || user?.type === 'user') && (
                                    <Link to='/user' className='nav-link border'>User</Link>
                                )}
                                <Link to='/post' className='nav-link border'>Post</Link>
                            </>
                        )}
                    </div>
                    {user?.name && token
                        ? (
                            <div className='space-x-2 flex items-center'>
                                <p className='text-slate-400 text-sm'>
                                    Hello, {user?.name}
                                    {/* <b className='px-1'>{user.name}</b> */}
                                </p>
                                <form onSubmit={signOff}>
                                    <button className="nav-link border">Sign Off</button>
                                </form>
                                <Link to={`/profile/${user?.id}`}
                                    className='nav-link border'>
                                    Profile
                                </Link>
                            </div>
                        )
                        : (
                            <div className='space-x-2'>
                                <Link to='/sign-in' className='nav-link border'>Sign In</Link>
                                <Link to='/sign-up' className='nav-link border'>Sign Up</Link>
                            </div>
                        )
                    }
                </nav>
            </header>

            <main>
                {/* {user.type} */}
                <Outlet />
            </main>
        </>
    )
}

export default Layout