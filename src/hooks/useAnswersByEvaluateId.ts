// hooks/useAnswersByEvaluateId.ts
import { useEffect, useState } from "react";
import api from "../utils/api.ts";

interface AnswerBlock {
  id: string;
  evaluate_id: string;
  block_number: number;
  [key: string]: string | number | null;
}

export function useAnswersByEvaluateId(evaluateId: string) {
  const [answers, setAnswers] = useState<AnswerBlock[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!evaluateId) return;

    const fetchAnswers = async () => {
      try {
        setLoading(true);
        const {data} = await api.get(`/answers/${evaluateId}`)
        setAnswers(data.response);
      } catch (err) {
        setError("Erro ao buscar gabarito");
      } finally {
        setLoading(false);
      }
    };

    fetchAnswers();
  }, [evaluateId]);

  return { answers, loading, error };
}
