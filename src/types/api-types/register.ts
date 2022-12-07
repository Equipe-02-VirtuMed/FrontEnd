import { User } from "./user";
export interface Register {
    email: string;
    name: string;
    password: string;
    residency?: string;
    confirmPassword: string;
    image: string;
}

export interface RegisterResponse {
    User: User
}

