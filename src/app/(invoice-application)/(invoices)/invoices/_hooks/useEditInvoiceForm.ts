import { EditInvoice, updateInvoiceSchema } from "@/utils/validations/InvoicesSchema";
import { useState } from "react";

type EditInvoiceWithTotal = EditInvoice & {
    lineTotal?: number;
    totalOutstanding?: number;
};

type EditInvoiceErrors = {
    description?: string,
    rate?: string,
    quantity?: string,
    dueDate?: string,
}

const useEditInvoiceForm = () => {
    const selectedValues: EditInvoice = {
        description: "",
        rate: 0.00,
        quantity: 0.00,
        dueDate: new Date()
    }
    const [currentValues, setCurrentValues] = useState<EditInvoice>(selectedValues);
    const [errors, setErrors] = useState<EditInvoiceErrors>({});
    const [totalOutstanding, setTotalOutstanding] = useState<number>(0.00);

    const decimalFormat = (value: number) => {
        return Math.round(value * 100) / 100; 
    };

    const calculateTotalOutstanding = (invoice: EditInvoiceWithTotal) => {
        if (!invoice) return;

        const total = invoice.lineTotal || 0;
        setTotalOutstanding(decimalFormat(total));
    };    

    const handleChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type } = target;
        setCurrentValues((previousValues) => {
            const updatedValues = { 
                ...previousValues, 
                [name]: 
                    type === "number"
                        ? value.trim() === "" ? 0 : decimalFormat(parseFloat(value))
                        : name === "dueDate"
                        ? new Date(value)
                        : value
            };
    
            if (name === "rate" || name === "quantity") {
                calculateTotalOutstanding(updatedValues);
            }
    
            return updatedValues;
        });
    };

    const validateEditInvoiceForm = () => {
        const result = updateInvoiceSchema.safeParse(currentValues);
        if(result.error) {
            const errorMessages = result.error.flatten().fieldErrors;
            setErrors({
                description: errorMessages.description?.[0],
                rate: errorMessages.rate?.[0],
                quantity: errorMessages.quantity?.[0],
                dueDate: errorMessages.dueDate?.[0],
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
        totalOutstanding,
        handleChange,
        validateEditInvoiceForm
    }
}

export default useEditInvoiceForm;