import { useState } from "react";
import api from "../utils/api.ts";

export function useDeleteSimulado() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const deleteSimulado = async (id: string) => {
    setLoading(true);
    setError(null);

    try {
      const { data } = await api.delete(`/simulated/${id}`)
      if (!data.ok) {
        throw new Error("Erro ao deletar simulado");
      }

      return true;
    } catch (err: any) {
      setError(err.message || "Erro desconhecido");
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { deleteSimulado, loading, error };
}
