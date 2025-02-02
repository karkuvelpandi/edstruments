"use client";
import React from "react";
import { Field } from "formik";
import {
  TextField,
  FormControl,
  FormHelperText,
  Typography,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";

const FormikDatePicker = ({
  name,
  label,
  topLabel,
  placeholder,
  ...props
}: any) => {
  return (
    <Field name={name}>
      {({ field, form }: { field: any; form: any }) => {
        const errorText = form.touched[name] && form.errors[name];
        return (
          <FormControl fullWidth margin="normal" error={Boolean(errorText)}>
            {topLabel && (
              <span className="text-gray-400 font-semibold">
                {topLabel} <span className="text-red-500">*</span>
              </span>
            )}
            <DatePicker
              {...field}
              value={field.value ? dayjs(field.value) : null}
              onChange={(date) => {
                const formattedDate = date ? date?.format("YYYY-MM-DD") : "";
                form.setFieldValue(name, formattedDate);
              }}
              // renderInput={(params) => (
              //   <TextField
              //     {...params}
              //     label={label}
              //     placeholder={placeholder}
              //     error={Boolean(errorText)}
              //   />
              // )}
              {...props}
            />
            <FormHelperText>
              {errorText || (placeholder && <Typography>{placeholder}</Typography>)}
            </FormHelperText>
          </FormControl>
        );
      }}
    </Field>
  );
};

export default FormikDatePicker;
