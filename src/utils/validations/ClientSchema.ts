import { z } from "zod";

const newClientSchema = z.object({
    firstname: z.string().min(1, "Firstname Is Required!")
        .max(255, "Firstname Must Not Exceed To 255 Characters"),
    lastname: z.string().min(1, "Lastname Is Required!")
        .max(255, "Lastname Must Not Exceed To 255 Characters"),
    email: z.string().refine(value => value === "" || /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value), {
        message: "Must Be A Valid E-mail!",
      }).optional().nullable(),
    companyName: z.string().min(1, "Company Name Is Required!")
        .max(255, "Company Name Must Not Exceed To 255 Characters"),
    phoneNumber: z.string().optional().nullable(),
    businessPhone: z.string().optional().nullable(),
    mobilePhone: z.string().optional().nullable(),
    address: z.string().optional().nullable()
});

export type NewClient = z.infer<typeof newClientSchema>;

const updateClientSchema = z.object({
    id: z.number({required_error: "Undefined"}),
    firstname: z.string().min(1, "Firstname Is Required!")
        .max(255, "Firstname Must Not Exceed To 255 Characters"),
    lastname: z.string().min(1, "Lastname Is Required!")
        .max(255, "Lastname Must Not Exceed To 255 Characters"),
    email: z.string().refine(value => value === "" || /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value), {
        message: "Must Be A Valid E-mail!",
      }).optional().nullable(),
    companyName: z.string().min(1, "Company Name Is Required!")
        .max(255, "Company Name Must Not Exceed To 255 Characters"),
    phoneNumber: z.string().optional().nullable(),
    businessPhone: z.string().optional().nullable(),
    mobilePhone: z.string().optional().nullable(),
    address: z.string().optional().nullable()
});

export type UpdateClient = z.infer<typeof updateClientSchema>;

export {
    newClientSchema,
    updateClientSchema
}