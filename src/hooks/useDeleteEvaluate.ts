import { useState } from "react";
import api from "../utils/api.ts";
import { toast } from "react-toastify";

export function
  useDeleteEvaluate() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const deleteEvaluate = async (id: string) => {
    setLoading(true);
    setError(null);

    try {
      const res = await api.delete(`/evaluate/${id}`)
      if (res.data.message !== "Avaliação deletada com sucesso") {
        throw new Error("Erro ao deletar evaluate");
      }

      return true;
    } catch (err: any) {
      const apiMessage = err?.response?.data?.message;
      toast.error(apiMessage || err.message || "Erro desconhecido");
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { deleteEvaluate, loading, error };
}
