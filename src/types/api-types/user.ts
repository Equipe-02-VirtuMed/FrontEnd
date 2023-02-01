export interface User {
    email: string;
    name: string;
    password: string;
    confirmPassword: string;
    image: string;
  }

  export interface UserResponse {
    id: string;
    email: string;
    name: string;
    image: string;
    updatedAt?: string;
    createdAt?: string;
  }
