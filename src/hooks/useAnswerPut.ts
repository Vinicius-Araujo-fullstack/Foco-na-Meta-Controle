import { useState } from "react";
import api from "../utils/api.ts";
import { IAnswers } from "../interfaces/evaluate";

export const usePutAnswer = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const putAnswer = async (evaluateId: string, block: IAnswers) => {
    setLoading(true);
    setError(null);

    try {
      const { data } = await api.put(`/answers/${evaluateId}`, block);
      return data;
    } catch (err: any) {
      setError(err.response?.data?.message || "Erro ao atualizar o gabarito.");
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { putAnswer, loading, error };
};
