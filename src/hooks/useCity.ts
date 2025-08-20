import useSWR from "swr";
import api from "../utils/api";

export interface ICityFilters {
  uf: string | number | null;
}

const useCity = (filters?: ICityFilters) => {
  const { data, error, isLoading } = useSWR(
    filters?.uf ? `/citys?uf=${filters?.uf}` : null,
    (url) => api.get(url).then((res) => res.data.response)
  );

  return {
    city: data,
    isLoading,
    isError: error,
  };
};

export default useCity;
