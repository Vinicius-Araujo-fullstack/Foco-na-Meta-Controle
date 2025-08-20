import useSWR from "swr";
import api from "../utils/api";

export interface ISchool {
  cityId: string | number | null;
}

const useSchoolsByCity = (filters?: ISchool) => {
  const { data, error, isLoading } = useSWR(
    filters?.cityId ? `/schools?city=${filters?.cityId}` : null,
    (url) => api.get(url).then((res) => res.data.response)
  );

  return {
    schools: data,
    isLoading,
    isError: error,
  };
};

export default useSchoolsByCity;
