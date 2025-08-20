import useSWR from "swr";
import api from "../utils/api";

export interface IStudentsFilters {
  turmaId: string | number | null;
}

const useStudents = (filters?: IStudentsFilters) => {
  const { data, error, isLoading } = useSWR(
    filters?.turmaId ? `/students/${filters?.turmaId}` : null,
    (url) => api.get(url).then((res) => res.data.response)
  );

  return {
    students: data,
    isLoading,
    isError: error,
  };
};

export default useStudents;
