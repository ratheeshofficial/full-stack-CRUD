import React from "react";
import { useFormik } from "formik";
import UserList from "./userList";
import {
  Box,
  Button,
  Container,
  Input,
  Text,
  useToast,
} from "@chakra-ui/react";
import * as Yup from "yup";
import axios from "axios";

const SignupForm = () => {
  const toast = useToast();

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
    },

    validationSchema: Yup.object({
      firstName: Yup.string()
        .max(15, "Must be 15 characters or less")
        .required("Required"),
      lastName: Yup.string()
        .max(20, "Must be 20 characters or less")
        .required("Required"),
      email: Yup.string().email("Invalid email address").required("Required"),
    }),

    onSubmit: (values, { resetForm }) => {
      //   alert(JSON.stringify(values, null, 2));
      console.log(values);
      axios.post("http://localhost:3000/api/user", {
        values,
      });
      toast({
        title: "Account created.",
        description: "We've created your account for you.",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
      resetForm({ values: "" });
    },
  });

  //   const saveData = () => {
  //     Axios.post("http://localhost:3000/api/user", {
  //       firstName: formik.values.firstName,
  //       lastName: formik.values.lastName,
  //       email: formik.values.email,
  //     });
  //   };

  return (
    <>
      <Container>
        <Text fontSize="3xl" textAlign="center">
          Sign Up
        </Text>
        <form onSubmit={formik.handleSubmit}>
          <label htmlFor="firstName">First Name</label>
          <Input
            id="firstName"
            name="firstName"
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.firstName}
          />
          {formik.touched.firstName && formik.errors.firstName ? (
            <div>{formik.errors.firstName}</div>
          ) : null}

          <label htmlFor="lastName">Last Name</label>
          <Input
            id="lastName"
            name="lastName"
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.lastName}
          />
          {formik.touched.lastName && formik.errors.lastName ? (
            <div>{formik.errors.lastName}</div>
          ) : null}

          <label htmlFor="email">Email Address</label>
          <Input
            id="email"
            name="email"
            type="email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
          />
          {formik.touched.email && formik.errors.email ? (
            <div>{formik.errors.email}</div>
          ) : null}
          <Box textAlign="center">
            <Button
              colorScheme="blue"
              justifyContent="center"
              mt="5"
              type="submit"
            >
              Submit
            </Button>
          </Box>
        </form>
      </Container>
      <UserList />
    </>
  );
};

export default SignupForm;
