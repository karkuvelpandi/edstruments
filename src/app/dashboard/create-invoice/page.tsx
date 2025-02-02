"use client";
import React, { Suspense, useState } from "react";
import { KeyboardBackspace } from "@mui/icons-material";
import { Box, Tab } from "@mui/material";
import { TabContext, TabList } from "@mui/lab";
import Link from "next/link";
import VendorDetailsForm from "@/components/createInvoice/VendorDetailsForm";
import InvoiceDetailsForm from "@/components/createInvoice/InvoiceDetailsForm";
import CommentsForm from "@/components/createInvoice/CommentsForm";
import { useAtom } from "jotai";
import { invoiceDetailsAtom } from "@/store";
import { useRouter, useSearchParams } from "next/navigation";
import DocumentUpload from "@/components/createInvoice/DocumentUpload";


const CreateInvoice = () => {
  const searchParams = useSearchParams();
  const tab = searchParams.get("currentTab");
  const router = useRouter();
  const [globalInvoiceDetails, setGlobalInvoiceDetails] =
    useAtom(invoiceDetailsAtom);
  const [activeTab, setActiveTab] = useState(tab || "vendor");
 
  const navigateTab = (tab: string) => {
    const newUrl = new URL(window.location.href);
    newUrl.searchParams.set("currentTab", tab);
    router.push(newUrl.toString());
    setActiveTab(tab);
  };
  return (
    <div className="flex flex-col !mt-2 ">
      <header className="flex justify-start sm:justify-between items-center flex-col sm:flex-row sm:sticky sm:top-16 sm:bg-white sm:z-10 !mt-2">
        <div className="w-auto sm:w-1/2">
          <Link
            href={"/dashboard"}
            className="text-base font-bold mb-4 inline-flex items-center gap-1 !text-black"
          >
            <KeyboardBackspace />
            Create Invoice
          </Link>
        </div>
        <div className="w-auto sm:w-1/2 !mb-1">
          <TabContext value={activeTab}>
            <Box>
              <TabList
                aria-label="lab API tabs example"
                textColor="primary"
                indicatorColor="primary"
                className="overflow-x-scroll"
              >
                <Tab
                  label="Vendor Details"
                  className="!font-bold"
                  value="vendor"
                  sx={{ textTransform: "none" }}
                />
                <Tab
                  label="Invoice Details"
                  className="!font-bold"
                  value="invoice"
                  sx={{ textTransform: "none" }}
                />
                <Tab
                  label="Comments"
                  className="!font-bold"
                  value="comments"
                  sx={{ textTransform: "none" }}
                />
              </TabList>
            </Box>
          </TabContext>
        </div>
      </header>
      <div className="flex flex-grow flex-1 bg-gray-100 flex-col sm:flex-row">
        {/* Left side - Upload area */}
       <DocumentUpload />

        {/* Right side - Forms */}
        <div className="w-auto sm:w-1/2 !p-4">
          {activeTab === "vendor" && (
            <VendorDetailsForm
              onNavigate={(values: any, step: string) => {
                setGlobalInvoiceDetails((prev) => ({
                  ...prev,
                  vendor: values.vendor,
                }));
                navigateTab(step);
              }}
            />
          )}
          {activeTab === "invoice" && (
            <InvoiceDetailsForm
              onNavigate={(values: any, step: string) => {
                setGlobalInvoiceDetails((prev) => ({
                  ...prev,
                  invoiceDetails: {
                    ...prev.invoiceDetails,
                    ...values,
                  },
                }));

                navigateTab(step);
              }}
            />
          )}
          {activeTab === "comments" && (
            <CommentsForm
              onNavigate={(step: string) => {
                navigateTab(step);
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
};


export default function CreateInvoicePage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CreateInvoice />
    </Suspense>
  );
}