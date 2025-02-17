import { createContext } from "react";
import AuthService from "../services/authServices";
import { AxiosError } from "axios";
import { jwtDecode, JwtPayload } from "jwt-decode";
import { AuthContextType } from "../types/authType";
import { Props } from "../types/probType";
import { useCookies } from "react-cookie";

interface CustomJwtPayload extends JwtPayload {
    role: string;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

const AuthProvider = ({ children }: Props) => {
    const [, setCookie, removeCookie] = useCookies(['authToken']);

    const signIn = async (email: string, password: string) => {
        try {
            const res = await AuthService.doLogin(email, password);
            const decodedToken = jwtDecode<CustomJwtPayload>(res.access_token);

            if (['admin', 'super_admin'].includes(decodedToken.role)) {
                setCookie('authToken', res.access_token, { path: '/', maxAge: 3600 });
                return res;
            } else {
                removeCookie('authToken');
                throw new Error('You are not authorized to access this page');
            }
        } catch (e) {
            const error = e as AxiosError;
            throw error;
        }
    }

    const signUp = async (username: string, email: string, password: string) => {
        try {
            return await AuthService.doRegister(username, email, password);
        } catch (e) {
            const error = e as AxiosError;
            throw error;
        }
    }

    const signOut = () => {
        removeCookie('authToken', { path: '/' });
        window.location.reload();
    }

    return (
        <AuthContext.Provider value={{ signIn, signUp, signOut }}>
            {children}
        </AuthContext.Provider>
    );
};

const useLoggedInUser = (): CustomJwtPayload | null => {
    const [cookies] = useCookies(['authToken']);
    const token = cookies.authToken;

    return token ? jwtDecode<CustomJwtPayload>(token) : null;
};

export { AuthProvider, AuthContext, useLoggedInUser };