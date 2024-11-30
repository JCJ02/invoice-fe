import useFetch from "./useFetch";
import baseUrl from "@/utils/baseUrl";

export type ClientTypes = {
    id: number;
    firstname: string;
    lastname: string;
    email: string;
    companyName: string;
    phoneNumber: string;
    businessPhone: string;
    mobilePhone: string;
    address: string;
    createdAt: string;
    updatedAt: string;
    deletedAt: string | null;
};
  
type ApiResponse = {
    data: {
        clients: ClientTypes[];
        totalClients: number;
    };
    message: string;
    code: number;
};
  
const useFetchClient = (query: string, page: number, limit: number) => {
    return useFetch<ApiResponse>(
        ["clients", query, page.toString(), limit.toString()],
        `${baseUrl}api/client/?query=${query}&page=${page}&limit=${limit}`
    );
};
  
export default useFetchClient;