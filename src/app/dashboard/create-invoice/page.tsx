"use client";
import React, { useCallback, useState } from "react";
import { KeyboardBackspace, Upload } from "@mui/icons-material";
import { Box, Button, Tab } from "@mui/material";
import { useDropzone } from "react-dropzone";
import { TabContext, TabList } from "@mui/lab";
import Link from "next/link";
import Image from "next/image";
import VerticalAlignTopIcon from '@mui/icons-material/VerticalAlignTop';
import FormikTextField from "@/components/auth/components/FormikTextField";
import VendorDetailsForm from "@/components/createInvoice/VendorDetailsForm";
import InvoiceDetailsForm from "@/components/createInvoice/InvoiceDetailsForm";
import CommentsForm from "@/components/createInvoice/CommentsForm";

const CreateInvoicePage = () => {
  const [activeStep, setActiveStep] = useState("vendor");
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const onDrop = useCallback((acceptedFiles: File[]) => {
    setUploadedFile(acceptedFiles[0]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "application/pdf": [".pdf"],
    },
  });
  return (
    <div className="flex flex-col">
      <header className="flex justify-start sm:justify-between items-center flex-col sm:flex-row">
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
          <TabContext value={activeStep}>
            <Box>
              <TabList
                onChange={(_, value) => {
                  console.log(value);
                  setActiveStep(value);
                }}
                aria-label="lab API tabs example"
                textColor="primary"
                indicatorColor="primary"
                className="overflow-x-scroll"
              >
                <Tab label="Vendor Details" className="!font-bold" value="vendor" />
                <Tab label="Invoice Details" className="!font-bold" value="invoice" />
                <Tab label="Comments" className="!font-bold" value="comments" />
              </TabList>
            </Box>
          </TabContext>
        </div>
      </header>
      <div className="flex flex-grow flex-1 bg-gray-100 flex-col sm:flex-row">
        {/* Left side - Upload area */}
        <div className="w-auto h-auto sm:min-h-[85vh] sm:w-1/2 !p-4">
          <div
            {...getRootProps()}
            className={`sm:h-full flex flex-col cursor-pointer items-center justify-center p-8 transition-colors border-2 border-gray-300 border-dashed rounded-sm
            ${isDragActive ? "bg-primary/10" : "bg-white hover:bg-gray-100"}`}
          >
            <input {...getInputProps()} />
            {uploadedFile ? (
              <div className="text-center">
                {/* <FileText className="w-8 h-8 text-primary mx-auto mb-2" /> */}
                <p className="text-sm text-gray-600">{uploadedFile.name}</p>
              </div>
            ) : (
              <div className="text-center !py-5">
                <p className="text-lg font-semibold mb-2">
                  Upload your invoice
                </p>
                <p className="text-sm text-gray-500">
                  To auto populate fields and save time
                </p>
                <div className="hidden sm:flex justify-center !py-8">
                <Image src="/docUpload.png" width={250} height={250} alt="upload" />
                </div>
                <div className="!my-2">
                  <Button
                    variant="outlined" 
                    sx={{ textTransform: 'none' }}
                    className="!bg-white !text-gray-400 !border-gray-400"
                    endIcon={<VerticalAlignTopIcon />}
                  >
                    Upload File
                  </Button>
                </div>
                <p className="text-xs font-semibold text-gray-400 mt-2">
                  <span className="text-blue-600">Click to upload</span> or Drag and drop
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Right side - Forms */}
        <div className="w-auto sm:w-1/2">
        
        </div>
      </div>
    </div>
  );
};

export default CreateInvoicePage;
