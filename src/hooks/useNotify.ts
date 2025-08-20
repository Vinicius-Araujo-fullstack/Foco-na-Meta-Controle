import useSWR from "swr";
import { getNotify } from "../services/notifyService";

const useNotify = ({ idCity, idRecipient }: { idCity?: string; idRecipient?: string }) => {
  const { data, error, isLoading, mutate } = useSWR(["notifications", idCity, idRecipient], () =>
    getNotify({ idRecipient, idCity })
  );

  return {
    notifications: data?.notifications,
    isLoading,
    mutateNotify: mutate,
    isError: error,
  };
};

export default useNotify;
