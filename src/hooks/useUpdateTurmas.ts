import { useState } from "react";
import api from "../utils/api.ts";

export function useUpdateEvaluate() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updateEvaluate = async (data: any) => {
    setLoading(true);
    setError(null);

    try {
      const response = await api.put("/update-students", data);

      if (response.data.message !== "Alunos sincronizados com sucesso!") {
        throw new Error("Erro ao atualizar avaliação");
      }

      return true;
    } catch (err: any) {
      setError(err.message || "Erro desconhecido");
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { updateEvaluate, loading, error };
}
