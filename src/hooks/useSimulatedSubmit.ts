import { useState } from "react"
import { ISimulatedData } from "../interfaces/simulated";
import { postSimulated } from "../services/SimulatedService";

export const useSimulatedSubmit = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null);
  const [succes, setSuccess] = useState(false)

  const submitSimulated = async (simulatedData: ISimulatedData) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await postSimulated(simulatedData);

      setSuccess(true);
      return { success: true, data: response };
    } catch (error) {
      const errMsg = error instanceof Error ? error.message : "Erro desconhecido";

      console.error("Erro ao criar simulado:", errMsg);
      setError("Erro ao criar o simulado.");

      if (error instanceof Error && (error as any).response?.data?.message) {
        return { success: false, error: (error as any).response.data.message };
      }
      return { success: false, error: "Erro desconhecido" };
    } finally {
      setLoading(false);
    }
  };


  return {
    submitSimulated,
    loading,
    error,
    succes
  }

}