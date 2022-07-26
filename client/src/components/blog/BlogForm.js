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
import { BackBtn } from "../common/BackBtn";
import Layout from "../common/Layout";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const BlogForm = () => {
  // const modules = {
  //   toolbar: [["bold", "italic", "underline", "link"]],
  // };
  // const { quill, quillRef } = useQuill({ modules });
  // console.log(quill, "sssssssssssssssss");
  // const [dummyState, setDummyState] = React.useState({
  //   description: "",
  // });
  // console.log(dummyState);
  // let editor = ReactQuill;
  // console.log(editor, "aaaaaaaaaaaaaaaaaaaaaaaa");
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      blogTitle: "",
      blogMessage: "",
    },

    validationSchema: Yup.object({
      blogTitle: Yup.string().required(" Required"),
      blogMessage: Yup.string().required("No Message provided."),
    }),

    onSubmit: async (values, { resetForm, setFieldValue }) => {
      console.log(values, "sssssssssssssss111111111111");
      try {
        await axios.post("https://blogwheel.herokuapp.com/api/blog", values);
        resetForm();
        navigate("/home");
      } catch (error) {
        alert("error");
        resetForm();
        console.log(error);
      }
    },
  });

  // const handleChange = (content, delta, source, editor) => {
  //   console.log(editor.getText(), "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA");
  //   // formik.setFieldValue("blogMessage", editor.getText());
  //   setDummyState(editor.getText());
  // };

  return (
    <>
      <Layout>
        <Box ml="5" mt="5">
          <BackBtn />
        </Box>
        <Container>
          <Text fontSize="3xl" textAlign="center" fontWeight="bold">
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

export default BlogForm;
