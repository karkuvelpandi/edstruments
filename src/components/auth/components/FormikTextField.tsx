import React, { useState } from "react";
import { Field } from "formik";
import {
  TextField,
  IconButton,
  InputAdornment,
  FormControl,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const FormikTextField = ({ name, label, type, topLabel, ...props }: any) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <Field name={name} type={type}>
      {({ field, form }: { field: any; form: any }) => (
        <FormControl
          fullWidth
          margin="normal"
          error={form.touched[name] && Boolean(form.errors[name])}
        >
          {topLabel && (
            <span className="text-gray-400 font-semibold">
              {topLabel} <span className="text-red-500">*</span>
            </span>
          )}
          <TextField
            {...field}
            label={label}
            type={showPassword && type === "password" ? "text" : type}
            variant="outlined"
            className="!mt-0 bg-white"
            fullWidth
            margin="normal"
            error={form.touched[name] && Boolean(form.errors[name])}
            helperText={form.touched[name] && form.errors[name]}
            {...props}
            InputProps={
              type === "password"
                ? {
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={handleClickShowPassword}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }
                : {}
            }
          />
        </FormControl>
      )}
    </Field>
  );
};

export default FormikTextField;
