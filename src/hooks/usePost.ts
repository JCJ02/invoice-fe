import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";

interface UsePostParams<TRequest, TResponse> {
  url: string;
  requiresAuthentication: boolean;
  onSuccess?: (data: TResponse) => void;
  onError?: (error: AxiosError) => void;
}

const usePost = <TRequest, TResponse>({
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
        let token = localStorage.getItem("token");

        // IF THE TOKEN IS NOT PRESENT IN THE LOCALSTORAGE, TRY GETTING IT FROM THE STATE OR CONTEXT IF NECESSARY
        if (!token) {
          throw new Error("Authentication Token is Missing!");
        }

        console.log("Token From LocalStorage:", token); // Log the token
        headers["Authorization"] = `Bearer ${token}`;

      }
      const response = await axios.post<TResponse>(url, data, { headers });
      return response.data;
    },
    onSuccess,
    onError,
  });

  return mutation;
};

export default usePost;

