import api from "../utils/api";
export interface IDiscipline {
    id: string;
    created_at: string;
    name: string;
    sig: string;
}

export const getDisciplines = async (): Promise<IDiscipline[]> => {
    const res = await api.get("/disciplines");
    return res.data.response
}