import baseUrl from "@/utils/baseUrl";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError, isAxiosError } from "axios";

interface UsePostParams<TRequest, TResponse> {
  url: string;
  requiresAuthentication: boolean;
  onSuccess?: (data: TResponse) => void;
  onError?: (error: AxiosError) => void;
}

const useDelete = <TRequest, TResponse>({
  url,
  requiresAuthentication,
  onSuccess,
  onError,
}: UsePostParams<TRequest, TResponse>) => {
  const mutation = useMutation<TResponse, AxiosError, TRequest>({
    mutationFn: async (data: TRequest) => {
      const headers: Record<string, string> = {};

      if (requiresAuthentication) {

        // ENSURE THE TOKEN IS AVAILABLE
        const token = localStorage.getItem("token");
        const refreshToken = localStorage.getItem("refreshToken");

        // IF THE TOKEN IS NOT PRESENT IN THE LOCALSTORAGE, TRY GETTING IT FROM THE STATE OR CONTEXT IF NECESSARY
        if (!token) {
          throw new Error("Authentication Token is Missing!");
        }

        headers["Authorization"] = `Bearer ${token}`;

        try {
          const response = await axios.post<TResponse>(url, data, { headers });
          return response.data;
        } catch (error: any) {
          if (isAxiosError(error) && error.response?.status === 401 && refreshToken) {
            try {
              // TRY TO REFRESH THE TOKEN
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

              const retryResponse = await axios.post<TResponse>(url, data, { headers });
              return retryResponse.data;
            } catch (refreshError) {
              localStorage.removeItem("token");
              localStorage.removeItem("refreshToken");
              throw new Error("Session expired. Please Login Again.");
            }
          }
          throw error;
        }

      }
      const response = await axios.post<TResponse>(url, data, { headers });
      return response.data;
    },
    onSuccess,
    onError: (error) => {
      if (onError) {
        onError(error);
      }
      
      // AUTOMATIC ERROR HANDLING
      if (error.message === "Session Expired. Please Login Again.") {
        window.location.href = "/sign-in";
      }
    },
  });

  return mutation;
};

export default useDelete;

