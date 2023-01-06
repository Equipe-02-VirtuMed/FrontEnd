import { User } from "./user";
export interface Register {
    email: string | undefined;
    name: string | undefined;
    password: string | undefined;
    confirmPassword: string | undefined;
    image?: string | undefined;
}

export interface RegisterResponse {
    User: User
}

