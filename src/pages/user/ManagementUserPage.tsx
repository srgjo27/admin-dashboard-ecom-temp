import toast from "react-hot-toast";
import { icAsset } from "../../constants/ic_string";
import { svgAsset } from "../../constants/svg_string";
import useUsers from "../../hooks/useUser";
import { useLoggedInUser } from "../../hooks/useAuth";
import { useState } from "react";
import { User } from "../../data/interfaces/resUser";
import Search from "../../shared/commom/Search";

function ManagementUserPage() {
    const loggedInUser = useLoggedInUser();
    const { users, updateUserRole } = useUsers();

    const [sortConfig, setSortConfig] = useState<{ key: keyof User; direction: 'ascending' | 'descending' }>({
        key: 'profile',
        direction: 'ascending'
    });
    const [selectedUsers, setSelectedUsers] = useState<number[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [showName, setShowName] = useState(true);
    const [showRole, setShowRole] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");

    const itemsPerPage = 10;
    const totalItems = users.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    const requestSort = (key: keyof User) => {
        let direction: 'ascending' | 'descending' = 'ascending';
        if (sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }
        setSortConfig({ key, direction });
    };

    const sortedUsers = [...users].sort((a, b) => {
        const getValue = (user: User, key: keyof User) => {
            if (key === 'profile') {
                return user.profile?.firstName?.toLowerCase() || "";
            }
            return (user[key] as string)?.toLowerCase() || "";
        };

        const aValue = getValue(a, sortConfig.key);
        const bValue = getValue(b, sortConfig.key);

        if (aValue < bValue) {
            return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (aValue > bValue) {
            return sortConfig.direction === 'ascending' ? 1 : -1;
        }

        return 0;
    });

    const filteredUsers = sortedUsers.filter(user => {
        const fullName = `${user.profile?.firstName} ${user.profile?.lastName}`.toLowerCase();
        const username = user.username.toLowerCase();
        const email = user.email.toLowerCase();
        const role = user.role.toLowerCase();

        return (
            fullName.includes(searchQuery.toLowerCase()) ||
            username.includes(searchQuery.toLowerCase()) ||
            email.includes(searchQuery.toLowerCase()) ||
            role.includes(searchQuery.toLowerCase())
        );
    });

    const currentUsers = filteredUsers.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
    const startItem = (currentPage - 1) * itemsPerPage + 1;
    const endItem = Math.min(startItem + itemsPerPage - 1, totalItems);

    const handleRoleChange = async (userId: number, newRole: string) => {
        try {
            await updateUserRole(userId, newRole);
        } catch (e) {
            const error = e as Error;
            console.error(error.message);
            toast.error('You are not allowed to update this user because it is a super admin');
        }
    };

    const handleSelectAllChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.checked) {
            setSelectedUsers(users.map(user => user.id));
        } else {
            setSelectedUsers([]);
        }
    };

    const handleUserSelectChange = (userId: number) => {
        setSelectedUsers(prevSelected =>
            prevSelected.includes(userId)
                ? prevSelected.filter(id => id !== userId)
                : [...prevSelected, userId]
        );
    };

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { id, checked } = event.target;

        if (id === "checkbox-name") {
            setShowName(checked);
        } else if (id === "checkbox-role") {
            setShowRole(checked);
        }
    };

    const handleSearch = (query: string) => {
        setSearchQuery(query);
        setCurrentPage(1);
    };

    return (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <div className="flex items-center justify-between flex-column flex-wrap md:flex-row space-y-4 md:space-y-0 p-4 bg-white dark:bg-gray-900">
                <div className="flex items-center flex-column flex-wrap space-x-4 lg:space-x-4 md:space-x-2">
                    <div>
                        <button
                            id="dropdownEntriPageButton"
                            data-dropdown-toggle="dropdownEntriPage"
                            className="inline-flex items-center text-gray-500 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium 
                            rounded-lg text-sm px-3 py-1.5 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                            type="button">
                            <span className="sr-only">Entri Pages</span>
                            10
                            <svg
                                className="w-2.5 h-2.5 ms-2.5"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 10 6">
                                <path
                                    stroke="currentColor"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="m1 1 4 4 4-4" />
                            </svg>
                        </button>
                        <div
                            id="dropdownEntriPage"
                            className="z-40 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600">
                            <ul
                                className="py-1 text-sm text-gray-700 dark:text-gray-200"
                                aria-labelledby="dropdownActionButton">
                                <li>
                                    <a
                                        href="#"
                                        className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">10</a>
                                </li>
                                <li>
                                    <a
                                        href="#"
                                        className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">25</a>
                                </li>
                                <li>
                                    <a
                                        href="#"
                                        className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">50</a>
                                </li>
                                <li>
                                    <a
                                        href="#"
                                        className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">100</a>
                                </li>
                                <li>
                                    <a
                                        href="#"
                                        className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">150</a>
                                </li>
                                <li>
                                    <a
                                        href="#"
                                        className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">200</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div>
                        <button
                            id="dropdownActionButton"
                            data-dropdown-toggle="dropdownAction"
                            className="inline-flex items-center text-gray-500 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium 
                            rounded-lg text-sm px-3 py-1.5 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                            type="button">
                            <span className="sr-only">Action button</span>
                            Action
                            <svg
                                className="w-2.5 h-2.5 ms-2.5"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 10 6">
                                <path
                                    stroke="currentColor"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="m1 1 4 4 4-4" />
                            </svg>
                        </button>
                        <div
                            id="dropdownAction"
                            className="z-40 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600">
                            <ul
                                className="py-1 text-sm text-gray-700 dark:text-gray-200"
                                aria-labelledby="dropdownActionButton">
                                <li>
                                    <a
                                        href="#"
                                        className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                                        <img
                                            alt="pdf"
                                            className="w-5 inline-block me-2"
                                            src={svgAsset.pdf}
                                        />
                                        Export PDF
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#"
                                        className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                                        <img
                                            alt="excel"
                                            className="w-5 inline-block me-2"
                                            src={svgAsset.excel}
                                        />
                                        Export Excel
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#"
                                        className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                                        <img
                                            alt="csv"
                                            className="w-5 inline-block me-2"
                                            src={svgAsset.csv}
                                        />
                                        Export CSV
                                    </a>
                                </li>
                            </ul>
                            <div className="py-1">
                                <a
                                    href="#"
                                    className="block px-4 py-2 text-sm text-red-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Delete</a>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex items-center flex-column flex-wrap space-x-4 lg:space-x-4 md:space-x-2">
                    <Search onSearch={handleSearch} />
                    <div>
                        <button
                            id="dropdownFilterButton"
                            data-dropdown-toggle="dropdownFilter"
                            className="inline-flex items-center text-gray-500 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium 
                            rounded-lg text-sm px-3 py-1.5 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                            type="button">
                            <span className="sr-only">Filter button</span>
                            <img
                                src={svgAsset.filter}
                                className="w-6" />
                            <svg
                                className="w-2.5 h-2.5 ms-2.5"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 10 6">
                                <path
                                    stroke="currentColor"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="m1 1 4 4 4-4" />
                            </svg>
                        </button>
                        <div
                            id="dropdownFilter"
                            className="z-40 hidden bg-white rounded-lg shadow w-60 dark:bg-gray-700">
                            <ul
                                className="h-30 px-3 pb-3 overflow-y-auto text-sm text-gray-700 dark:text-gray-200"
                                aria-labelledby="dropdownFilterButton">
                                <li>
                                    <div className="flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                                        <input
                                            id="checkbox-name"
                                            type="checkbox"
                                            checked={showName}
                                            onChange={handleCheckboxChange}
                                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600" />
                                        <label
                                            htmlFor="checkbox-name"
                                            className="w-full ms-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300">Name</label>
                                    </div>
                                </li>
                                <li>
                                    <div
                                        className="flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                                        <input
                                            id="checkbox-role"
                                            type="checkbox"
                                            checked={showRole}
                                            onChange={handleCheckboxChange}
                                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600" />
                                        <label
                                            htmlFor="checkbox-role"
                                            className="w-full ms-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300">Role</label>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th
                            scope="col"
                            className="p-4">
                            <div className="flex items-center">
                                <input
                                    id="checkbox-all-search"
                                    type="checkbox"
                                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 
                                    dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                    onChange={handleSelectAllChange}
                                    checked={selectedUsers.length === users.length}
                                />
                                <label
                                    htmlFor="checkbox-all-search"
                                    className="sr-only">checkbox</label>
                            </div>
                        </th>
                        {
                            showName && (
                                <th
                                    scope="col"
                                    className="px-6 py-3">
                                    <div
                                        className="flex items-center"
                                        onClick={() => requestSort('profile')}>
                                        Name
                                        <a href="#">
                                            <svg
                                                className="w-3 h-3 ms-1.5"
                                                aria-hidden="true"
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="currentColor"
                                                viewBox="0 0 24 24">
                                                <path
                                                    d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 
                                                    1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z" />
                                            </svg></a>
                                    </div>
                                </th>
                            )
                        }
                        {
                            showRole && (
                                <th
                                    scope="col"
                                    className="px-6 py-3">
                                    <div className="flex items-center">
                                        Role
                                    </div>
                                </th>
                            )
                        }
                    </tr>
                </thead>
                <tbody>
                    {currentUsers.map(user => (
                        <tr
                            key={user.id}
                            className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                            <td className="w-4 p-4">
                                <div className="flex items-center">
                                    <input
                                        id={`checkbox-table-search-${user.id}`}
                                        type="checkbox"
                                        checked={selectedUsers.includes(user.id)}
                                        onChange={() => handleUserSelectChange(user.id)}
                                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 
                                        dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                    <label
                                        htmlFor={`checkbox-table-search-${user.id}`}
                                        className="sr-only">checkbox</label>
                                </div>
                            </td>
                            {
                                showName && (
                                    <td
                                        scope="row"
                                        className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                                        <img
                                            className="w-8 rounded-full"
                                            src={icAsset.ouUser}
                                            alt="img" />
                                        <div className="ps-3">
                                            <div className="text-base font-semibold">{user.profile?.firstName} {user.profile?.lastName}</div>
                                            <div className="font-normal text-gray-500">{user.username}</div>
                                            <div className="font-normal text-gray-500">{user.email}</div>
                                        </div>
                                    </td>
                                )
                            }
                            {
                                showRole && (
                                    <td className="px-6 py-4">
                                        {loggedInUser?.role === 'super_admin' ? (
                                            <select
                                                className="w-30 text-sm font-semibold text-gray-600 border border-gray-400 rounded-lg focus:ring-primary-500"
                                                value={user.role}
                                                onChange={(e) => handleRoleChange(user.id, e.target.value)}
                                            >
                                                <option value="super_admin">Super Admin</option>
                                                <option value="admin">Admin</option>
                                                <option value="user">User</option>
                                            </select>
                                        ) : user.role}
                                    </td>
                                )
                            }
                        </tr>
                    ))}
                </tbody>
            </table>

            <nav
                className="flex items-center flex-column flex-wrap md:flex-row justify-between p-4"
                aria-label="Table navigation">
                <span
                    className="text-sm font-normal text-gray-500 dark:text-gray-400 mb-4 md:mb-0 block w-full md:inline md:w-auto">Showing
                    <span className="font-semibold text-gray-900 dark:text-white">{startItem}-{endItem}</span> of
                    <span className="font-semibold text-gray-900 dark:text-white">{totalItems}</span></span>
                <ul className="inline-flex -space-x-px rtl:space-x-reverse text-sm h-8">
                    <li>
                        <a
                            href="#"
                            onClick={() => handlePageChange(currentPage - 1)}
                            className={`flex items-center justify-center px-3 h-8 ms-0 leading-tight 
                                ${currentPage === 1
                                    ? 'text-gray-300 cursor-not-allowed'
                                    : 'text-gray-500 hover:bg-gray-100 hover:text-gray-700'} bg-white border border-gray-300 rounded-s-lg`}
                            aria-disabled={currentPage === 1}
                        >
                            Previous
                        </a>
                    </li>
                    {Array.from({ length: totalPages }, (_, index) => (
                        <li key={index}>
                            <a
                                href="#"
                                onClick={() => handlePageChange(index + 1)}
                                className={`flex items-center justify-center px-3 h-8 leading-tight 
                                    ${currentPage === index + 1
                                        ? 'text-blue-600 border border-gray-300 bg-blue-50'
                                        : 'text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700'} 
                                        dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white`}
                                aria-current={currentPage === index + 1 ? 'page' : undefined}
                            >
                                {index + 1}
                            </a>
                        </li>
                    ))}
                    <li>
                        <a
                            href="#"
                            onClick={() => handlePageChange(currentPage + 1)}
                            className={`flex items-center justify-center px-3 h-8 leading-tight 
                                ${currentPage === totalPages
                                    ? 'text-gray-300 cursor-not-allowed'
                                    : 'text-gray-500 hover:bg-gray-100 hover:text-gray-700'} bg-white border border-gray-300 rounded-e-lg`}
                            aria-disabled={currentPage === totalPages}
                        >
                            Next
                        </a>
                    </li>
                </ul>
            </nav>
        </div>
    );
}

export default ManagementUserPage;
