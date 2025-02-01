import React from "react";
import { Field } from "formik";
import { Select, MenuItem, FormControl, InputLabel, FormHelperText } from "@mui/material";

const FormikSelect = ({ name, label, options, ...props }: any) => {
  return (
    <Field name={name}>
      {({ field, form }:{ field: any; form: any}) => (
        <FormControl fullWidth margin="normal" error={form.touched[name] && Boolean(form.errors[name])}>
          <InputLabel>{label}</InputLabel>
          <Select {...field} label={label} {...props}>
            {options.map((option:{ value: string; label: string}) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
          <FormHelperText>{form.touched[name] && form.errors[name]}</FormHelperText>
        </FormControl>
      )}
    </Field>
  );
};

export default FormikSelect;
