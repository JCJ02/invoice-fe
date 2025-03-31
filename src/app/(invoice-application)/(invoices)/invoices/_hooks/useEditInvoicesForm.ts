import { updateInvoicesArraySchema } from "@/utils/validations/InvoicesSchema";
import React, { useState } from "react";

type InvoiceWithTotals = {
    id?: number;
    description: string;
    rate: number;
    quantity: number;
    dueDate: Date;
    notes?: string | null;
    terms?: string | null;
    isRecurring?: boolean;
    lineTotal?: number;
    totalOutstanding?: number;
};

type InvoiceFieldErrors = {
    description?: string;
    rate?: string;
    quantity?: string;
    dueDate?: string;
    notes?: string;
    terms?: string;
    isRecurring?: string;
};

const useEditInvoicesForm = () => {
    const defaultValues: InvoiceWithTotals = {
        description: "",
        rate: 0.00,
        quantity: 1.00,
        dueDate: new Date(),
        notes: "",
        terms: "",
        isRecurring: false
    };

    const [currentValues, setCurrentValues] = useState<InvoiceWithTotals[]>([defaultValues]);
    const [errors, setErrors] = useState<InvoiceFieldErrors[]>([]);
    const [totalOutstanding, setTotalOutstanding] = useState<number>(0.00);

    const decimalFormat = (value: number) => {
        return Math.round(value * 100) / 100;
    };

    const calculateTotalOutstanding = (invoices: InvoiceWithTotals[]) => {
        const total = invoices.reduce((acc, invoice) => {
            const lineTotal = invoice.rate * invoice.quantity;
            return acc + (isNaN(lineTotal) ? 0 : lineTotal);
        }, 0);
        setTotalOutstanding(decimalFormat(total));
    };

    const handleChange = (index: number) => (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const { name, value, type } = e.target;
        
        setCurrentValues(previous => {
            const updated = [...previous];
            updated[index] = {
                ...updated[index],
                [name]: type === "number" ? decimalFormat(Number(value)) : 
                       name === "dueDate" ? new Date(value) : 
                       value
            };

            if (name === "rate" || name === "quantity") {
                updated[index].lineTotal = decimalFormat(
                    updated[index].rate * updated[index].quantity
                );
            }

            calculateTotalOutstanding(updated);
            return updated;
        });
    };

    const handleTextareaChange = (index: number) => (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        
        setCurrentValues(prev => {
            const updated = [...prev];
            updated[index] = {
                ...updated[index],
                [name]: value
            };
            return updated;
        });
    };

    const handleCheckboxChange = (index: number, checked: boolean) => {
        setCurrentValues(previous => {
            const updated = [...previous];
            updated[index].isRecurring = checked;
            return updated;
        });
    };

    const validateEditInvoicesForm = () => {
        const result = updateInvoicesArraySchema.safeParse({
            invoices: currentValues
        });

        if (!result.success) {
            const fieldErrors = result.error.flatten().fieldErrors;
            const newErrors: InvoiceFieldErrors[] = [];
            
            currentValues.forEach((_, i) => {
                const errorObj: InvoiceFieldErrors = {};
                const fields: (keyof InvoiceFieldErrors)[] = [
                    'description', 'rate', 'quantity', 'dueDate', 
                    'notes', 'terms', 'isRecurring'
                ];

                fields.forEach(field => {
                    const errorKey = `invoices.${i}.${field}` as any;
                    if (fieldErrors[errorKey]) {
                        errorObj[field] = fieldErrors[errorKey]?.[0] || "";
                    }
                });

                newErrors.push(errorObj);
            });
            
            setErrors(newErrors);
            return false;
        }

        setErrors([]);
        return true;
    };

    return {
        currentValues,
        setCurrentValues,
        totalOutstanding,
        errors,
        handleChange,
        handleTextareaChange,
        handleCheckboxChange,
        validateEditInvoicesForm,
    };
};

export default useEditInvoicesForm;