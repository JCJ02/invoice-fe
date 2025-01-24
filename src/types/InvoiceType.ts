export type InvoiceType = {
    id: number;
    invoiceNumber: string;
    clientId: number,
    description: string;
    rate: number;
    quantity: number;
    lineTotal: number;
    issuedDate: string;
    dueDate: string;
    totalOutstanding: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt?: Date
};