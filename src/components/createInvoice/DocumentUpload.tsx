"use client";
import React, { useCallback, useState } from "react";
import { Box, Button, Tab } from "@mui/material";
import { useDropzone } from "react-dropzone";
import Image from "next/image";
import VerticalAlignTopIcon from "@mui/icons-material/VerticalAlignTop";
import { useAtom } from "jotai";
import {
  draftedInvoiceDetailsAtom,
  invoiceDetailsAtom,
  savedInvoiceDetailsAtom,
} from "@/store";
import ModalWrapper from "../ui/ModalWrapper";
import { Document, Page } from "react-pdf";
import PDFViewerComponent from "./components/PDFViewer";

const DocumentUpload = () => {
  const [globalInvoiceDetails, setGlobalInvoiceDetails] =
    useAtom(invoiceDetailsAtom);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [pdfUrl, setPdfUrl] = useState<string >('');
  const [showPdf, setShowPdf] = useState(false);
  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file && file.type === "application/pdf") {
      setUploadedFile(file);

      // Convert file to base64 using FileReader
      const reader = new FileReader();
      reader.onloadend = () => {
        setGlobalInvoiceDetails((prev) => ({
          ...prev,
          pdfFile: reader.result as string,
        }));
        localStorage.setItem("pdfFile", reader.result as string);
        setPdfUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      alert("Please upload a valid PDF file.");
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "application/pdf": [".pdf"],
    },
  });
  return (
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
            <Button onClick={() => setShowPdf(true)}>View PDF</Button>
            {showPdf && (
              <ModalWrapper
                open={showPdf}
                onClose={() => setShowPdf(false)}
                title="Invoice Preview"
              >
               <PDFViewerComponent pdfUrl={pdfUrl}/>
              </ModalWrapper>
            )}
          </div>
        ) : (
          <div className="text-center !py-5">
            <p className="text-lg font-semibold mb-2">Upload your invoice</p>
            <p className="text-sm text-gray-500">
              To auto populate fields and save time
            </p>
            <div className="hidden sm:flex justify-center !py-8">
              <Image
                src="/docUpload.png"
                width={250}
                height={250}
                alt="upload"
              />
            </div>
            <div className="!my-2">
              <Button
                variant="outlined"
                sx={{ textTransform: "none" }}
                className="!bg-white !text-gray-400 !border-gray-400"
                endIcon={<VerticalAlignTopIcon />}
              >
                Upload File
              </Button>
            </div>
            <p className="text-xs font-semibold text-gray-400 mt-2">
              <span className="text-blue-600">Click to upload</span> or Drag and
              drop
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DocumentUpload;
