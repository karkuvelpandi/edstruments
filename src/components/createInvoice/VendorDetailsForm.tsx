"use client";
import React, { useEffect } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import {
  Button,
  Typography,
  Box,
  Divider,
} from "@mui/material";
import { useState } from "react";
import { PiBuildingOfficeLight } from "react-icons/pi";
import SectionHeader from "../ui/SectionHeader";
import FormikSelect from "../auth/components/FormikSelect";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { useAtom } from "jotai";
import { invoiceDetailsAtom } from "@/store";
const defaultVendors = [
  {
    value: "abc_solutions_101",
    label: "ABC Solutions",
    address: "123 Green Avenue, NY",
  },
  {
    value: "bright_supplies_102",
    label: "Bright Supplies",
    address: "45 School Street, CA",
  },
  {
    value: "educorp_services_103",
    label: "EduCorp Services",
    address: "678 Learning Road, TX",
  },
  {
    value: "nextgen_education_104",
    label: "NextGen Education",
    address: "89 Future Lane, FL",
  },
  {
    value: "smart_classroom_105",
    label: "Smart Classroom Tech",
    address: "12 Tech Park, WA",
  },
];
const vendorSchema = Yup.object().shape({
  vendor: Yup.string()
    .required("Please select a vendor")
    .notOneOf([""], "Please select a valid vendor"),
});
const VendorDetailsForm = ({
  onNavigate,
}: {
  onNavigate: (values: any, step: string) => void;
}) => {
  const [globalInvoiceDetails, setGlobalInvoiceDetails] =
    useAtom(invoiceDetailsAtom);
  const [selectedVendor, setSelectedVendor] = useState<any>(null);
  const [openVendorDetails, setOpenVendorDetails] = useState(false);
  const getInitialValues = () => {
    console.log(globalInvoiceDetails, "this is on first step");
    return { vendor: globalInvoiceDetails?.vendor || "" };
  };

  useEffect(() => {
    const value = getInitialValues();
    const initialValue = defaultVendors.find(
      (vendor) => vendor.value === value.vendor
    );
    setSelectedVendor(initialValue);
  }, []);
  const handleSubmit = (values: any, { resetForm }: any) => {
    onNavigate?.(values, 'invoice');
    console.log(globalInvoiceDetails, "this is on first step");
  };
  return (
    <div>
      <SectionHeader
        icon={<PiBuildingOfficeLight color="blue" />}
        title="Vendor Details"
      />
      <SectionHeader title="Vendor Information" className="!text-lg !mt-6" />

      <Formik
        initialValues={getInitialValues()}
        validationSchema={vendorSchema}
        onSubmit={(values, actions) => handleSubmit(values, actions)}
      >
        {({ values, setFieldValue }) => (
          <Form>
            <Box display="flex" flexDirection="column" gap={1}>
              <FormikSelect
                name="vendor"
                topLabel="Vendor"
                placeholder="Select Vendor"
                options={defaultVendors}
                type="text"
                size="small"
                onChange={(event: any) => {
                  const selectedOption = defaultVendors.find(
                    (vendor) => vendor.value === event.target.value
                  );
                  setFieldValue("vendor", event.target.value);
                  if (selectedOption) setSelectedVendor(selectedOption);
                  else setSelectedVendor(null);
                }}
              />
              {selectedVendor && (
                <p className="text-center">
                  <span
                    className="text-blue-400 cursor-pointer text-xs"
                    onClick={() => setOpenVendorDetails(!openVendorDetails)}
                  >
                    <KeyboardArrowDownIcon className="!mr-2 pointer-events-none" />
                    View Vendor Details
                  </span>
                </p>
              )}
              {openVendorDetails && selectedVendor && (
                <div className="!py-2 !px-4 bg-white rounded-md">
                  <Typography variant="subtitle1" gutterBottom>
                    Vendor Details
                  </Typography>
                  <Divider />
                  <Typography variant="body2" mt={1} gutterBottom>
                    <span className="font-semibold"> Name: </span>{" "}
                    {selectedVendor?.label} ({selectedVendor?.value})
                  </Typography>
                  <Typography variant="body2" mt={1} gutterBottom>
                    <span className="font-semibold"> Address: </span>{" "}
                    {selectedVendor?.address}
                  </Typography>
                </div>
              )}

              <Box
                display="flex"
                flexDirection="row"
                justifyContent={"flex-end"}
                gap={1}
              >
                <Button
                  type="submit"
                  disabled={!values.vendor}
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

export default VendorDetailsForm;
