import resAuth from "../data/interfaces/resAuth";

type AuthContextType = {
    signIn: (email: string, password: string) => Promise<resAuth>;
    signUp: (username: string, email: string, password: string) => Promise<resAuth>;
    signOut: () => void;
};

export type { AuthContextType };