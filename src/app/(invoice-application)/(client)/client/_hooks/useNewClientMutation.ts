import baseUrl from "@/utils/baseUrl";
import { NewClient } from "@/utils/validations/ClientSchema";
import usePost from "../../../../../hooks/usePost";
import { Bounce, toast } from 'react-toastify';
import { useQueryClient } from "@tanstack/react-query";

type NewClientResponse = {
    id: number,
    firstname: string,
    lastname: string,
    companyName: string,
    email?: string,
    phoneNumber?: string,
    businessPhone?: string,
    mobilePhone?: string,
    address?: string
}

const useNewClientMutation = () => {
    const UseQueryClient = useQueryClient();
    const newClientMutation = usePost<NewClient, NewClientResponse>({
        url: `${baseUrl}api/client/`,
        requiresAuthentication: true,
        onSuccess: () => {
            toast.success('Successfully Created!', {
                toastId: "newClientSuccess",
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

    return newClientMutation;

}

export default useNewClientMutation;