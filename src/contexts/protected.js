import { Outlet, Navigate } from "react-router-dom"

const ProtectedRoutes = ({ user }) => {

    return user?.name ? <Outlet /> : <Navigate to='/sign-in' />;
}

export default ProtectedRoutes;


export const ProtectedRoute = ({ children, user, routeType }) => {
    if (routeType === 'auth') {
        // For authentication routes (e.g., /sign-in, /sign-up)
        if (user?.name || user?.type === 'guest') {
            return <Navigate to="/" />; // Redirect if user is already logged in
        }
    } else if (routeType === 'userAccess') {
        // For user-protected routes (e.g., /user)
        if (!user || (user.type !== 'admin' && user.type !== 'user')) {
            return <Navigate to="/" />; // Redirect if not admin or user
        }
    }

    return children; // Render the protected component if access is granted
};






