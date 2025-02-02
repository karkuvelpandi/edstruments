"use client";
import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { Button, Box, InputAdornment } from "@mui/material";
import FormikTextField from "../auth/components/FormikTextField";
import { TfiReceipt } from "react-icons/tfi";
import SectionHeader from "../ui/SectionHeader";
import FormikSelect from "../auth/components/FormikSelect";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import { useAtom } from "jotai";
import { invoiceDetailsAtom } from "@/store";
import TabsSegmentedControls from "../ui/JoyTabs";

const defaultPONumbers = [
  { value: "PO-1001", label: "PO-1001 - Office Supplies" },
  { value: "PO-1002", label: "PO-1002 - IT Equipment" },
  { value: "PO-1003", label: "PO-1003 - Marketing Expenses" },
  { value: "PO-1004", label: "PO-1004 - Consulting Services" },
  { value: "PO-1005", label: "PO-1005 - Software Subscription" },
  { value: "PO-1006", label: "PO-1006 - Facility Maintenance" },
  { value: "PO-1007", label: "PO-1007 - Travel Expenses" },
  { value: "PO-1008", label: "PO-1008 - Employee Training" },
  { value: "PO-1009", label: "PO-1009 - Security Services" },
  { value: "PO-1010", label: "PO-1010 - Office Furniture" },
];

const defaultInvoiceNumbers = [
  { value: "INV-1001", label: "INV-1001 - Office Supplies" },
  { value: "INV-1002", label: "INV-1002 - IT Equipment" },
  { value: "INV-1003", label: "INV-1003 - Marketing Expenses" },
  { value: "INV-1004", label: "INV-1004 - Consulting Services" },
  { value: "INV-1005", label: "INV-1005 - Software Subscription" },
  { value: "INV-1006", label: "INV-1006 - Facility Maintenance" },
  { value: "INV-1007", label: "INV-1007 - Travel Expenses" },
  { value: "INV-1008", label: "INV-1008 - Employee Training" },
  { value: "INV-1009", label: "INV-1009 - Security Services" },
  { value: "INV-1010", label: "INV-1010 - Office Furniture" },
];

const defaultPaymentTerms = [
  { value: "30D", label: "30 Days" },
  { value: "45D", label: "45 Days" },
  { value: "60D", label: "60 Days" },
];

const defaultDepartments = [
  { value: "ADMIN", label: "ADMIN - Administration" },
  { value: "ADMISSIONS", label: "ADMISSIONS - Student Admissions" },
  { value: "ACADEMICS", label: "ACADEMICS - Curriculum and Instruction" },
  { value: "STUDENT_AFFAIRS", label: "STUDENT_AFFAIRS - Student Affairs" },
  { value: "EXAMS", label: "EXAMS - Examinations & Assessment" },
  { value: "COUNSELING", label: "COUNSELING - Counseling & Guidance" },
  { value: "RESEARCH", label: "RESEARCH - Research & Development" },
];
const defaultLocation = [
  { value: "NYC", label: "NYC - New York City" },
  { value: "LA", label: "LA - Los Angeles" },
  { value: "CHI", label: "CHI - Chicago" },
  { value: "HOU", label: "HOU - Houston" },
  { value: "PHX", label: "PHX - Phoenix" },
  { value: "DAL", label: "DAL - Dallas" },
  { value: "SFO", label: "SFO - San Francisco" },
  { value: "SEA", label: "SEA - Seattle" },
  { value: "MIA", label: "MIA - Miami" },
  { value: "ATL", label: "ATL - Atlanta" },
];
const defaultAccount = [{ value: "Test", label: "SAVINGS - Savings Account" }];

