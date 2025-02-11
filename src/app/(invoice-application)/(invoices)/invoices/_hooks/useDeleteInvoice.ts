// src/hooks/useDeleteClient.ts
import { Bounce, toast } from "react-toastify";
import useDelete from "@/hooks/useDelete";
import baseUrl from "@/utils/baseUrl";
import { ClientResponse } from "@/types/ClientType";
import { useQueryClient } from "@tanstack/react-query";

const useDeleteInvoice = (invoiceId: number) => {
    const UseQueryClient = useQueryClient();
    
    const deleteInvoiceMutation = useDelete<null, ClientResponse>({
        url: `${baseUrl}api/client/delete-invoice/${invoiceId}`,
        requiresAuthentication: true,
        onSuccess: () => {
            toast.success("Successfully Deleted!", {
                toastId: "deleteInvoice",
                position: "top-right",
                autoClose: 1500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce,
            });
            UseQueryClient.invalidateQueries({queryKey: ["invoices"]});
            UseQueryClient.invalidateQueries({queryKey: ["client"]});
            UseQueryClient.invalidateQueries({queryKey: ["clients"]});
            UseQueryClient.invalidateQueries({queryKey: ["sum"]});
        },
        onError: (error: any) => {
            toast.error(`Failed To Delete: ${error.response?.data?.message || "Unknown Error"}`, {
                toastId: "failedToDeleteInvoice",
                position: "top-right",
                autoClose: 1500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce,
            });
        },
    });

    return deleteInvoiceMutation;
};

export default useDeleteInvoice;
