import { Navigate } from "react-router-dom";
import { useCookies } from "react-cookie";

type Props = {
    children: JSX.Element;
};

const ProtectedRoute = ({ children }: Props) => {
    const [cookies] = useCookies(['authToken']);
    const token = cookies.authToken;

    return token ? children : <Navigate to="/" replace />;
};

export default ProtectedRoute;
