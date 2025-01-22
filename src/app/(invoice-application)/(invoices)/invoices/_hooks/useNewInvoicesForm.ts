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
}

const useNewInvoicesForm = () => {
    const defaultValues: NewInvoicesWithTotal  = {
        description: "",
        rate: 0.00,
        quantity: 1.00,
        dueDate: new Date()
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

            const invoicesErrors: NewInvoicesErrors[] = invoicesValue.map((index) => ({
                description: flattenedErrors[`[${index}].description`]?.[0],
                rate: flattenedErrors[`[${index}].rate`]?.[0],
                quantity: flattenedErrors[`[${index}].quantity`]?.[0],
                dueDate: flattenedErrors[`[${index}].dueDate`]?.[0],
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


// import { createManyInvoices, NewInvoices } from "@/utils/validations/InvoicesSchema";
// import React, { useState } from "react";

// type NewInvoicesWithTotal = Omit<NewInvoices[number], "dueDate"> & {
//     dueDate: string; // Updated to string
//     lineTotal?: number;
// };

// type NewInvoicesErrors = {
//     description?: string;
//     rate?: string;
//     quantity?: string;
//     dueDate?: string;
// };

// const useNewInvoicesForm = () => {
//     const defaultValues: NewInvoicesWithTotal = {
//         description: "",
//         rate: 0.0,
//         quantity: 1.0,
//         dueDate: new Date().toISOString().split("T")[0], // Default as "YYYY-MM-DD" string
//     };

//     const [invoicesValue, setInvoicesValue] = useState<NewInvoicesWithTotal[]>([defaultValues]);
//     const [errors, setErrors] = useState<NewInvoicesErrors[]>([]);

//     const decimalFormat = (value: number) => {
//         return Math.round(value * 100) / 100;
//     };

//     const handleChange = (index: number) => ({ target }: React.ChangeEvent<HTMLInputElement>) => {
//         const { name, value, type } = target;

//         setInvoicesValue((input) => {
//             const invoices = [...input];
//             invoices[index] = {
//                 ...invoices[index],
//                 [name]:
//                     type === "number"
//                         ? decimalFormat(Number(value))
//                         : value, // Keep dueDate as a string
//             };

//             if (name === "rate" || name === "quantity") {
//                 invoices[index].lineTotal = decimalFormat(invoices[index].rate * invoices[index].quantity);
//             }
//             return invoices;
//         });
//     };

//     const validateNewInvoicesForm = () => {
//         const result = createManyInvoices.safeParse(
//             invoicesValue.map(({ lineTotal, ...invoice }) => invoice) // Exclude `lineTotal` for validation
//         );

//         if (result.error) {
//             const flattenedErrors = result.error.flatten().fieldErrors as Record<string, string[]>;

//             const invoicesErrors: NewInvoicesErrors[] = invoicesValue.map((_, index) => ({
//                 description: flattenedErrors[`[${index}].description`]?.[0],
//                 rate: flattenedErrors[`[${index}].rate`]?.[0],
//                 quantity: flattenedErrors[`[${index}].quantity`]?.[0],
//                 dueDate: flattenedErrors[`[${index}].dueDate`]?.[0],
//             }));

//             setErrors(invoicesErrors);
//             return false;
//         }

//         setErrors([]);
//         return true;
//     };

//     const handleAddInvoiceLine = (event: React.FocusEvent) => {
//         event.preventDefault();
//         setInvoicesValue((previousInvoices) => [
//             ...previousInvoices,
//             { ...defaultValues },
//         ]);
//     };

//     return {
//         invoicesValue,
//         setInvoicesValue,
//         errors,
//         handleChange,
//         validateNewInvoicesForm,
//         handleAddInvoiceLine,
//     };
// };

// export default useNewInvoicesForm;

