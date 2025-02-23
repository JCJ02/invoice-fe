import { EditInvoice, updateInvoiceSchema } from "@/utils/validations/InvoicesSchema";
import { useEffect, useState } from "react";

type EditInvoiceWithTotal = EditInvoice & {
    lineTotal?: number;
    totalOutstanding?: number;
};

type EditInvoiceErrors = {
    description?: string,
    rate?: string,
    quantity?: string,
    dueDate?: string,
    notes?: string,
    terms?: string
}

const useEditInvoiceForm = () => {
    const selectedValues: EditInvoice = {
        description: "",
        rate: 0.00,
        quantity: 0.00,
        dueDate: new Date(),
        notes: "",
        terms: ""
    }
    const [currentValues, setCurrentValues] = useState<EditInvoice>(selectedValues);
    const [errors, setErrors] = useState<EditInvoiceErrors>({});
    const [totalOutstanding, setTotalOutstanding] = useState<number>(0.00);

    const decimalFormat = (value: number) => {
        return Math.round(value * 100) / 100;
    };

    const calculateTotalOutstanding = (invoice: EditInvoice) => {
        if (!invoice.rate || !invoice.quantity) return;

        const total = invoice.rate * invoice.quantity;
        setTotalOutstanding(decimalFormat(total));
    };

    const handleChange = ({ target }: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
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

            // Recalculate totalOutstanding when rate or quantity changes
            if (name === "rate" || name === "quantity") {
                calculateTotalOutstanding(updatedValues);
            }

            return updatedValues;
        });
    };

    const validateEditInvoiceForm = () => {
        const result = updateInvoiceSchema.safeParse(currentValues);
        if (result.error) {
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

    useEffect(() => {
        // RECALCULATE TOTALOUSTANDING WHENEVER RATE OR QUANTITY CHANGES
        calculateTotalOutstanding(currentValues);
    }, [currentValues.rate, currentValues.quantity]);

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