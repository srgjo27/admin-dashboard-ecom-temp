import { useContext } from "react";
import { AuthContext } from "../../hooks/useAuth";
import Swal from "sweetalert2";

function DropdownUserMenu() {
    const { signOut } = useContext(AuthContext);

    const handleSignOut = () => { 
        Swal.fire({
            title: "Are you sure?",
            text: "You will be logged out of this account.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Ya, keluar"
          }).then((result) => {
            if (result.isConfirmed) {
              Swal.fire({
                title: "Sign Out",
                text: "You have been logged out",
                icon: "success"
              }).then(() => {
                signOut();
              });
            }
          });
     };

    return (
        <div
            className="hidden z-50 my-4 w-56 text-base list-none bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600"
            id="dropdown">
            <div className="py-3 px-4">
                <span
                    className="block text-sm font-semibold text-gray-900 dark:text-white">Neil Sims</span>
                <span
                    className="block text-sm text-gray-900 truncate dark:text-white">name@flowbite.com</span>
            </div>
            <ul
                className="py-1 text-gray-700 dark:text-gray-300"
                aria-labelledby="dropdown">
                <li>
                    <a href="#" className="block py-2 px-4 text-sm hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-400 dark:hover:text-white">My profile</a>
                </li>
                <li>
                    <a href="#" className="block py-2 px-4 text-sm hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-400 dark:hover:text-white">Account settings</a>
                </li>
            </ul>
            <ul
                className="py-1 text-gray-700 dark:text-gray-300"
                aria-labelledby="dropdown"
            >
                <li>
                    <a href="#" className="flex items-center py-2 px-4 text-sm hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    ><svg
                        className="mr-2 w-5 h-5 text-gray-400"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                            <path
                                fill-rule="evenodd"
                                d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                                clip-rule="evenodd"
                            ></path>
                        </svg>
                        My likes</a>
                </li>
                <li>
                    <a href="#" className="flex items-center py-2 px-4 text-sm hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    ><svg
                        className="mr-2 w-5 h-5 text-gray-400"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                            <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z"></path>
                        </svg>Collections</a>
                </li>
                <li>
                    <a href="#" className="flex justify-between items-center py-2 px-4 text-sm hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                        <span className="flex items-center">
                            <svg
                                aria-hidden="true"
                                className="mr-2 w-5 h-5 text-red-600 dark:text-red-500"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    fill-rule="evenodd"
                                    d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z"
                                    clip-rule="evenodd"
                                ></path>
                            </svg>
                            Super Admin Version
                        </span>
                        <svg
                            aria-hidden="true"
                            className="w-5 h-5 text-gray-400"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                fill-rule="evenodd"
                                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                clip-rule="evenodd"></path>
                        </svg>
                    </a>
                </li>
            </ul>
            <ul
                className="py-1 text-gray-700 dark:text-gray-300"
                aria-labelledby="dropdown"
            >
                <li>
                    <a
                        href="#"
                        onClick={handleSignOut}
                        className="block py-2 px-4 text-sm hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    >Sign out</a>
                </li>
            </ul>
        </div>
    );
}

export default DropdownUserMenu;