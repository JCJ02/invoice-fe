import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const useFetch = <T>(
  key: string,
  url: string, 
  options?: {
    headers?: Record<string, string>;
    params?: Record<string, any>;
  }
) => {
  const token = localStorage.getItem("token");
  return useQuery<T, Error>({
    queryKey: [key, url, options?.params],
    queryFn: async () => {
      if (!token) {
        throw new Error("Authorization Token is Missing!");
      }
      const response = await axios.get<T>(url, {
        headers: {
          Authorization: `Bearer ${token}`,
          ...options?.headers,
        },
        params: options?.params,
      });
      return response.data;
    },
  });
};

export default useFetch;