const invoiceSchema = Yup.object().shape({
  poNumber: Yup.string()
    .required("Please select a PO Number")
    .notOneOf([""], "Please select a valid PO Number"),

  invoiceNumber: Yup.string()
    .required("Please select an Invoice Number")
    .notOneOf([""], "Please select a valid Invoice Number"),

  invoiceDate: Yup.date()
    .required("Invoice Date is required")
    .nullable()
    .typeError("Please enter a valid date"),

  totalInvoiceAmount: Yup.number()
    .required("Total Amount is required")
    .positive("Amount must be a positive number")
    .typeError("Please enter a valid number"),

  paymentTerm: Yup.string()
    .required("Please select a Payment Term")
    .notOneOf([""], "Please select a valid Payment Term"),

  invoiceDueDate: Yup.date()
    .required("Invoice Due Date is required")
    .nullable()
    .typeError("Please enter a valid date"),

  glPostDate: Yup.date()
    .required("GL Post Date is required")
    .nullable()
    .typeError("Please enter a valid date"),

  invoiceDescription: Yup.string()
    .required("Invoice Description is required")
    .min(10, "Description must be at least 10 characters")
    .max(500, "Description cannot exceed 500 characters"),

  expensesLineAmount: Yup.number()
    .required("Total Amount is required")
    .positive("Amount must be a positive number")
    .typeError("Please enter a valid number"),

  department: Yup.string()
    .required("Please select a Department")
    .notOneOf([""], "Please select a valid Department"),

  expenseAccount: Yup.string()
    .required("Please select a Account")
    .notOneOf([""], "Please select a valid Account"),

  expenseLocation: Yup.string()
    .required("Please select a Location")
    .notOneOf([""], "Please select a valid Location"),

  expenseDescription: Yup.string()
    .required("Invoice Description is required")
    .min(10, "Description must be at least 10 characters")
    .max(500, "Description cannot exceed 500 characters"),
});

