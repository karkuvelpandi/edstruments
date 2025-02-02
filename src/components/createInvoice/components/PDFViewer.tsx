import React, { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import 'react-pdf/dist/Page/TextLayer.css';
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

 const PDFViewerComponent = ({ pdfUrl }: { pdfUrl: string }) => {
  const [numPages, setNumPages] = useState(0);
  const [pageNumber, setPageNumber] = useState(1);

  const onDocumentLoadSuccess = ({ numPages }: any) => {
    setNumPages(numPages);
  };

  const goToPrevPage = () => {
    setPageNumber(pageNumber - 1 <= 1 ? 1 : pageNumber - 1);
  };

  const goToNextPage = () => {
    setPageNumber(
      pageNumber + 1 >= (numPages || 0) ? numPages : pageNumber + 1
    );
  };


  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="mb-4 flex justify-center gap-4">
        <button
          onClick={goToPrevPage}
          disabled={pageNumber <= 1}
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300"
        >
          Previous
        </button>
        <p className="text-center">
          Page {pageNumber} of {numPages}
        </p>
        <button
          onClick={goToNextPage}
          disabled={pageNumber >= (numPages || 0)}
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300"
        >
          Next
        </button>
      </div>

      <div className="flex justify-center">
        <Document
          file={pdfUrl}
          onLoadSuccess={onDocumentLoadSuccess}
          error="Failed to load PDF"
          loading="Loading PDF..."
        >
          <Page
            pageNumber={pageNumber}
            renderTextLayer={false}
            renderAnnotationLayer={false}
            className="border shadow-lg"
          />
        </Document>
      </div>
    </div>
  );
};

export default PDFViewerComponent;