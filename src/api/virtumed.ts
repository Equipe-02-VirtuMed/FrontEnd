import axios from 'axios'
import { Auth } from '../helpers/Auth';

const token = Auth.token();

const api = axios.create({
    baseURL:'http://localhost:3333',
    headers: {'Authorization': 'Bearer '+ token}
})

api.interceptors.request.use((config: any) => {
    try {
      const token = localStorage.getItem("jwtLocalStorage");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    } catch (error: any) {
      console.log(error);
    }
  });

  export interface CreateUser {
    name: string;
    image:string;
    password: string;
    confirmPassword: string;
    email: string;
    crm:string;
    residency:string;
    uf:string;
    role:string;
  }

  export interface Login{
    email: string;
    password: string;
  }

  export const register = async (data: CreateUser): Promise<any> => {
    const response = await api.post('/create-user', data)
    return response
  }

  export const login = async (data: Login): Promise<any> => {
    const response = await api.post('/auth/sign-in-user', data)
    return response
  }
  
  export default api;