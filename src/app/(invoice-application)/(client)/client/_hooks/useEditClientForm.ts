import { UpdateClient, updateClientSchema } from "@/utils/validations/ClientSchema";
import { useState } from "react";

type ClientErrors = {
    firstname?: string,
    lastname?: string,
    companyName?: string,
    email?: string,
    phoneNumber?: string,
    businessPhone?: string,
    mobilePhone?: string,
    address?: string
}

const useEditClientForm = () => {
    const selectedValues: UpdateClient = {
        id: 0,
        firstname: "",
        lastname: "",
        companyName: "",
        email: "",
        phoneNumber: "",
        businessPhone: "",
        mobilePhone: "",
        address: ""
    }
    const [currentValues, setCurrentValues] = useState<UpdateClient>(selectedValues);
    const [errors, setErrors] = useState<ClientErrors>({});

    const handleChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = target;
        setCurrentValues((input) => ({ ...input, [name]: value }));
    };

    const validateEditClientForm = () => {
        const result = updateClientSchema.safeParse(currentValues);
        if(result.error) {
            const errorMessages = result.error.flatten().fieldErrors;
            setErrors({
                firstname: errorMessages.firstname?.[0],
                lastname: errorMessages.lastname?.[0],
                companyName: errorMessages.companyName?.[0],
                email: errorMessages.email?.[0],
                phoneNumber: errorMessages.phoneNumber?.[0],
                businessPhone: errorMessages.businessPhone?.[0],
                mobilePhone: errorMessages.mobilePhone?.[0],
                address: errorMessages.address?.[0]
            });
            return false;
        }
        setErrors({});
        setCurrentValues(currentValues);
        return true;
    }

    return {
        currentValues,
        setCurrentValues,
        errors,
        handleChange,
        validateEditClientForm
    }
}

export default useEditClientForm;