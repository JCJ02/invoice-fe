import baseUrl from "@/utils/baseUrl";
import usePost from "@/hooks/usePost";
import { useQueryClient } from "@tanstack/react-query";
import { NewInvoices } from "@/utils/validations/InvoicesSchema";

type NewInvoicesResponse = {
    id: number,
    description: string,
    rate: number,
    quantity: number,
    dueDate: Date
}

const useNewInvoicesMutation = (clientId: number) => {
    const UseQueryClient = useQueryClient();
    const newInvoicesMutation = usePost<NewInvoices, NewInvoicesResponse>({
        url: `${baseUrl}/api/client/create-invoices/${clientId}`,
        requiresAuthentication: true,
        onSuccess: () => {
            UseQueryClient.invalidateQueries({queryKey: ["invoices"]});
        }
    });
    return newInvoicesMutation;
}

export default useNewInvoicesMutation;