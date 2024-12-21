import baseUrl from "@/utils/baseUrl";
import { ClientResponse } from "@/types/ClientType";
import useFetch from "@/hooks/useFetch";

const useFetchClients = (query?: string, page?: number, limit?: number) => {
  const { data, isLoading, isError, error } = useFetch<ClientResponse>(
    "clients",
    `${baseUrl}api/client/`,
    {
      params: {
        query,
        page,
        limit,
      },
    }
  );

  return { data, isLoading, isError, error };
};

export default useFetchClients;
