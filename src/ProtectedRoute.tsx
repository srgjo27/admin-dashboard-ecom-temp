import { Navigate } from "react-router-dom";

type Props = {
    children: JSX.Element;
};

const ProtectedRoute = ({ children }: Props) => {
    const token = localStorage.getItem('authToken');
    return token ? children : <Navigate to="/" replace />;
};

export default ProtectedRoute;