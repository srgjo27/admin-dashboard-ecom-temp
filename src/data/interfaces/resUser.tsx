interface User {
    id: number;
    username: string;
    email: string;
    password: string;
    role: string;
    profile: Profile | null;
}

interface Profile {
    id: number;
    firstName: string;
    lastName: string;
    dateOfBirth: string;
}

export type { User, Profile };