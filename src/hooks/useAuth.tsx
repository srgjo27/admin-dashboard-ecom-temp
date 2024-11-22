import { createContext } from "react";
import AuthService from "../services/authServices";
import { AxiosError } from "axios";
import { jwtDecode, JwtPayload } from "jwt-decode";

interface CustomJwtPayload extends JwtPayload {
    role: string;
}

interface SignInError {
    error: string;
    message: string;
    statusCode: number;
}

type AuthContextType = {
    signIn: (email: string, password: string) => Promise<SignInError>;
    signUp: (username: string, email: string, password: string) => Promise<SignInError>;
    signOut: () => void;
};

type Props = { children: React.ReactNode };

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

const AuthProvider = ({ children }: Props) => {

    const signIn = async (email: string, password: string) => {
        try {
            const res = await AuthService.doLogin(email, password);
            const decodedToken = jwtDecode<CustomJwtPayload>(res.access_token);

            if (decodedToken.role === 'admin' || decodedToken.role === 'super_admin') {
                localStorage.setItem('authToken', res.access_token);
                return res;
            } else {
                localStorage.removeItem('authToken');
                throw new Error('You are not authorized to access this page');
            }

        } catch (e) {
            const error = e as AxiosError;
            throw error;
        }
    }

    const signUp = async (username: string, email: string, password: string) => {
        try {
            const res = await AuthService.doRegister(username, email, password);

            return res;
        } catch (e) {
            const error = e as AxiosError;
            throw error;
        }
    }

    const signOut = () => {
        localStorage.removeItem('authToken');
        window.location.reload();
    }

    return (
        <AuthContext.Provider value={{ signIn, signUp ,signOut }}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthProvider, AuthContext };