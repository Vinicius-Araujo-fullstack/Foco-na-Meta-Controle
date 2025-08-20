import { useEffect, useState } from "react";
import api from "../utils/api.ts";


export const useEvaluateByCode = (code: string | null) => {
  const [evaluate, setEvaluate] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<null | string>(null);

  useEffect(() => {
    if (!code) return;

    const fetchEvaluate = async () => {
      try {
        setLoading(true);
        const { data } = await api.get(`/evaluate/${code}`)
        setEvaluate(data.response);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEvaluate();
  }, [code]);

  return { evaluate, loading, error };
};
