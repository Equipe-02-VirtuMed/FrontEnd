import api from "../../api/virtumed";
import { User } from "../../types/api-types/user";

export const user = {
    createUser: () => `${api}/user`,
    listUsers: () => `${api}/user`,
    userById: (id: string) => `${api}/user/${id}`,
};

export const createUser = async (data: User): Promise<any> => {
    const response = await api.post(`/user`, data)
    return response
  }