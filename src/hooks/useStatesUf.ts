import useSWR from "swr";
import api from "../utils/api";

const useStatesUf = () => {
  const { data, error, isLoading } = useSWR(`/states`, (url) =>
    api.get(url).then((res) => res.data.response)
  );

  return {
    states: data,
    isLoading,
    isError: error,
  };
};

export default useStatesUf;
