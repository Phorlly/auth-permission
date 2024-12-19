import { useContext } from "react";
import { Routes, Route } from "react-router-dom";
import { AppContext } from "../contexts/context";
import Layout from "../layouts/layout";
import ProtectedRoutes, { ProtectedRoute } from "../contexts/protected";
import PostForm from "../components/post-form";
import UserForm from "../components/user-form";
import User from '../pages/user'
import Post from '../pages/post'
import Home from '../pages/home'
import SignIn from '../pages/sign-in'
import SignUp from '../pages/sign-up'



const AllRoutes = () => {
    const { token, setToken, user, setUser } = useContext(AppContext);

    const routes = [
        {
            path: '/',
            element: (
                <Layout
                    user={user}
                    setToken={setToken}
                    token={token}
                    setUser={setUser}
                />
            ),
            children: [
                // Public routes
                {
                    path: 'sign-in',
                    element: (
                        <ProtectedRoute user={user} routeType="auth">
                            <SignIn setToken={setToken} />
                        </ProtectedRoute>
                    ),
                },
                {
                    path: 'sign-up',
                    element: (
                        <ProtectedRoute user={user} routeType="auth">
                            <SignUp setToken={setToken} />
                        </ProtectedRoute>
                    ),
                },
                // Protected routes
                {
                    element: <ProtectedRoutes user={user} />,
                    children: [
                        {
                            index: true,
                            element: <Home user={user} />,
                        },
                        {
                            path: 'user',
                            element: (
                                <ProtectedRoute user={user} routeType="userAccess">
                                    <User user={user} />
                                </ProtectedRoute>
                            ),
                        },
                        {
                            path: 'user/create',
                            element: (
                                <UserForm
                                    path="/user/create"
                                    title="Create a new user"
                                    user={user}
                                />
                            ),
                        },
                        {
                            path: 'user/edit/:id',
                            element: (
                                <UserForm
                                    path="/user/edit/:id"
                                    title="Modify an existing user"
                                    user={user}
                                />
                            ),
                        },
                        {
                            path: 'post',
                            element: <Post user={user} />,
                        },
                        {
                            path: 'post/create',
                            element: (
                                <PostForm
                                    path="/post/create"
                                    title="Create a new post"
                                    user={user}
                                />
                            ),
                        },
                        {
                            path: 'post/edit/:id',
                            element: (
                                <PostForm
                                    path="/post/edit/:id"
                                    title="Modify an existing post"
                                    user={user}
                                />
                            ),
                        },
                    ],
                },
            ],
        },
    ];

    return (
        <Routes>
            {routes.map((route, index) => (
                <Route
                    key={index}
                    path={route.path}
                    element={route.element}
                >
                    {route.children &&
                        route.children.map((child, childIndex) => (
                            <Route
                                key={childIndex}
                                path={child.path}
                                element={child.element}
                            >
                                {child.children &&
                                    child.children.map((subChild, subChildIndex) => (
                                        <Route
                                            key={subChildIndex}
                                            path={subChild.path}
                                            index={subChild.index}
                                            element={subChild.element}
                                        />
                                    ))}
                            </Route>
                        ))}
                </Route>
            ))}
        </Routes>
    );
};

export default AllRoutes;

