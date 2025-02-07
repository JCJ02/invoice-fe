import baseUrl from "@/utils/baseUrl";
import usePost from "@/hooks/usePost";
import { useQueryClient } from "@tanstack/react-query";
import { NewInvoices } from "@/utils/validations/InvoicesSchema";
import { Bounce, toast } from 'react-toastify';

interface DraftInvoicesResponse {
    id: number,
    description: string,
    rate: number,
    quantity: number,
    dueDate: Date,
}

const useDraftInvoicesMutation = (clientId: number) => {
    const UseQueryClient = useQueryClient();
    const draftInvoicesMutation = usePost<{invoices: NewInvoices[]}, DraftInvoicesResponse[]>({
        url: `${baseUrl}api/client/draft-invoices/${clientId}`,
        requiresAuthentication: true,
        onSuccess: () => {
            toast.error('Drafted', {
                toastId: "draftInvoicesSuccess",
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
        }
    });
    return draftInvoicesMutation;
}

export default useDraftInvoicesMutation;