import { useQuery, UseQueryOptions, UseQueryResult } from "@tanstack/react-query";
import axios from "axios";

const useFetch = <TQueryFnData = unknown, TError = unknown, TData = TQueryFnData>(
  queryKey: string[],
  api: string,
  options?: UseQueryOptions<TQueryFnData, TError, TData>
): UseQueryResult<TData, TError> => {

const fetcher = async (): Promise<TQueryFnData> => {
    try {
        const token = localStorage.getItem("token")?.trim();
        if (!token) throw new Error("Token Not Found In Local Storage");
        console.log("Token Being Sent:", token);
        console.log("Authorization Header:", `Bearer ${token}`);
        const response = await axios.get<TQueryFnData>(api, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error("Axios Error", error.response?.data);
            throw new Error(error.response?.data?.message || 'Request Failed');
        }
        console.error("Unknown Error", error);
        throw error;
    }
  };
  
  const query = useQuery<TQueryFnData, TError, TData>({
    queryKey,
    queryFn: fetcher,
    enabled: typeof window !== 'undefined' && !!localStorage.getItem("token"),
    ...options,
  });

  return query;
};

export default useFetch;
