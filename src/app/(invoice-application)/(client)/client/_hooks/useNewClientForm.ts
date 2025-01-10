import { NewClient, newClientSchema } from "@/utils/validations/ClientSchema";
import { useState } from "react";

type NewClientErrors = {
    firstname?: string,
    lastname?: string,
    companyName?: string,
    email?: string,
    phoneNumber?: string,
    businessPhone?: string,
    mobilePhone?: string,
    address?: string
}

const useNewClientForm = () => {
    const defaultValues: NewClient = {
        firstname: "",
        lastname: "",
        companyName: "",
        email: "",
        phoneNumber: "",
        businessPhone: "",
        mobilePhone: "",
        address: ""
    }
    const [values, setValues] = useState<NewClient>(defaultValues);
    const [errors, setErrors] = useState<NewClientErrors>({});

    const handleChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = target;
        setValues((input) => ({ ...input, [name]: value }));
    };

    const validateNewClientForm = () => {
        const result = newClientSchema.safeParse(values);
        if (result.error) {
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
        setValues(defaultValues);
        return true;
    }

    return {
        values,
        setValues,
        errors,
        handleChange,
        validateNewClientForm
    }
}

export default useNewClientForm;