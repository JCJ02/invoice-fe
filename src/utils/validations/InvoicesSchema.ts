import { z } from "zod";

const invoicesSchema = z.object({
    description: z.string({
        required_error: "Description is Required!"
    })
    .min(3, "Description Must Be At Least 3 Characters Long!")
    .max(255, "Description Must Not Exceed 255 Characters Long!"),
    
    rate: z.preprocess(
        (value) => (value === null ? undefined : Number(value)),
        z.number({
            required_error: "Rate is Required!"
        }).refine((value) => {
            return Math.round(value * 100) === value * 100;
        }, { message: "Rate Must Be DECIMAL and Have No More Than 2 Decimal Places!" })
    ),

    quantity: z.preprocess(
        (value) => (value === null ? undefined : Number(value)), 
        z.number({
            required_error: "Quantity is Required!"
        })
    ),

    dueDate: z.coerce.date({
        required_error: "Due Date is required!"
    }),

    notes: z.string().optional().nullable(),
    terms: z.string().optional().nullable(),
    isRecurring: z.boolean().optional().nullable()
});

const updateInvoicesSchema = z.object({
    id: z.number().int().positive(),
    description: z.string({
        required_error: "Description is Required!"
    })
    .min(3, "Description Must Be At Least 3 Characters Long!")
    .max(255, "Description Must Not Exceed 255 Characters Long!"),
    
    rate: z.preprocess(
        (value) => (value === null ? undefined : Number(value)),
        z.number({
            required_error: "Rate is Required!"
        }).refine((value) => {
            return Math.round(value * 100) === value * 100;
        }, { message: "Rate Must Be DECIMAL and Have No More Than 2 Decimal Places!" })
    ),

    quantity: z.preprocess(
        (val) => (val === null ? undefined : Number(val)), 
        z.number({
            required_error: "Quantity is Required!"
        })
    ),

    dueDate: z.coerce.date({
        required_error: "Due Date is required!"
    }),

    notes: z.string().optional().nullable(),
    terms: z.string().optional().nullable(),
    isRecurring: z.boolean().optional().nullable()
});

const updateInvoicesArraySchema = z.array(updateInvoicesSchema);

const updateInvoiceSchema = z.object({
    description: z.string()
    .min(3, "Description Must Be At Least 3 Characters Long!")
    .max(255, "Description Must Not Exceed 255 Characters Long!"),
    
    rate: z.preprocess(
        (value) => (value === null ? undefined : Number(value)), 
        z.number({
            required_error: "Rate is required!"
        }).refine((value) => {
            return Math.round(value * 100) === value * 100;
        }, { message: "Rate Must Be DECIMAL and Have No More Than 2 Decimal Places!" })
    ),

    quantity: z.preprocess(
        (value) => (value === null ? undefined : Number(value)), 
        z.number({
            required_error: "Quantity is required!"
        })
    ),

    dueDate: z.coerce.date({
        required_error: "Due Date is required!"
    }),

    notes: z.string().optional().nullable(),
    terms: z.string().optional().nullable(),
    isRecurring: z.boolean().optional().nullable()
});

const createManyInvoices = z.array(invoicesSchema);

export type NewInvoices = z.infer<typeof createManyInvoices>;
export type EditInvoice = z.infer<typeof updateInvoiceSchema>;
export type UpdateInvoices = z.infer<typeof updateInvoicesSchema>;

export {
    invoicesSchema,
    createManyInvoices,
    updateInvoiceSchema,
    updateInvoicesArraySchema,
    updateInvoicesSchema
};
