import { z } from "zod";

const invoicesSchema = z.object({
    description: z.string().min(3, "Description Must Be At Least 3 Characters Long!")
        .max(255, "Description Must Not Exceed 255 Characters!"),
    rate: z.number().refine((value) => Math.round(value * 100) === value * 100, { message: "Rate Must Be DECIMAL and Have No More Than 2 Decimal Places!" }),
    quantity: z.number().refine((value) => Math.round(value * 100) === value * 100, { message: "Quantity Must Be DECIMAL and Have No More Than 2 Decimal Places!" }),
    dueDate: z.coerce.date(),
});

const createManyInvoices = z.array(invoicesSchema);

export type NewInvoices = z.infer<typeof createManyInvoices>;

export {
    invoicesSchema,
    createManyInvoices
};
