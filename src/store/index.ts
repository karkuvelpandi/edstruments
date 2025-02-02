import { atom } from 'jotai'
import { atomWithStorage } from 'jotai/utils';

export interface InvoiceDetailsAtom {
    id: string;
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


// function createLocalStorageAtom<T>(key: string, initialValue: T[]) {
//   const baseAtom = atom(
//     typeof window !== "undefined" && localStorage.getItem(key)
//       ? JSON.parse(localStorage.getItem(key) as string)
//       : initialValue
//   );

//   const arrayAtom = atom(
//     (get) => get(baseAtom),
//     (get, set, newValue) => {
//       set(baseAtom, newValue);
//       if (typeof window !== "undefined") {
//         localStorage.setItem(key, JSON.stringify(newValue));
//       }
//     }
//   );

//   return arrayAtom;
// }
export const invoiceDetailsInitialState = {
    id: "",
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


// export const savedInvoiceDetailsAtom = createLocalStorageAtom("invoice details", []);
export const savedInvoiceDetailsAtom = atomWithStorage('SavedInvoiceDetailsKey', [] as InvoiceDetailsAtom[]);
export const draftedInvoiceDetailsAtom = atomWithStorage('DraftedInvoiceDetailsKey', [] as InvoiceDetailsAtom[]);