import baseUrl from "@/utils/baseUrl";
import useFetch from "@/hooks/useFetch";
import { useRouter } from "next/navigation";

type SumTotalOutstandingResponse = {
    data: {
        sum: number
    };
    message?: string;
    code?: number;
}

const useFetchSumTotalOutstanding = () => {
  const router = useRouter();
  const token = localStorage.getItem("token");
    
  if (!token) {
    router.push("/sign-in");
  }
  
  const { data: sumTotalOutstandingData, isLoading: stillLoading, isError: hasError, error: showError } = useFetch<SumTotalOutstandingResponse>(
    "sum",
    `${baseUrl}api/client/sum/total-outstanding/`
  );

  return { sumTotalOutstandingData, stillLoading, hasError, showError };
};

export default useFetchSumTotalOutstanding;