import { User } from "./user";

export interface Login {
  email: string | undefined;
  password: string | undefined;
}

export interface LoginResponse {
  token: string;
  user: User;
}