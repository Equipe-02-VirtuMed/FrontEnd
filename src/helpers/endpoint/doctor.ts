import api from "../../api/virtumed";

export const doctor = {
    createDoctor: () => `${api}/doctor`,
    listDoctors: () => `${api}/doctor`,
    DoctorById: (id: string) => `${api}/doctor/${id}`,
};