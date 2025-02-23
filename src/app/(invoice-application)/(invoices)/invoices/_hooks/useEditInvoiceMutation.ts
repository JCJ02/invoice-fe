import usePut from "@/hooks/usePut";
import baseUrl from "@/utils/baseUrl";
import { EditInvoice } from "@/utils/validations/InvoicesSchema";
import { useQueryClient } from "@tanstack/react-query";
import { Bounce, toast } from 'react-toastify';

type EditInvoicesResponse = {
    id: number,
    description: string,
    rate: number,
    quantity: number,
    dueDate: Date
}

const useEditInvoiceMutation = (invoiceId: number) => {
    const UseQueryClient = useQueryClient();
    const editClientMutation = usePut<EditInvoice, EditInvoicesResponse>({
        url: `${baseUrl}api/client/update-invoice/${invoiceId}`,
        requiresAuthentication: true,
        onSuccess: () => {
            toast.success('Successfully Updated!', {
                toastId: "editInvoicesSuccess",
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
            UseQueryClient.invalidateQueries({ queryKey: ["invoices"] });
            UseQueryClient.invalidateQueries({ queryKey: ["client"] });
            UseQueryClient.invalidateQueries({ queryKey: ["clients"] });
            UseQueryClient.invalidateQueries({ queryKey: ["sum"] });
        }
    });

    return editClientMutation;

}

export default useEditInvoiceMutation;