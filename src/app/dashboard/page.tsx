"use client";
import Container from "@/components/ui/Container";
import { useUser } from "@/context/UserProvider";
import { Box, Button, Tab } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { TabContext, TabList } from "@mui/lab";
import { Suspense, useState } from "react";
import InvoiceTable from "@/components/dashboard/InvoiceTable";
import {
  draftedInvoiceDetailsAtom,
  invoiceDetailsAtom,
  savedInvoiceDetailsAtom,
} from "@/store";
import { useAtom } from "jotai";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import PdfReactPdf from "@/components/createInvoice/components/PDFViewer";
import ModalWrapper from "@/components/ui/ModalWrapper";

const Dashboard = () => {
  const searchParams = useSearchParams();
  const tab = searchParams.get("currentTab");
  const router = useRouter();
  const { user } = useUser();
  const [activeTab, setActiveTab] = useState(tab || "saved");
  const [pdfURL, setPdfUrl] = useState("");
  const [globalInvoiceDetails, setGlobalInvoiceDetails] =
    useAtom(invoiceDetailsAtom);
  const [savedInvoices, setSavedInvoices] = useAtom(savedInvoiceDetailsAtom);
  const [draftedInvoices, setDraftInvoices] = useAtom(
    draftedInvoiceDetailsAtom
  );
  const onPopulate = (id: string) => {
    const currentInvoice = draftedInvoices.find((invoice) => invoice.id === id);
    if (currentInvoice) {
      setGlobalInvoiceDetails(currentInvoice);
      router.push("/dashboard/create-invoice?currentTab=vendor");
      setDraftInvoices(draftedInvoices.filter((invoice) => invoice.id !== id));
    }
  };
  const onViewPDF = (id: string) => {
    const currentInvoice = savedInvoices.find((invoice) => invoice.id === id);
    if (currentInvoice) {
      const pdfUrl = currentInvoice.pdfFile;
      setPdfUrl(pdfUrl);
    }
  };
  return (
    <Container className="!pt-8 !space-y-4">
      <h1 className="text-3xl text-center">
        Welcome, {user?.name || "Guest"}!
      </h1>
      <div className="flex justify-center">
        <Link href="/dashboard/create-invoice?currentTab=vendor">
          <Button variant="outlined" endIcon={<ArrowForwardIcon />}>
            Create Invoice
          </Button>
        </Link>
      </div>
      <div>
        <TabContext value={activeTab}>
          <Box>
            <TabList
              onChange={(_, value) => {
                const newUrl = new URL(window.location.href);
                newUrl.searchParams.set("currentTab", value);
                router.push(newUrl.toString());
                setActiveTab(value);
              }}
              aria-label="lab API tabs example"
              textColor="primary"
              indicatorColor="primary"
              className="overflow-x-scroll"
            >
              <Tab
                label="Saved Invoices"
                className="!font-bold"
                value="saved"
              />
              <Tab
                label="Drafted Invoices"
                className="!font-bold"
                value="drafted"
              />
            </TabList>
          </Box>
        </TabContext>
        <div>
          <InvoiceTable
            rows={activeTab === "saved" ? savedInvoices : draftedInvoices}
            context={activeTab}
            onPopulate={onPopulate}
            onViewPDF={onViewPDF}
          />
        </div>
        {pdfURL && (
          <ModalWrapper
            open={pdfURL !== ""}
            onClose={() => setPdfUrl('')}
            title="Invoice Preview"
          >
            <PdfReactPdf src={pdfURL} />
          </ModalWrapper>
        )}
      </div>
    </Container>
  );
};

export default function DashboardPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Dashboard />
    </Suspense>
  );
}
