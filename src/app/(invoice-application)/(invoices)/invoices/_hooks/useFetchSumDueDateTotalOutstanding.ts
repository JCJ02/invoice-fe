import baseUrl from "@/utils/baseUrl";
import useFetch from "@/hooks/useFetch";
import { useRouter } from "next/navigation";

type SumDueDateTotalOutstandingResponse = {
  data: {
    sum: number
  };
  message?: string;
  code?: number;
}

const useFetchSumDueDateTotalOutstanding = () => {
  const router = useRouter();
  const token = localStorage.getItem("token");

  if (!token) {
    router.push("/sign-in");
  }

  const { data: sumDueDateTotalOutstandingData, isLoading: dueDateLoading, isError: dueDateError, error: viewError } = useFetch<SumDueDateTotalOutstandingResponse>(
    "sum",
    `${baseUrl}api/client/sum/due-date-total-outstanding/`
  );

  return { sumDueDateTotalOutstandingData, dueDateLoading, dueDateError, viewError };
};

export default useFetchSumDueDateTotalOutstanding;