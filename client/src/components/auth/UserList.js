import {
  Box,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import axios from "axios";
import { MdDelete } from "react-icons/md";
import React, { useEffect, useState } from "react";

const UserList = () => {
  const [userList, setUserList] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3000/api/user/get").then((res) => {
      setUserList(res.data);
    });
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios
        .delete(`http://localhost:3000/api/user/delete/${id}`)
        .then((res) => {
          // console.log(typeof res.data.id);
          const userFilter = userList.filter(
            (user) => user._id !== res.data.id //filter returns not a same value
          );
          console.log(userFilter);
          setUserList([...userFilter]);
        });
      // console.log(typeof userId);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Box width="50">
      <TableContainer>
        {userList.length > 0 &&
          userList.map((user, key) => {
            // console.log(typeof user._id);
            return (
              <Box textAlign="-moz-center">
                <Table
                  variant="striped"
                  colorScheme="teal"
                  size="md"
                  width={50}
                >
                  <Thead>
                    <Tr>
                      <Th>Id</Th>
                      <Th>First Name</Th>
                      <Th>LastName</Th>
                      <Th>Email</Th>
                      <Th>Delete</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    <Tr key={key}>
                      <Td>{user._id}</Td>
                      <Td>{user.firstName}</Td>
                      <Td>{user.lastName}</Td>
                      <Td>{user.email}</Td>
                      <Td
                        cursor="pointer"
                        onClick={() => {
                          handleDelete(user._id);
                        }}
                      >
                        <MdDelete />
                      </Td>
                    </Tr>
                  </Tbody>
                </Table>
              </Box>
            );
          })}
      </TableContainer>
    </Box>
  );
};
export default UserList;
