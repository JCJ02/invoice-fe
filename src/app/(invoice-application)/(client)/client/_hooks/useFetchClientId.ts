import baseUrl from "@/utils/baseUrl";
import { ClientWithInvoicesResponse } from "@/types/ClientType";
import useFetch from "@/hooks/useFetch";

const useFetchClientId = (clientId: number, invoiceNumber: string) => {
  const { data, isLoading, isError, error } = useFetch<ClientWithInvoicesResponse>(
    "client",
    `${baseUrl}api/client/${clientId}/invoices?invoiceNumber=${invoiceNumber}`
  );

  return { data, isLoading, isError, error };
};

export default useFetchClientId;
