import baseUrl from "@/utils/baseUrl";
import useFetch from "@/hooks/useFetch";
import { useRouter } from "next/navigation";

interface Invoice {
  id: number,
  invoiceNumber: string;
  clientId: number;
  description: string;
  rate: number;
  quantity: number;
  lineTotal: number;
  issuedDate: string;
  dueDate: string;
  totalOutstanding: string;
  createdAt: Date;
  updatedAt: Date;
  deleteAt: Date;
}

interface Client {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  companyName: string;
  phoneNumber: string;
  businessPhone: string;
  mobilePhone: string;
  address: string;
  createdAt: Date;
  updatedAt: Date;
  deleteAt: Date;
  invoices: Invoice[];
}

interface InvoicesResponse {
  data: {
    clients: Client[];
    totalClients: number;
  };
  message: string;
  code: number;
}

const useFetchInvoices = (query?: string, page?: number, limit?: number) => {
  const router = useRouter();
  const token = localStorage.getItem("token");

  if (!token) {
    router.push("/sign-in");
  }

  const { data, isLoading, isError, error } = useFetch<InvoicesResponse>(
    "invoices",
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

export default useFetchInvoices;