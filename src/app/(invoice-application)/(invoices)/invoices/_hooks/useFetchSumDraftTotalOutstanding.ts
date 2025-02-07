import baseUrl from "@/utils/baseUrl";
import useFetch from "@/hooks/useFetch";
import { useRouter } from "next/navigation";

type SumDraftTotalOutstandingResponse = {
    data: {
        sum: number
    };
    message?: string;
    code?: number;
}

const useFetchSumDraftTotalOutstanding = () => {
  const router = useRouter();
  const token = localStorage.getItem("token");
    
  if (!token) {
    router.push("/sign-in");
  }
  
  const { data: sumDraftTotalOutstandingData, isLoading: draftLoading, isError: draftError, error: displayError } = useFetch<SumDraftTotalOutstandingResponse>(
    "sum",
    `${baseUrl}api/client/sum/draft-total-outstanding/`
  );

  return { sumDraftTotalOutstandingData, draftLoading, draftError, displayError };
};

export default useFetchSumDraftTotalOutstanding;