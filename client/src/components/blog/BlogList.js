import {
  Box,
  Button,
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
import { React, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

const BlogList = () => {
  const [blogdetails, setBlogDetails] = useState([]);
  // console.log(blogdetails);
  const [blogData, setBlogData] = useState({});
  // console.log(blogData);

  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    if (blogdetails) {
      // axios.get("http://localhost:3000/api/blog/get").then((res) => {
      //   setBlogDetails(res.data);
      // });
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
  return (
    <>
      <Text textAlign="center" fontSize="4xl" mb={5} textDecoration="underline">
        Blog Details
      </Text>
      <Box textAlign="right" pr="3">
        <Button>
          <NavLink to="/blogform">+ New Blog</NavLink>
        </Button>
      </Box>
      <TableContainer>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Title</Th>
              <Th>Message</Th>
              <Th>Edit</Th>
              <Th>Delete</Th>
            </Tr>
          </Thead>
          <Tbody>
            {blogdetails.map((data, key) => {
              return (
                <Tr key={key + 1}>
                  <Td>{data.blogTitle}</Td>
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
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </TableContainer>
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
    </>
  );
};

export default BlogList;
