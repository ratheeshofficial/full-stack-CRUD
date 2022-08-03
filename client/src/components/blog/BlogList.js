import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Textarea,
  Th,
  Thead,
  Tr,
  useDisclosure,
} from "@chakra-ui/react";
import axios from "axios";
import { RiDeleteBinFill } from "react-icons/ri";
import { FaEdit } from "react-icons/fa";
import { GrView } from "react-icons/gr";
import { React, useEffect, useState } from "react";
import { NavLink, Link } from "react-router-dom";
import Layout from "../common/Layout";
import jwt_decode from "jwt-decode";
const Comment = () => {
  return (
    <>
      <Input />
      <Box textAlign="right" mt="2">
        <Button bg="#0BC5EA" _hover="#0BC5EA">
          Post
        </Button>
      </Box>
    </>
  );
};

const BlogList = () => {
  const [blogdetails, setBlogDetails] = useState([]);
  // console.log(blogdetails);
  const [blogData, setBlogData] = useState({});
  // console.log(blogData);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const [inputBox, setInputBox] = useState();

  const addInput = () => {
    setInputBox(() => {
      return <Comment />;
    });
  };

  useEffect(() => {
    if (blogdetails) {
      axios.get("http://localhost:3000/api/blog/get").then((res) => {
        setBlogDetails(res.data);
      });
    }
  }, []);

  const updateIcon = (data) => {
    // console.log("Update icon clicked");
    setBlogData(data);
    onOpen();
  };
  const handleChange = (e) => {
    // console.log("Onchange value");
    const { name, value } = e.target;
    setBlogData({ ...blogData, [name]: value });
  };

  const handleUpdate = () => {
    console.log(blogData._id);
    axios
      .put(`http://localhost:3000//api/blog/update/${blogData._id}`, blogData)
      .then((res) => {
        setBlogDetails([...blogdetails, res.data.bodyData]);
      })

      .catch((err) => console.log(err.message));
    onClose();
  };

  const handleDelete = (id) => {
    try {
      axios
        .delete(`http://localhost:3000/api/blog/delete/${id}`)
        .then((res) => {
          // console.log(res);

          const blogFilter = blogdetails.filter(
            (data) => data._id !== res.data.id
          );
          setBlogDetails([...blogFilter]);
          // console.log(blogFilter);
        });
    } catch (error) {
      console.log("error");
    }
  };
  const auth = window.localStorage.getItem("token");
  var decoded = jwt_decode(auth);
  console.log(decoded, "auth");

  const handleView = (data) => {
    setBlogData(data);
    console.log(data, "data");
    onOpen();
  };
  return (
    <>
      <Layout>
        <Text
          textAlign="center"
          fontSize="4xl"
          mb={5}
          textDecoration="underline"
          fontWeight="extrabold"
        >
          Articles
        </Text>
        {decoded.role === "admin" && (
          <Box textAlign="right" pr="3" mb="5">
            <Button colorScheme="blue">
              <NavLink to="/blogform">+ New Blog</NavLink>
            </Button>
          </Box>
        )}
        <Flex justifyContent="center">
          <TableContainer>
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>Title</Th>
                  {decoded.role === "admin" && (
                    <>
                      <Th>Message</Th>
                      <Th>Edit</Th>
                      <Th>Delete</Th>
                    </>
                  )}

                  <Th>View</Th>
                </Tr>
              </Thead>
              <Tbody>
                {blogdetails.map((data, key) => {
                  return (
                    <Tr key={key + 1}>
                      {/* <Link to="/blogPage" state={{ from: blogData }}>
                      {data.blogTitle}
                    </Link> */}
                      <Td>{data.blogTitle}</Td>

                      {decoded.role === "admin" && (
                        <>
                          <Td>{data.blogMessage}</Td>

                          <Td>
                            <FaEdit
                              color="green"
                              cursor="pointer"
                              onClick={() => updateIcon(data)}
                            />
                          </Td>
                          <Td>
                            <RiDeleteBinFill
                              color="#b50505de"
                              cursor="pointer"
                              onClick={() => handleDelete(data._id)}
                            />
                          </Td>
                        </>
                      )}

                      <Td>
                        <Link to="/blogPage" state={data}>
                          <GrView color="#b50505de" cursor="pointer" />
                        </Link>
                      </Td>
                    </Tr>
                  );
                })}
              </Tbody>
            </Table>
          </TableContainer>
        </Flex>

        {/* Update Modal */}
        {decoded.role === "admin" && (
          <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Update Blog Post</ModalHeader>
              <ModalCloseButton />
              <ModalBody pb={6}>
                <FormControl>
                  <FormLabel>Blog Title</FormLabel>
                  <Input
                    placeholder="Update Blog Title"
                    value={blogData.blogTitle ? blogData.blogTitle : ""}
                    name="blogTitle"
                    onChange={handleChange}
                  />
                </FormControl>

                <FormControl mt={4}>
                  <FormLabel>Message</FormLabel>
                  <Textarea
                    placeholder="Update The Blog Message"
                    value={blogData.blogMessage ? blogData.blogMessage : ""}
                    name="blogMessage"
                    onChange={handleChange}
                  />
                </FormControl>
              </ModalBody>

              <ModalFooter>
                <Button colorScheme="blue" mr={3} onClick={handleUpdate}>
                  Update
                </Button>
                <Button onClick={onClose}>Cancel</Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        )}

        {/* {decoded.role === "user" && (
          <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader> Blog View</ModalHeader>
              <ModalCloseButton />
              <ModalBody pb={6}>
                <FormControl>
                  <FormLabel>
                    Title :{" "}
                    {blogData.blogTitle ? blogData.blogTitle : "Title Error"}
                  </FormLabel>
                </FormControl>

                <FormControl mt={4}>
                  <FormLabel>
                    Message :{" "}
                    {blogData.blogMessage
                      ? blogData.blogMessage
                      : "Message error"}
                  </FormLabel>
                </FormControl>
                <Box mb="4">{inputBox}</Box>
                <Button colorScheme="blue" mr={3} onClick={addInput}>
                  Reply
                </Button>
              </ModalBody>
            </ModalContent>
          </Modal>
        )} */}
      </Layout>
    </>
  );
};

export default BlogList;
