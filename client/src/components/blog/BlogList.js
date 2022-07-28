import {
  Box,
  Button,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import axios from "axios";
import { RiDeleteBinFill } from "react-icons/ri";
import { FaEdit } from "react-icons/fa";
import { React, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

const BlogList = () => {
  const [blogdetails, setBlogDetails] = useState([]);
  // console.log(blogdetails);

  useEffect(() => {
    axios.get("http://localhost:3000/api/blog/get").then((res) => {
      setBlogDetails(res.data);
    });
  }, []);

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
          console.log(blogFilter);
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
            {blogdetails.map((data) => {
              return (
                <Tr>
                  <Td>{data.blogTitle}</Td>
                  <Td>{data.blogMessage}</Td>
                  <Td>
                    <FaEdit color="green" cursor="pointer" />
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
    </>
  );
};

export default BlogList;
