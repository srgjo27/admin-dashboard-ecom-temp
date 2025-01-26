import {
    Link,
    useNavigate
} from "react-router-dom";
import { gfAsset } from "../../constants/gif_string";
import InputFieldCustom from '../../shared/custom/inputFieldCustom';
import { useContext, useState } from "react";
import { loginFields } from "../../constants/formFields";
import { AuthContext } from "../../hooks/useAuth";
import Swal from "sweetalert2";


function LoginPage() {
    const [loginState, setLoginState] = useState<{ [key: string]: string }>(
        Object.fromEntries(loginFields.map((field) => [field.id, ""]))
    );
    const [error, setError] = useState<string | null>(null);
    const { signIn } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLoginState({ ...loginState, [e.target.id]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError(null);

        try {
            await signIn(loginState.email, loginState.password);
            Swal.fire({
                icon: "success",
                title: "Login Success",
                text: "You have successfully logged in",
                timer: 2000,
                timerProgressBar: true,
                didOpen: () => {
                    Swal.showLoading();
                },
            }).then(() => {
                navigate('/admin/dashboard', { replace: true });
            });
        } catch (error) {
            setError((error as Error).message);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-sm">
                <div className="mb-10">
                    <div className="flex justify-center">
                        <img
                            alt=""
                            className="h-14 w-14"
                            src={gfAsset.gfLogin} />
                    </div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Login to E-Com</h2>
                    <p className="text-center text-sm text-gray-600 mt-5">
                        Don't have an account yet? &nbsp;
                        <Link to={'/signup'} className="font-medium text-primary-600 hover:text-primary-500">
                            Sign Up
                        </Link>
                    </p>

                    {error && (
                        <div className="flex items-center p-2 mt-4 text-sm text-red-800 border border-red-300 rounded-lg bg-red-50" role="alert">
                            <svg className="flex-shrink-0 inline w-4 h-4 mr-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                            </svg>
                            <span>{error}</span>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="mt-4 space-y-6">
                        <div className="-space-y-px">
                            {loginFields.map((field) => (
                                <InputFieldCustom
                                    key={field.id}
                                    handleChange={handleChange}
                                    value={loginState[field.id]}
                                    {...field}
                                    customClass="pl-10 pr-10 relative z-0"
                                />
                            ))}
                        </div>
                        <div className="flex items-center justify-between ">
                            <div className="flex items-center">
                                <input
                                    id="remember-me"
                                    name="remember-me"
                                    type="checkbox"
                                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                                />
                                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                                    Remember me
                                </label>
                            </div>

                            <div className="text-sm">
                                <a href="#" className="font-medium text-primary-600 hover:text-primary-500">
                                    Forgot your password?
                                </a>
                            </div>
                        </div>
                        <button
                            type='submit'
                            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 mt-10"
                        >
                            Login
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;