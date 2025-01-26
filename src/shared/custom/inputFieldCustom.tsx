import { useState } from "react";
import { icAsset } from "../../constants/ic_string";

const fixedInputClass =
    "rounded-md appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm ";

export default function InputFieldCustom({
    handleChange,
    value,
    labelText,
    labelFor,
    id,
    name,
    type,
    isRequired = false,
    placeholder,
    autoComplete,
    customClass = "",
    icLeft = false,
    icRight = false,
}: {
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    value: string;
    labelText: string;
    labelFor: string;
    id: string;
    name: string;
    type: string;
    isRequired?: boolean;
    placeholder: string;
    autoComplete?: string;
    customClass?: string;
    icLeft?: boolean;
    icRight?: boolean;
}) {
    const [showPassword, setShowPassword] = useState(false);

    const isPasswordField = type === "password";

    return (
        <div className="my-5">
            <label htmlFor={labelFor} className="sr-only">
                {labelText}
            </label>
            <div className="relative flex items-center">
                {
                    icLeft ? <span
                        className="absolute left-2 z-10 pointer-events-none"
                    >
                        {isPasswordField ? (
                            <img
                                alt="password-icon"
                                className="w-5"
                                src={value.trim() === "" ? icAsset.lock : icAsset.unlock}
                            />
                        ) : (
                            <img
                                alt="email-icon"
                                className="w-5"
                                src={value.trim() === "" ? icAsset.ouUser : icAsset.inUser}
                            />
                        )}
                    </span> : null
                }
                <input
                    onChange={handleChange}
                    value={value}
                    id={id}
                    name={name}
                    type={isPasswordField && showPassword ? 'text' : type}
                    required={isRequired}
                    className={`${fixedInputClass} ${customClass}`}
                    placeholder={placeholder}
                    autoComplete={autoComplete}
                />
                {icRight && isPasswordField && (
                    <span
                        className="absolute right-3 text-gray-400 cursor-pointer z-10"
                        onClick={() => setShowPassword(!showPassword)}
                    >
                        {showPassword ? (
                            <img
                                alt="hide-password"
                                className="h-5 w-5"
                                src={icAsset.openEye}
                            />
                        ) : (
                            <img
                                alt="show-password"
                                className="h-5 w-5"
                                src={icAsset.closeEye}
                            />
                        )}
                    </span>
                )}
            </div>
        </div>
    );
}