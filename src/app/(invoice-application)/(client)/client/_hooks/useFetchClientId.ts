import baseUrl from "@/utils/baseUrl";
import { ClientResponse, ClientWithInvoicesResponse } from "@/types/ClientType";
import useFetch from "@/hooks/useFetch";

const useFetchClientId = (clientId: number) => {
  const { data, isLoading, isError, error } = useFetch<ClientWithInvoicesResponse>(
    "client",
    `${baseUrl}api/client/${clientId}`
  );

  return { data, isLoading, isError, error };
};

export default useFetchClientId;
