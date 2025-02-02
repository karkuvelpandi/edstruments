import { atom } from 'jotai'
import { atomWithStorage } from 'jotai/utils';

export interface InvoiceDetailsAtom {
    id: string;
    pdfFile: string;
    vendor: string;
    invoiceDetails: {
      poNumber: string;
      invoiceNumber: string;
      invoiceDate: string;
      totalInvoiceAmount: string;
      paymentTerm: string;
      invoiceDueDate: string;
      glPostDate: string;
      invoiceDescription: string;
    };
    comments: any[];
  }

export const invoiceDetailsInitialState = {
    id: "",
    pdfFile: "",
    vendor: "",
    invoiceDetails:{
        poNumber: "",
        invoiceNumber: "",
        invoiceDate: "",
        totalInvoiceAmount: "",
        paymentTerm: "",
        invoiceDueDate: "",
        glPostDate: "",
        invoiceDescription: "",
    },
    comments: []
}
export const invoiceDetailsAtom = atom(invoiceDetailsInitialState as InvoiceDetailsAtom)
export const savedInvoiceDetailsAtom = atomWithStorage('SavedInvoiceDetailsKey', [] as InvoiceDetailsAtom[]);
export const draftedInvoiceDetailsAtom = atomWithStorage('DraftedInvoiceDetailsKey', [] as InvoiceDetailsAtom[]);