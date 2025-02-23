import baseUrl from "@/utils/baseUrl";
import { ClientResponse } from "@/types/ClientType";
import useFetch from "@/hooks/useFetch";
import { useRouter } from "next/navigation";

const useFetchClients = (query?: string, page?: number, limit?: number) => {
  const router = useRouter();
  const token = localStorage.getItem("token");

  if (!token) {
    router.push("/sign-in");
  }

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
