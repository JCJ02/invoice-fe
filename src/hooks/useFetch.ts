// useFetch.ts
import baseUrl from "@/utils/baseUrl";
import { useQuery } from "@tanstack/react-query";
import axios, { isAxiosError } from "axios";

const useFetch = <T>(
  key: string,
  url: string, 
  options?: {
    headers?: Record<string, string>;
    params?: Record<string, any>;
  }
) => {
  return useQuery<T, Error>({
    queryKey: [key, url, options?.params],
    queryFn: async () => {
      const token = localStorage.getItem("token");
      const refreshToken = localStorage.getItem("refreshToken");

      if (!token) {
        throw new Error("Authorization Token is Missing!");
      }

      // PREPARE HEADERS
      const headers = {
        Authorization: `Bearer ${token}`,
        ...options?.headers,
      };

      try {
        // 1ST ATTEMPT
        const response = await axios.get<T>(url, {
          headers,
          params: options?.params,
        });
        return response.data;
      } catch (error) {
        // CHECK FOR TOKEN EXPIRATION
        if (isAxiosError(error) && error.response?.status === 401 && refreshToken) {
          try {
            // REFRESH TOKEN
            const refreshResponse = await axios.post<{
              accessToken: string;
            }>(`${baseUrl}api/admin/refresh-token`, {}, {
              headers: {
                Authorization: `Bearer ${refreshToken}`,
              },
            });

            // STORE NEW TOKEN AND RETRY
            const newToken = refreshResponse.data.accessToken;
            localStorage.setItem("token", newToken);
            headers.Authorization = `Bearer ${newToken}`;

            const retryResponse = await axios.get<T>(url, {
              headers,
              params: options?.params,
            });
            return retryResponse.data;
          } catch (refreshError) {
            // CLEAR TOKENS IF REFRESH FAILS
            localStorage.removeItem("token");
            localStorage.removeItem("refreshToken");
            throw new Error("Session expired. Please login again.");
          }
        }
        throw error;
      }
    },
    retry: false, // IMPORTANT TO PREVENT INFINITE RETRIES
  });
};

export default useFetch;