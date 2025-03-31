import baseUrl from "@/utils/baseUrl";
import { useQueryClient } from "@tanstack/react-query";
import { UpdateInvoices } from "@/utils/validations/InvoicesSchema";
import { Bounce, toast } from 'react-toastify';
import usePut from "@/hooks/usePut";

interface UpdateInvoicesResponse {
    id: number,
    invoiceNumber: string,
    clientId: number,
    description: string,
    rate: number,
    quantity: number,
    issuedDate: Date,
    dueDate: Date,
    totalOutstanding: number,
    notes: string,
    terms: string,
    isDraft: boolean,
    isRecurring: boolean,
    createdAt: Date,
    updatedAt: Date,
    deletedAt: Date
}
const useEditInvoicesMutation = (clientId: number, invoiceNumber: string) => {
    const UseQueryClient = useQueryClient();
    const newInvoicesMutation = usePut<{invoices: UpdateInvoices[]}, UpdateInvoicesResponse[]>({
        url: `${baseUrl}api/client/update-invoices/${clientId}/invoices?invoiceNumber=${invoiceNumber}`,
        requiresAuthentication: true,
        onSuccess: () => {
            toast.success('Successfully Created!', {
                toastId: "updateInvoicesSuccess",
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
        onError: (error) => {
            toast.error(`Failed to Update Invoices: ${error.message}`, {
                toastId: "updateInvoicesError",
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce,
            });
        }
    });
    return newInvoicesMutation;
}

export default useEditInvoicesMutation;