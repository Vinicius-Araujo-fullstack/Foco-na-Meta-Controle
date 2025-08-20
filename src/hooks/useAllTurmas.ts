import useSWR from "swr";
import api from "../utils/api";

export interface TurmaFilters {
  schoolName?: string;
  date?: string; // Quando não há filtro, esse campo pode ser undefined ou uma string vazia
  turmaId?: string;
  escolaId?: string;
}

const useAllTurmas = (filters?: TurmaFilters, idTurma?: number) => {
  // Constrói a query string apenas com os filtros definidos
  const queryParams = new URLSearchParams();
  if (filters?.schoolName) queryParams.append("schoolName", filters.schoolName);
  if (filters?.date) queryParams.append("created_before", filters.date);
  if (filters?.turmaId) queryParams.append("turmaId", filters.turmaId);
  if (filters?.escolaId) queryParams.append("escolaId", filters.escolaId);

  const queryString = queryParams.toString();

  const url = idTurma
    ? `/all-turmas?turmaId=${idTurma}`
    : `/all-turmas${queryString ? `?${queryString}` : ""}`;

  const { data, error, isLoading, mutate } = useSWR(
    url,
    (url) => api.get(url).then((res) => res.data.response)
  );

  return {
    turmas: data,
    isLoading,
    isError: error,
    mutateTurmas: mutate,
  };
};

export default useAllTurmas;
