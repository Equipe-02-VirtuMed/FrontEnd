export interface Doctor {
    email: string;
    name: string;
    residency: string;
    password: string;
    confirmPassword: string;
    image: string;
  }

  export interface DoctorResponse {
    id: string;
    email: string;
    name: string;
    residency: string;
    image: boolean;
    updatedAt?: string;
    createdAt?: string;
  }
