import useSWR from "swr";
import api from "../utils/api";

export interface ITeachersFilters {
  schoolId: string | string[] | number | null;
  turmaId: string | string[] | number | null;
}

const useProfSchool = (filters?: ITeachersFilters) => {
  const { data, error, isLoading } = useSWR(
    filters?.schoolId && filters.turmaId ? `/prof-school/${filters?.schoolId}?turma=${filters?.turmaId}` : null,
    (url) => api.get(url).then((res) => res.data.response)
  );

  return {
    teachers: data,
    isLoading,
    isError: error,
  };
};

export default useProfSchool;

