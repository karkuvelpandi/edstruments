"use client";
import { Box, Button, IconButton } from "@mui/material";
import React, { ReactNode } from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useAtom } from "jotai";
import { draftedInvoiceDetailsAtom, invoiceDetailsAtom, invoiceDetailsInitialState, savedInvoiceDetailsAtom } from "@/store";
import { generateUniqueId } from "@/store/utils";
import { useRouter } from "next/navigation";

const SubmitButton = ({ backButton, onNavigate }: { backButton: ReactNode, onNavigate: (step: string) => void }) => {
  const router = useRouter();
  const [globalInvoiceDetails, setGlobalInvoiceDetails] =
  useAtom(invoiceDetailsAtom);
  const [savedInvoices, setSavedInvoices] = useAtom(savedInvoiceDetailsAtom);
  const [draftedInvoices, setDraftInvoices] = useAtom(draftedInvoiceDetailsAtom);

     
 const onSave = () => {
  console.log(globalInvoiceDetails, "Submitting");
  setSavedInvoices([...savedInvoices,{ ...globalInvoiceDetails, id:generateUniqueId()}]);
  setGlobalInvoiceDetails(invoiceDetailsInitialState)
  router.push("/dashboard?currentTab=saved");
 };

 const onDraft = () => {
  console.log(globalInvoiceDetails, "Submitting");
  setDraftInvoices([...draftedInvoices,{ ...globalInvoiceDetails, id:generateUniqueId()}]);
  setGlobalInvoiceDetails(invoiceDetailsInitialState)
   router.push("/dashboard?currentTab=drafted");
 };

 
  return (
    <Box p={2} gap={2} className="flex justify-around bg-white !mt-2">
      <IconButton>
        <MoreVertIcon />
      </IconButton>
      {backButton}
      <Button
        type="button"
        variant="outlined"
        className="flex-1"
        sx={{ textTransform: "none" }}
        onClick={onDraft}
      >
        Save as Draft
      </Button>
      <Button
        type="button"
        variant="contained"
        color="primary"
        className="flex-1"
        sx={{ textTransform: "none" }}
        onClick={onSave}
      >
        Submit & New
      </Button>
    </Box>
  );
};

export default SubmitButton;
