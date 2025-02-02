"use client";
import Container from "@/components/ui/Container";
import { useUser } from "@/context/UserProvider";
import { Box, Button, Tab } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { TabContext, TabList } from "@mui/lab";
import { useState } from "react";
import InvoiceTable from "@/components/dashboard/InvoiceTable";
import {
  draftedInvoiceDetailsAtom,
  invoiceDetailsAtom,
  savedInvoiceDetailsAtom,
} from "@/store";
import { useAtom } from "jotai";
import { useRouter, useSearchParams } from "next/navigation";

const Dashboard = () => {
    const searchParams = useSearchParams();
    const tab = searchParams.get("currentTab");
    const router = useRouter();
  const { user } = useUser();
  const [activeTab, setActiveTab] = useState(tab || "saved");
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
      setDraftInvoices(draftedInvoices.filter((invoice) => invoice.id !== id));
      router.push("/dashboard/create-invoice?currentTab=vendor");
    }
  };
  return (
    <Container className="!pt-4 !space-y-4">
      <h1 className="text-3xl text-center">
        Welcome, {user?.name || "Guest"}!
      </h1>
      <div className="flex justify-center">
        <Button
          variant="outlined"
          color="primary"
          href="/dashboard/create-invoice"
        >
          Create Invoice
          <ArrowForwardIcon className="!ml-2" />
        </Button>
      </div>
      <div>
        <TabContext value={activeTab}>
          <Box>
            <TabList
              onChange={(_, value) => {
                console.log(value);
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
          />
        </div>
      </div>
    </Container>
  );
};

export default Dashboard;
