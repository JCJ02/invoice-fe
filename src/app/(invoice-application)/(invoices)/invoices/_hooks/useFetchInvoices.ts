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
  
// const fetchInvoices = async (
//     query: string,
//     page: number,
//     limit: number
// ): Promise<InvoicesResponse> => {
//     const token = localStorage.getItem("token");
  
//     if (!token) {
//         throw new Error("Authorization Token is Missing!");
//     }
//     const response = await axios.get<InvoicesResponse>(
//         `${baseUrl}api/client/retrieve/invoice-list/`,
//         {
//             headers: {
//                 Authorization: `Bearer ${token}`
//             },
//             params: { query, page, limit },
//         }
//     );
//     return response.data;
// };

// const useFetchInvoices = (query: string, page: number, limit: number) => {
//     return useQuery<InvoicesResponse, Error>({
//         queryKey: ["invoices", query, page, limit],
//         queryFn: () => fetchInvoices(query, page, limit)
//     });
// };

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
