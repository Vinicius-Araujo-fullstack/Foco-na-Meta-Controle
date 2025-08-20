import useSWR from "swr";
import api from "../utils/api";

export interface EvaluateFilters {
  disciplinaName?: string;
  disciplina?: string;
  segmento?: string;
  serie?: string;
  // escolaId?: string;
}

const useAllSimulated = (filters?: EvaluateFilters) => {
  const queryParams = new URLSearchParams();
  if (filters?.disciplinaName) queryParams.append("disciplinaName", filters.disciplinaName);
  if (filters?.disciplina) queryParams.append("disciplina", filters.disciplina);
  if (filters?.segmento) queryParams.append("segmento", filters.segmento);
  if (filters?.serie) queryParams.append("serie", filters.serie);

  const queryString = queryParams.toString();

  const { data, error, isLoading, mutate } = useSWR(
    `/all-simulateds${queryString ? `?${queryString}` : ""}`,
    (url) => api.get(url).then((res) => res.data.response)
  );

  return {
    simulateds: data,
    isLoading,
    isError: error,
    mutateSimulateds: mutate,
  };
};

export default useAllSimulated;
