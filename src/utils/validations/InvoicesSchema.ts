import { z } from "zod";

const newInvoicesSchema = z.object({
    description: z.string().min(1, "Description Is Required!").max(255, "Description Must Not Exceed 255 Characters!"),
    rate: z.number().min(1, "Rate Is Required!"),
    quantity: z.number().min(1, "Quantity Is Required!"),
    dueDate: z.date()
});

export type NewInvoices = z.infer<typeof newInvoicesSchema>;

export {
    newInvoicesSchema
}