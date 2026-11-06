import { Navigate } from "react-router";

const ProtectedRoute = ({ isLoggedIn, children }) => {
    if (!isLoggedIn) {
        return <Navigate to="/" replace />;
    }
    return children;
};

export default ProtectedRoute;