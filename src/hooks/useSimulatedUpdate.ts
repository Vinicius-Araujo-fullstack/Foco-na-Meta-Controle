import { useState } from "react";
import { ISimulatedData } from "../interfaces/simulated";
import { putSimulated } from "../services/SimulatedUpdate";

// Tipo de retorno padronizado
type UpdateResult =
  | { success: true; data: any }
  | { success: false; error: string };

export const useSimulatedUpdate = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const updateSimulated = async (
    simulatedData: ISimulatedData
  ): Promise<UpdateResult> => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await putSimulated(simulatedData);
      setSuccess(true);
      return { success: true, data: response };
    } catch (error) {
      if (
        typeof error === "object" &&
        error !== null &&
        "response" in error &&
        typeof (error as any).response === "object" &&
        (error as any).response !== null &&
        "data" in (error as any).response
      ) {
        console.log((error as any).response.data);
      }
      const errMsg = error instanceof Error ? (error as any).response.data : "Erro desconhecido";
      console.error("Erro ao atualizar simulado:", error);
      setError(errMsg);
      return { success: false, error: errMsg };
    } finally {
      setLoading(false);
    }
  };

  return {
    updateSimulated,
    loading,
    error,
    success,
  };
};
