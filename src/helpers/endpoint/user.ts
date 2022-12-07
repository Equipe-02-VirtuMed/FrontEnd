import api from "../../api/virtumed";

export const user = {
    createUser: () => `${api}/user`,
    listUsers: () => `${api}/user`,
    userById: (id: string) => `${api}/user/${id}`,
};