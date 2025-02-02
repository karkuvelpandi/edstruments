import React, { useState } from "react";
import { Field } from "formik";
import {
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  FormHelperText,
  Typography,
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { Label } from "@mui/icons-material";

const FormikSelect = ({
  name,
  label,
  options,
  topLabel,
  placeholder,
  ...props
}: any) => {
  const [extraHelperText, setExtraHelperText] = useState("");
  return (
    <Field name={name}>
      {({ field, form }: { field: any; form: any }) => (
        <FormControl
        fullWidth
          className="w-auto"
          margin="normal"
          error={form.touched[name] && Boolean(form.errors[name])}
        >
          {topLabel && (
            <span className="text-gray-400 font-semibold">
              {topLabel} <span className="text-red-500">*</span>
            </span>
          )}
          <Select
            {...field}
            label={label}
            className="bg-white"
            IconComponent={() => (
              <KeyboardArrowDownIcon className="!mr-2 pointer-events-none" />
            )}
            displayEmpty
            renderValue={(value: any) => {
              if (value === "") {
                return <Typography color="gray">{placeholder}</Typography>;
              }
              return options.find((opt: any) => opt.value === value)?.label;
            }}
            {...props}
          >
            {(options?.length === 0 || !options) && (
              <p className="text-center">{"No vendor found!"}</p>
            )}
            <MenuItem value={""} onClick={() => setExtraHelperText("")}>
              {placeholder}
            </MenuItem>
            {options?.map(
              (option: { value: string; label: string; address?: string }) => (
                <MenuItem
                  key={option.value}
                  value={option.value}
                  onClick={() =>
                    option?.address && setExtraHelperText(option?.address)
                  }
                >
                  {option.label}
                </MenuItem>
              )
            )}
          </Select>
          {extraHelperText && (
            <FormHelperText className="!text-gray-400 !font-semibold">
              {extraHelperText}
            </FormHelperText>
          )}
          <FormHelperText>
            {form.touched[name] && form.errors[name]}
          </FormHelperText>
        </FormControl>
      )}
    </Field>
  );
};

export default FormikSelect;
