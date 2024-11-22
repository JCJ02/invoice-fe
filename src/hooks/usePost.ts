import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";

interface UsePostParams<TRequest, TResponse> {
  api: string;
  onSuccess?: (data: TResponse) => void;
  onError?: (error: AxiosError) => void;
}

const usePost = <TRequest, TResponse>({
  api,
  onSuccess,
  onError,
}: UsePostParams<TRequest, TResponse>) => {
  const mutation = useMutation<TResponse, AxiosError, TRequest>({
    mutationFn: async (data: TRequest) => {
      const response = await axios.post<TResponse>(api, data);
      return response.data;
    },
    onSuccess,
    onError,
  });

  return mutation;
};

export default usePost;

