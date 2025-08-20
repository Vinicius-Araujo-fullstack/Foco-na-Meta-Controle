import useSWR from "swr";
import api from "../utils/api";

export interface ICityFilters {
  schoolId: string | number | null;
}

const useTurmasBySchool = (filters?: ICityFilters) => {
  const { data, error, isLoading } = useSWR(
    filters?.schoolId ? `/turmas/${filters?.schoolId}` : null,
    (url) => api.get(url).then((res) => res.data.response)
  );

  return {
    turmasBySchool: data,
    isLoading,
    isError: error,
  };
};

export default useTurmasBySchool;
