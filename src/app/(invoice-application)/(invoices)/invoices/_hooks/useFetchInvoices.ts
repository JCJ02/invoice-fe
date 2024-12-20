import baseUrl from "@/utils/baseUrl";
import useFetch from "@/hooks/useFetch";

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

const useFetchInvoices = (query: string, page: number, limit: number) => {
    const token = localStorage.getItem("token");
  
    if (!token) {
      throw new Error("Authorization Token is Missing!");
    }
  
    const { data, isLoading, isError, error } = useFetch<InvoicesResponse>(
      "invoices",
      `${baseUrl}api/client/retrieve/invoice-list/`,
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
