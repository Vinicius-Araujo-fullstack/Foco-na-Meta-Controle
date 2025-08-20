import useSWR from "swr"
import api from "../utils/api"

const useFile = () => {
    const { data, error, isLoading, mutate } = useSWR(`/return-files`, (url) => api.get(url).then((res) => res.data.response))

    return {
        files: data || [],
        isError: error,
        isLoading: isLoading,
        mutateFile: mutate,
    }
}

export default useFile;