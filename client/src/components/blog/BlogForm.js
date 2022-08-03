import {
  Box,
  Button,
  Container,
  Input,
  Text,
  Textarea,
} from "@chakra-ui/react";
import axios from "axios";
import { useFormik } from "formik";
import React from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import Layout from "../common/Layout";

const BlogHome = () => {
  const history = useNavigate();

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

          resetForm({ values: "" });
          history("/home");
        })
        .catch((res) => {
          console.log(res, " catch");
        });
    },
  });

  return (
    <>
      <Layout>
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
      </Layout>
    </>
  );
};

export default BlogHome;
