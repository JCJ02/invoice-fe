import { createManyInvoices, NewInvoices } from "@/utils/validations/InvoicesSchema";
import React, { useState } from "react";

type NewInvoicesWithTotal = NewInvoices[number] & {
    lineTotal?: number;
    totalOutstanding?: number;
};

type NewInvoicesErrors = {
    description?: string,
    rate?: string,
    quantity?: string,
    dueDate?: string,
    notes?: string,
    terms?: string
}

const useNewInvoicesForm = () => {
    const defaultValues: NewInvoicesWithTotal  = {
        description: "",
        rate: 0.00,
        quantity: 1.00,
        dueDate: new Date(),
        notes: "",
        terms: ""
    }
    const [invoicesValue, setInvoicesValue] = useState<NewInvoicesWithTotal[]>([defaultValues]);
    const [errors, setErrors] = useState<NewInvoicesErrors[]>([]);
    const [totalOutstanding, setTotalOutstanding] = useState<number>(0.00);

    const decimalFormat = (value: number) => {
        return Math.round(value * 100) / 100; 
    };

    const calculateTotalOutstanding = (invoices: NewInvoicesWithTotal[]) => {
        const total = invoices.reduce((accumulator, invoice) => accumulator + (invoice.lineTotal || 0), 0);
        setTotalOutstanding(decimalFormat(total));
    };

    const handleChange = (index: number) => ({ target }: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type } = target;
        setInvoicesValue((input) => {
            const invoices = [...input];
            invoices[index] = {
                ...invoices[index],
                [name]:
                    type === "number"
                        ? decimalFormat(Number(value))
                        : name === "dueDate"
                        ? new Date(value)
                        : value
            };

            if (name === "rate" || name === "quantity") {
                invoices[index].lineTotal = decimalFormat(invoices[index].rate * invoices[index].quantity);
            }
            calculateTotalOutstanding(invoices);
            return invoices;
        });
    };

    const validateNewInvoicesForm = () => {

        const result = createManyInvoices.safeParse(invoicesValue);

        if (result.error) {
            const flattenedErrors = result.error.flatten().fieldErrors as Record<string, string[]>;

            const invoicesErrors: NewInvoicesErrors[] = invoicesValue.map((_, index) => ({
                description: flattenedErrors.description?.[index] || "",
                rate: flattenedErrors.rate?.[index] || "",
                quantity: flattenedErrors.quantity?.[index] || "",
                dueDate: flattenedErrors.dueDate?.[index] || "",
            }));            

            setErrors(invoicesErrors);
            return false;
        }

        setErrors([]);
        return true;
        
    }

    const handleAddInvoiceLine = (event: React.FocusEvent) => {
        event.preventDefault();
        setInvoicesValue((previousInvoices) => {
            const invoices = [...previousInvoices, { ...defaultValues }];
            calculateTotalOutstanding(invoices);
            return invoices;
        });
    };

    return {
        invoicesValue,
        setInvoicesValue,
        totalOutstanding,
        errors,
        handleChange,
        validateNewInvoicesForm,
        handleAddInvoiceLine
    }
}

export default useNewInvoicesForm;