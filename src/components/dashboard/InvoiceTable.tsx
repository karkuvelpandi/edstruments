"use client";
import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { InvoiceDetailsAtom } from "@/store";
import { formatAmount } from "@/store/utils";
import { CircularProgress } from "@mui/material";

export default function InvoiceTable({
  rows,
  context,
  onPopulate,
  onViewPDF,
}: {
  rows: InvoiceDetailsAtom[];
  context: string;
  onPopulate: (id: string) => void;
  onViewPDF: (id: string) => void;
}) {
  const [isPopulating, setIsPopulating] = React.useState(false);

  return (
    <TableContainer
      component={Paper}
      sx={{
        maxHeight: 600,
      }}
    >
      <Table
        sx={{ minWidth: 650 }}
        stickyHeader
        size="small"
        aria-label="simple table"
      >
        <TableHead>
          <TableRow className="!bg-gray-200">
            <TableCell className="!bg-gray-200">Vendor</TableCell>
            <TableCell className="!bg-gray-200">Invoice Date</TableCell>
            <TableCell className="!bg-gray-200">PO Number</TableCell>
            <TableCell className="!bg-gray-200">Invoice Amount</TableCell>
            <TableCell className="!bg-gray-200">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5} align="center">
                No data available
              </TableCell>
            </TableRow>
          ) : (
            rows.length > 0 &&
            rows?.map((row: InvoiceDetailsAtom, index) => (
              <TableRow
                key={row.vendor + `-${index}`}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.vendor}
                </TableCell>
                <TableCell component="th" scope="row">
                  {row.invoiceDetails.invoiceDate}
                </TableCell>
                <TableCell>{row.invoiceDetails.poNumber}</TableCell>
                <TableCell>
                  {formatAmount(Number(row.invoiceDetails.totalInvoiceAmount))}
                </TableCell>
                {context === "drafted" && (
                  <TableCell>
                    <button
                      onClick={() => {
                        onPopulate(row.id);
                        setIsPopulating(true);
                      }}
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold !py-2 !px-4 rounded cursor-pointer disabled:cursor-auto disabled:opacity-40 disabled:hover:bg-blue-500"
                    >
                      Populate {isPopulating && <CircularProgress size={20} />}
                    </button>
                  </TableCell>
                )}
                {context === "saved" && (
                  <TableCell>
                    <button
                      disabled={!row.pdfFile}
                      onClick={() => onViewPDF(row.id)}
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold !py-2 !px-4 rounded cursor-pointer disabled:cursor-auto disabled:opacity-40 disabled:hover:bg-blue-500"
                    >
                      View PDF
                    </button>
                  </TableCell>
                )}
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
