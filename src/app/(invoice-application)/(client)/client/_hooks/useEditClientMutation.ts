import baseUrl from "@/utils/baseUrl";
import { NewClient } from "@/utils/validations/ClientSchema";
import { Bounce, toast } from 'react-toastify';
import { useQueryClient } from "@tanstack/react-query";
import usePut from "@/hooks/usePut";

type EditClientResponse = {
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

const useEditClientMutation = (clientId: number) => {
    const UseQueryClient = useQueryClient();
    const editClientMutation = usePut<NewClient, EditClientResponse>({
        url: `${baseUrl}api/client/${clientId}`,
        requiresAuthentication: true,
        onSuccess: () => {
            toast.success('Successfully Updated!', {
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
            UseQueryClient.invalidateQueries({ queryKey: ["clients"] });
        }
    });

    return editClientMutation;

}

export default useEditClientMutation;