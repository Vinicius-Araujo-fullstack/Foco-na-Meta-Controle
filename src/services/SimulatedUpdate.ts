import api from "../utils/api";
import { ISimulatedData } from "../interfaces/simulated";

export const putSimulated = async (
  data: ISimulatedData
): Promise<{ id: string }> => {
  const res = await api.put("/simulated", data);
  return res.data.response;
};
