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
    notes?: string,
    terms?: string,
    isDraft?: boolean,
    isRecurring?: boolean,
    createdAt: Date;
    updatedAt: Date;
    deletedAt?: Date
};