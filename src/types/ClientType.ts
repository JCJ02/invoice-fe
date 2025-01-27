import { InvoiceType } from "./InvoiceType";

export type ClientType = {
    id: number;
    firstname: string;
    lastname: string;
    email: string;
    companyName: string;
    phoneNumber: string;
    businessPhone: string;
    mobilePhone: string;
    address: string;
    createdAt: Date;
    updatedAt: Date;
    deleteAt: Date;
    invoices?: InvoiceType[]
};
  
export type ClientResponse = {
    data: {
        clients: ClientType[];
        totalClients?: number;
    };
    message?: string;
    code?: number;
};