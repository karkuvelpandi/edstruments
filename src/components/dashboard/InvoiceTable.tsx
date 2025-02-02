"use client";
import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TableFooter from "@mui/material/TableFooter";
import { InvoiceDetailsAtom } from "@/store";
import { formatAmount } from "@/store/utils";

export default function InvoiceTable({
  rows,
  context,
}: {
  rows: InvoiceDetailsAtom[];
  context: string;
}) {
  console.log(rows);
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow className="bg-gray-200">
            <TableCell>Vendor</TableCell>
            <TableCell>Invoice Date</TableCell>
            <TableCell>PO Number</TableCell>
            <TableCell>Invoice Amount</TableCell>
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
            rows?.map((row: InvoiceDetailsAtom) => (
              <TableRow
                key={row.vendor}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                 <TableCell component="th" scope="row">
                  {row.vendor}
                </TableCell>
                <TableCell component="th" scope="row">
                  {row.invoiceDetails.invoiceDate}
                </TableCell>
                <TableCell>
                  {row.invoiceDetails.poNumber}
                </TableCell>
                <TableCell>
                  {formatAmount(Number(row.invoiceDetails.totalInvoiceAmount))}
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
