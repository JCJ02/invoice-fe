import baseUrl from "@/utils/baseUrl";
import usePost from "@/hooks/usePost";
import { useQueryClient } from "@tanstack/react-query";
import { NewInvoices } from "@/utils/validations/InvoicesSchema";
import { Bounce, toast } from 'react-toastify';

interface NewInvoicesResponse {
    id: number,
    description: string,
    rate: number,
    quantity: number,
    dueDate: Date
}

const useNewInvoicesMutation = (clientId: number) => {
    const UseQueryClient = useQueryClient();
    const newInvoicesMutation = usePost<{invoices: NewInvoices[]}, NewInvoicesResponse[]>({
        url: `${baseUrl}api/client/create-invoices/${clientId}`,
        requiresAuthentication: true,
        onSuccess: () => {
            toast.success('Successfully Created!', {
                toastId: "newInvoicesSuccess",
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
        }
    });
    return newInvoicesMutation;
}

export default useNewInvoicesMutation;