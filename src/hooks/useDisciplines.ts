import useSWR from "swr";
import { getDisciplines } from "../services/disciplineService";

const useDisciplines = () => {
  const { data, error, isLoading } = useSWR("disciplines", getDisciplines);

  return {
    disciplines: data,
    isLoading,
    isError: error,
  };
};

export default useDisciplines;
