import useSWR from "swr";
import api from "../utils/api";

export interface EvaluateFilters {
  disciplinaName?: string;
  disciplina?: string;
  segmento?: string;
  serie?: string;
  // escolaId?: string;
}

const useAllEvaluate = (filters?: EvaluateFilters) => {
  const queryParams = new URLSearchParams();
  if (filters?.disciplinaName) queryParams.append("disciplinaName", filters.disciplinaName);
  if (filters?.disciplina) queryParams.append("disciplina", filters.disciplina);
  if (filters?.segmento) queryParams.append("segmento", filters.segmento);
  if (filters?.serie) queryParams.append("serie", filters.serie);

  const queryString = queryParams.toString();

  const url = `/evaluate${queryString ? `?${queryString}` : ""}`;

  const { data, error, isLoading, mutate } = useSWR(
    url,
    (url) => api.get(url).then((res) => res.data.response)
  );

  return {
    evaluate: data,
    isLoading,
    isError: error,
    mutateEvaluate: mutate,
    swrKey: url,
  };
};

export default useAllEvaluate;