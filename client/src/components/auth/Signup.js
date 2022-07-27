import React from "react";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
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

const SignupForm = (props) => {
  const history = useNavigate();
  const toast = useToast();

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },

    validationSchema: Yup.object({
      firstName: Yup.string()
        .max(15, "Must be 15 characters or less")
        .required("Required"),
      lastName: Yup.string()
        .max(20, "Must be 20 characters or less")
        .required("Required"),
      email: Yup.string().email("Invalid email address").required("Required"),
      password: Yup.string()
        .required("No password provided.")
        .min(8, "Password is too short - should be 8 chars minimum."),
    }),

    onSubmit: (values, { resetForm }) => {
      //   alert(JSON.stringify(values, null, 2));
      console.log(props.mode, "props.mode");
      if (props.mode === "edit") {
        console.log("name", (values.firstName = props.name.firstName));
      } else {
        axios
          .post("http://localhost:3000/api/user", values)
          .then((res) => {
            console.log(res, "LLLLLLLLLLLLLLLLLL");
            res.data.success === true &&
              toast({
                title: "Account created.",
                description: "We've created your account for you.",
                status: "success",
                duration: 2000,
                isClosable: true,
              });
            resetForm({ values: "" });
            history("/login");
          })
          .catch((res) => {
            console.log(res, "AAAAAAAAAAAAAAAA");
            !res.response.data.success &&
              toast({
                title: "Email is already exist",
                description: "We've Not created your account for you.",
                status: "error",
                duration: 2000,
                isClosable: true,
              });
          });
      }
    },
  });

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
            <div style={{ color: "red" }}>{formik.errors.firstName}</div>
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
            <div style={{ color: "red" }}>{formik.errors.lastName}</div>
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
            <div style={{ color: "red" }}>{formik.errors.email}</div>
          ) : null}
          <label htmlFor="email">Password</label>
          <Input
            id="password"
            name="password"
            type="password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
          />
          {formik.touched.password && formik.errors.password ? (
            <div style={{ color: "red" }}>{formik.errors.password}</div>
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
    </>
  );
};

export default SignupForm;
