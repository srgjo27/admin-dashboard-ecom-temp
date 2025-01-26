import { useEffect, useState } from "react";
import UserService from "../services/userService";
import { User } from "../data/interfaces/resUser";
import { useCookies } from "react-cookie";
import { toast } from "react-hot-toast";

const useUsers = () => {
    const [loading, setLoading] = useState<boolean>(true);
    const [cookies] = useCookies(['authToken']);
    const [error, setError] = useState<string | null>(null);
    const [users, setUsers] = useState<User[]>([]);
    const [profile, setProfile] = useState<User | null>(null);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const data: User[] = await UserService.getAllUser();
                setUsers(data);
            } catch (e) {
                const error = e as Error;
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        const fetchProfile = async () => {
            if (!cookies.authToken) {
                setError("Authorization token is missing");
                return;
            }

            try {
                const profileData = await UserService.getProfile(cookies.authToken);
                setProfile(profileData);
            } catch (e) {
                const error = e as Error;
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
        fetchProfile();
    }, [cookies.authToken]);

    const updateUserRole = async (id: number, role: string) => {
        if (!cookies.authToken) {
            setError("Authorization token is missing");
            return;
        }

        try {
            const res = await UserService.updateRole(id, role, cookies.authToken);

            setUsers(users.map((user) => { return user.id === id ? { ...user, role: res.role } : user; }));
            toast.success("User role updated successfully");
        } catch (e) {
            const error = e as Error;
            setError(error.message);
        }
    };

    return { users, loading, error, profile, updateUserRole };
};

export default useUsers;
