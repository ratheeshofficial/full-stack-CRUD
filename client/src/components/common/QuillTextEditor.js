import React, { useState } from "react";

import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import parse from "html-react-parser";
// import "react-quill/dist/quill.bubble.css";

import { Box, Input, Text } from "@chakra-ui/react";
import Layout from "./Layout";

const QuillTextEditor = () => {
  // const modules = {
  //   toolbar: [["bold", "italic", "underline", "link"]],
  // };
  // const { quill, quillRef } = useQuill({ modules });

  const [value, setValue] = useState("");
  console.log(parse(value));

  return (
    <>
      <Layout>
        <Box w="500px" h="500px" p="5">
          <ReactQuill theme="snow" value={value} onChange={setValue} />
          {/* <Input onChange={handleChange} /> */}
          <Text>{parse(value)}</Text>
        </Box>
      </Layout>
    </>
  );
};

export default QuillTextEditor;
