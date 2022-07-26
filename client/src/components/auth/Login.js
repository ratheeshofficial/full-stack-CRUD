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
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";

const Login = () => {
  const history = useNavigate();
  const toast = useToast();
  const [userData, SetUserData] = useState([]);
  console.log(userData);

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

      axios.post("http://localhost:3000/login", { values });
      // userData.map(async (data) => {
      //   if (values.email === data.email && values.password === data.password) {
      //     // console.log("Values " + values.email, values.password);
      //     console.log("Data " + data.email, data.password);
      //     toast({
      //       title: "Account created.",
      //       description: "Login Successfully",
      //       status: "success",
      //       duration: 2000,
      //       isClosable: true,
      //     });
      //     resetForm({ values: "" });
      //     history("/user");
      //   } else {
      //     console.log("error email");
      //     toast({
      //       title: "Account created.",
      //       description: "Login Successfully",
      //       status: "error",
      //       duration: 2000,
      //       isClosable: true,
      //     });
      //     alert("You Enter Wrong Credentials");
      //     // toast({
      //     //   title: "Account not Created.",
      //     //   description: "Login Failed",
      //     //   status: "error",
      //     //   duration: 2000,
      //     //   isClosable: true,
      //     // });
      //   }
      // });
    },
  });

  useEffect(() => {
    axios.get("http://localhost:3000/api/user/get").then((res) => {
      SetUserData(res.data);
    });
  }, []);

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