const InvoiceDetailsForm = ({
  onNavigate,
}: {
  onNavigate: (values: any, step: string) => void;
}) => {
  const [globalInvoiceDetails, setGlobalInvoiceDetails] =
    useAtom(invoiceDetailsAtom);
  const getInitialValues = () => {
    return (
      globalInvoiceDetails.invoiceDetails || {
        poNumber: "",
        invoiceNumber: "",
        invoiceDate: "",
        totalInvoiceAmount: "",
        paymentTerm: "",
        invoiceDueDate: "",
        glPostDate: "",
        invoiceDescription: "",
        expensesLineAmount: "",
        department: "",
        expenseAccount: "",
        expenseLocation: "",
        expenseDescription: "",
      }
    );
  };
  const handleSubmit = (values: any, { resetForm }: any) => {
    onNavigate?.(values, "comments");
  };
  return (
    <div>
      <SectionHeader
        icon={<TfiReceipt color="blue" />}
        title="Invoice Details"
      />
      <SectionHeader title="General Information" className="!text-lg !mt-6" />
      <Formik
        initialValues={getInitialValues()}
        validationSchema={invoiceSchema}
        onSubmit={(values, actions) => handleSubmit(values, actions)}
      >
        {({ values, setFieldValue, isValid, dirty }) => (
          <Form>
            <Box display="flex" flexDirection="column">
              <FormikSelect
                name="poNumber"
                topLabel="Purchase Order Number"
                placeholder="Select PO Number"
                options={defaultPONumbers}
                type="text"
                size="small"
              />
              <Box display="flex" flexDirection="column" gap={1}>
                <SectionHeader
                  title="Invoice Details"
                  className="!text-lg !mt-4"
                />
                <Box
                  display="flex"
                  flexDirection="row"
                  justifyContent={"space-between"}
                  gap={1}
                >
                  <div className="w-1/2">
                    <FormikSelect
                      name="invoiceNumber"
                      topLabel="Invoice Number"
                      placeholder="Select Invoice Number"
                      options={defaultInvoiceNumbers}
                      type="text"
                      size="small"
                    />
                  </div>
                  <div className="w-1/2">
                    <FormikTextField
                      name="invoiceDate"
                      topLabel="Invoice Date"
                      size="small"
                      type="date"
                      format="MM/DD/YYYY"
                    />
                  </div>
                </Box>
                <Box
                  display="flex"
                  flexDirection="row"
                  justifyContent={"space-between"}
                  gap={1}
                >
                  <div className="w-1/2">
                    <FormikTextField
                      name="totalInvoiceAmount"
                      topLabel="Total Amount"
                      placeholder="0.0"
                      type="number"
                      size="small"
                      slotProps={{
                        input: {
                          startAdornment: (
                            <InputAdornment
                              position="start"
                              className="w-5 h-10"
                            >
                              <span className="inline-block text-center content-center absolute left-0 h-10 w-8 bg-gray-300">
                                <AttachMoneyIcon />
                              </span>
                            </InputAdornment>
                          ),
                          endAdornment: (
                            <InputAdornment position="end">
                              <span className="text-sm text-gray-400">USD</span>
                            </InputAdornment>
                          ),
                        },
                      }}
                    />
                  </div>
                  <div className="w-1/2">
                    <FormikSelect
                      name="paymentTerm"
                      topLabel="Payment Term"
                      placeholder="Select Term"
                      options={defaultPaymentTerms}
                      type="text"
                      size="small"
                    />
                  </div>
                </Box>
                <Box
                  display="flex"
                  flexDirection="row"
                  justifyContent={"space-between"}
                  gap={1}
                >
                  <div className="w-1/2">
                    <FormikTextField
                      name="invoiceDueDate"
                      topLabel="Invoice Due Date"
                      size="small"
                      type="date"
                      format="MM/DD/YYYY"
                    />
                  </div>
                  <div className="w-1/2">
                    <FormikTextField
                      name="glPostDate"
                      topLabel="GL Post Date"
                      size="small"
                      type="date"
                      format="MM/DD/YYYY"
                    />
                  </div>
                </Box>

                <FormikTextField
                  name="invoiceDescription"
                  topLabel="Invoice Description"
                  multiline
                  placeholder="Enter Invoice Description"
                  type="text"
                  size="small"
                />
              </Box>
              <Box display="flex" flexDirection="column" gap={1}>
                <Box
                  display="flex"
                  flexDirection="row"
                  alignItems="center"
                  justifyContent={"space-between"}
                  mt={4}
                  gap={1}
                >
                  <span className="!text-lg font-bold">Expense Details</span>
                  <span className="inline-flex justify-center items-center gap-2">
                    <span>
                      {" "}
                      $ 0.00/ <span className="text-blue-500">$ 0.00</span>
                    </span>
                    <span>
                      <TabsSegmentedControls />
                    </span>
                  </span>
                </Box>
                <Box
                  display="flex"
                  flexDirection="row"
                  justifyContent={"space-between"}
                  gap={1}
                >
                  <div className="w-1/2">
                    <FormikTextField
                      name="expensesLineAmount"
                      topLabel="Line Amount"
                      placeholder="0.0"
                      type="number"
                      size="small"
                      slotProps={{
                        input: {
                          startAdornment: (
                            <InputAdornment
                              position="start"
                              className="w-5 h-10"
                            >
                              <span className="inline-block text-center content-center absolute left-0 h-10 w-8 bg-gray-300">
                                <AttachMoneyIcon />
                              </span>
                            </InputAdornment>
                          ),
                          endAdornment: (
                            <InputAdornment position="end">
                              <span className="text-sm text-gray-400">USD</span>
                            </InputAdornment>
                          ),
                        },
                      }}
                    />
                  </div>
                  <div className="w-1/2">
                    <FormikSelect
                      name="department"
                      topLabel="Department"
                      placeholder="Select Department"
                      options={defaultDepartments}
                      type="text"
                      size="small"
                    />
                  </div>
                </Box>
                <Box
                  display="flex"
                  flexDirection="row"
                  justifyContent={"space-between"}
                  gap={1}
                >
                  <div className="w-1/2">
                    <FormikSelect
                      name="expenseAccount"
                      topLabel="Account"
                      placeholder="Select Account"
                      options={defaultAccount}
                      type="text"
                      size="small"
                    />
                  </div>
                  <div className="w-1/2">
                    <FormikSelect
                      name="expenseLocation"
                      topLabel="Expense Location"
                      placeholder="Select Location"
                      options={defaultLocation}
                      type="text"
                      size="small"
                    />
                  </div>
                </Box>
                <FormikTextField
                  name="expenseDescription"
                  topLabel="Description"
                  multiline
                  placeholder="Enter Description"
                  type="text"
                  size="small"
                />
              </Box>
              <Box
                display="flex"
                flexDirection="row"
                justifyContent={"flex-end"}
                gap={1}
              >
                <Button
                  type="button"
                  // disabled={!values.poNumber || !isValid || !dirty}
                  variant="outlined"
                  color="primary"
                  onClick={() => onNavigate?.(values, "vendor")}
                  sx={{ textTransform: "none" }}
                >
                  Back
                </Button>
                <Button
                  type="submit"
                  disabled={!values.poNumber || !isValid}
                  variant="contained"
                  color="primary"
                  sx={{ textTransform: "none" }}
                >
                  Next
                </Button>
              </Box>
            </Box>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default InvoiceDetailsForm;
