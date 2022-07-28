import {
  Box,
  Button,
  Container,
  Input,
  Text,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { useFormik } from "formik";
import React from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";

const BlogHome = () => {
  const history = useNavigate();
  const toast = useToast();

  const formik = useFormik({
    initialValues: {
      blogTitle: "",
      blogMessage: "",
    },

    validationSchema: Yup.object({
      blogTitle: Yup.string().required(" Required"),
      blogMessage: Yup.string().required("No Message provided."),
    }),

    onSubmit: (values, { resetForm }) => {
      //   alert(JSON.stringify(values, null, 2));

      axios
        .post("http://localhost:3000/api/blog", values)
        .then((res) => {
          console.log(res, " then");
          // res.data.success === true &&
          //   toast({
          //     title: "Login Successfully",
          //     description: "We've created your account for you.",
          //     status: "success",
          //     duration: 2000,
          //     isClosable: true,
          //   });
          resetForm({ values: "" });
          history("/home");
        })
        .catch((res) => {
          console.log(res, " catch");
          // !res.response.data.success &&
          //   toast({
          //     title: "Login Failed",
          //     description: "Entered Credentials is wrong",
          //     status: "error",
          //     duration: 2000,
          //     isClosable: true,
          //   });
        });
    },
  });

  return (
    <>
      <Container>
        <Text fontSize="3xl" textAlign="center">
          Create Blog
        </Text>
        <form onSubmit={formik.handleSubmit}>
          <label htmlFor="blogTitle">Title</label>
          <Input
            mb={3}
            id="blogTitle"
            name="blogTitle"
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.blogTitle}
          />
          {formik.touched.blogTitle && formik.errors.blogTitle ? (
            <div style={{ color: "red" }}>{formik.errors.blogTitle}</div>
          ) : null}
          <label htmlFor="blogMessage">Message</label>
          <Textarea
            placeholder="Enter a Message"
            size="sm"
            id="blogMessage"
            name="blogMessage"
            type="textarea"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.blogMessage}
          />
          {formik.touched.blogMessage && formik.errors.blogMessage ? (
            <div style={{ color: "red" }}>{formik.errors.blogMessage}</div>
          ) : null}
          <Box textAlign="center">
            <Button
              colorScheme="blue"
              justifyContent="center"
              mt="5"
              type="submit"
            >
              Save
            </Button>
          </Box>
        </form>
      </Container>
    </>
  );
};

export default BlogHome;
