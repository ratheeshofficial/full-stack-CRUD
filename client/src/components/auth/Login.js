import {
  Box,
  Button,
  Container,
  Input,
  Text,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { useFormik } from "formik";
import React from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";

const Login = () => {
  const history = useNavigate();
  const toast = useToast();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },

    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email address").required("Required"),
      password: Yup.string()
        .required("No password provided.")
        .min(8, "Password is too short - should be 8 chars minimum."),
    }),

    onSubmit: (values, { resetForm }) => {
      //   alert(JSON.stringify(values, null, 2));

      axios
        .post("http://localhost:3000/login", values)
        .then((res) => {
          console.log(res, " then");
          res.data.success === true &&
            toast({
              title: "Login Successfully",
              description: "We've created your account for you.",
              status: "success",
              duration: 2000,
              isClosable: true,
            });
          resetForm({ values: "" });
          history("/user");
        })
        .catch((res) => {
          console.log(res, " catch");
          !res.response.data.success &&
            toast({
              title: "Login Failed",
              description: "Entered Credentials is wrong",
              status: "error",
              duration: 2000,
              isClosable: true,
            });
        });
    },
  });

  return (
    <>
      <Container>
        <Text fontSize="3xl" textAlign="center">
          Login
        </Text>
        <form onSubmit={formik.handleSubmit}>
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

export default Login;
