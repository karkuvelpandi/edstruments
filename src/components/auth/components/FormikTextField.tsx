import React, { useState } from "react";
import { Field } from "formik";
import { TextField, IconButton, InputAdornment } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const FormikTextField = ({ name, label, type, ...props }: any) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <Field name={name} type={type}>
      {({ field, form }: { field: any; form: any }) => (
        <TextField
          {...field}
          label={label}
          type={showPassword && type === "password" ? "text" : type}
          variant="outlined"
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
      )}
    </Field>
  );
};

export default FormikTextField;
