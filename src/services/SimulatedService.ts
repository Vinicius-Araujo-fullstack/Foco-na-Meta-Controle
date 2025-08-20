import api from "../utils/api";
import { ISimulatedData } from "../interfaces/simulated";

export const postSimulated = async (
    data: ISimulatedData
): Promise<{ id: string }> => {
    const res = await api.post("/simulated", data)
    return res.data.response;
}
