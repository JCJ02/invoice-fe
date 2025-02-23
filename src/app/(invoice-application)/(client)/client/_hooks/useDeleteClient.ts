// src/hooks/useDeleteClient.ts
import { Bounce, toast } from "react-toastify";
import useDelete from "@/hooks/useDelete";
import baseUrl from "@/utils/baseUrl";
import { ClientResponse } from "@/types/ClientType";
import { useQueryClient } from "@tanstack/react-query";

const useDeleteClient = (clientId: number) => {
    const UseQueryClient = useQueryClient();

    const deleteClientMutation = useDelete<null, ClientResponse>({
        url: `${baseUrl}api/client/${clientId}`,
        requiresAuthentication: true,
        onSuccess: () => {
            toast.success("Successfully Deleted!", {
                toastId: "deleteClient",
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
            toast.error(`Failed To Delete Client: ${error.response?.data?.message || "Unknown Error"}`, {
                toastId: "failedToDelete",
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

    return deleteClientMutation;
};

export default useDeleteClient;
