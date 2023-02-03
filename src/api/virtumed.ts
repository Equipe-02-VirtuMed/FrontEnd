import axios from 'axios'
import { Auth } from '../helpers/Auth';

const token = Auth.token();

const api = axios.create({
    baseURL: 'https://virtumed-server-1-production.up.railway.app',
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

  export const getSchedules = async (email:any,typeUser:string): Promise<any> => {
    if(typeUser === 'Doctor'){
      const doctor = await api.get('/schedule/doctor', email)
      return doctor
    }else{
      const pacient = await api.get('/schedule/pacient', email)
      return pacient
    }
  }

  export const postSchedule = async (data: any): Promise<any> => {
    const response = await api.post('/create-schedule', data)
    return response
  }
  
  export default api;