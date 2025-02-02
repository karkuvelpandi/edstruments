"use client";
import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { Button, Typography, Box, Tabs, Tab } from "@mui/material";
import { useState } from "react";
import { useUser } from "@/context/UserProvider";
import { useRouter } from "next/navigation";
import FormikTextField from "./components/FormikTextField";


// Validation schemas
const LoginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string().min(6, "Too Short!").required("Required"),
});

const SignUpSchema = Yup.object().shape({
  name: Yup.string().min(3, "Too Short!").required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Required"),
});

const Auth = () => {
  const [tab, setTab] = useState(0);
  const { toast, setUser } = useUser();
  const router = useRouter();

  const getInitialValues = (formType: string) => {
    return formType === "login"
      ? { email: "", password: "" }
      : { name: "", email: "", password: "" };
  };

  // Handle form submission and persistence
  const handleSubmit = (values: any, { resetForm }: any, formType: string) => {
    toast("Sign Up Successful!", "success");
    const existingUser = localStorage.getItem(`User-${values.email}`);
    const userObj = existingUser && JSON.parse(existingUser);
    if (userObj?.email && formType === "login") {
      if (
        userObj.email === values.email &&
        userObj.password === values.password
      ) {
        localStorage.setItem("currentLoggedInUser", values.email);
        toast("Login Successful!", "success");
        alert("Login Successful!");
        setUser(userObj);
        resetForm();
        router.push("/dashboard");
        return;
      } else {
        toast("Invalid credentials", "error");
        alert("Invalid credentials");
        return;
      }
    } else if (!userObj && formType === "login") {
      toast("User does not exist. Please sign up.", "error");
      alert("User does not exist. Please sign up.");
      return;
    }
    if (userObj?.email && formType === "signup") {
      toast("User already exists. Please login.", "error");
      alert("User already exists. Please login.");
      return;
    }
    localStorage.setItem("currentLoggedInUser", values.email);
    localStorage.setItem(`User-${values.email}`, JSON.stringify(values));
    toast("Sign Up Successful!", "success");
    alert("Sign Up Successful!");
    setUser(values);
    router.push("/dashboard");
    resetForm();
  };

  return (
    <Box maxWidth={400} mx="auto" mt={4}>
      <Typography variant="h4" textAlign="center" mb={3}>
        Welcome
      </Typography>
      <Tabs value={tab} onChange={(e, newValue) => setTab(newValue)} centered>
        <Tab label="Login" />
        <Tab label="Sign Up" />
      </Tabs>
      {tab === 0 && (
        <Formik
          initialValues={getInitialValues("login")}
          validationSchema={LoginSchema}
          onSubmit={(values, actions) => handleSubmit(values, actions, "login")}
        >
          {() => (
            <Form>
              <Box display="flex" flexDirection="column" gap={2} mt={2}>
                <FormikTextField name="email" label="Email" type="email"/>
                <FormikTextField name="password" label="Password" type="password"/>
                <Button type="submit" variant="contained" color="primary">
                  Login
                </Button>
              </Box>
            </Form>
          )}
        </Formik>
      )}
      {tab === 1 && (
        <Formik
          initialValues={getInitialValues("signup")}
          validationSchema={SignUpSchema}
          onSubmit={(values, actions) =>
            handleSubmit(values, actions, "signup")
          }
        >
          {() => (
            <Form>
              <Box display="flex" flexDirection="column" gap={2} mt={2}>
                <FormikTextField name="name" label="Name" type="text"/>
                <FormikTextField name="email" label="Email" type="email"/>
                <FormikTextField name="password" label="Password" type="password"/>
                <Button type="submit" variant="contained" color="primary">
                  Sign Up
                </Button>
              </Box>
            </Form>
          )}
        </Formik>
      )}
    </Box>
  );
};

export default Auth;
