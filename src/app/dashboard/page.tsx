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

const Dashboard = () => {
  const { user } = useUser();
  const [activeTab, setActiveTab] = useState("saved");
  const [savedInvoices, setSavedInvoices] = useAtom(savedInvoiceDetailsAtom);
  const [draftedInvoices, setDraftInvoices] = useAtom(
    draftedInvoiceDetailsAtom
  );
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
                // navigateTab(value);
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
          />
        </div>
      </div>
    </Container>
  );
};

export default Dashboard;
