import useSWR from "swr";
import { getArticles } from "../services/articleService";

const useArticles = () => {
  const { data, error, isLoading, mutate } = useSWR("articles", getArticles);

  return {
    mutate,
    isLoading,
    articles: data,
    isError: error,
  };
};

export default useArticles;
