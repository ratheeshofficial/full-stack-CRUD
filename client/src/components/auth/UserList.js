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
  Th,
  Thead,
  Tr,
  useDisclosure,
} from "@chakra-ui/react";
import axios from "axios";
import { MdDelete } from "react-icons/md";
import { FiEdit } from "react-icons/fi";
import React, { useEffect, useState } from "react";

const UserList = () => {
  const [userList, setUserList] = useState([]);
  const [updateUser, setUpdateUser] = useState({});
  // console.log(updateUser.firstName);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);

  useEffect(() => {
    axios.get("http://localhost:3000/api/user/get").then((res) => {
      setUserList(res.data);
    });
  }, []);

  const handleUpdate = (user) => {
    setUpdateUser(user);
    onOpen();
  };

  const handleChange = (e) => {
    // console.log(e.target.value);
    const { name, value } = e.target;
    return setUpdateUser({ ...updateUser, [name]: value });
  };

  const updateBtn = () => {
    console.log("button Clicked");
    console.log(updateUser._id, updateUser);
    axios.put(
      `http://localhost:3000/api/user/update/${updateUser._id}`,
      updateUser
    );
    onClose();
  };

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
    <>
      <Box width="100">
        <TableContainer>
          {userList.length > 0 &&
            userList.map((user, key) => {
              // console.log(typeof user._id);
              return (
                <Box textAlign="-moz-center" width="100%">
                  <Table
                    variant="striped"
                    colorScheme="teal"
                    size="md"
                    width="100%"
                  >
                    <Thead>
                      <Tr>
                        <Th width="20%">Id</Th>
                        <Th width="20%">First Name</Th>
                        <Th width="20%">LastName</Th>
                        <Th width="30%">Email</Th>
                        <Th width="30%">Edit</Th>
                        <Th width="5%">Delete</Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      <Tr key={key}>
                        <Td>{user._id}</Td>
                        <Td>{user.firstName}</Td>
                        <Td>{user.lastName}</Td>
                        <Td>{user.email}</Td>
                        <Td cursor="pointer" onClick={() => handleUpdate(user)}>
                          <FiEdit />
                        </Td>
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
        <Modal
          initialFocusRef={initialRef}
          finalFocusRef={finalRef}
          isOpen={isOpen}
          onClose={onClose}
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Update</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <FormControl>
                <FormLabel>First name</FormLabel>
                <Input
                  placeholder="First name"
                  value={updateUser.firstName ? updateUser.firstName : ""}
                  name="firstName"
                  onChange={handleChange}
                />
              </FormControl>

              <FormControl mt={4}>
                <FormLabel>Last name</FormLabel>
                <Input
                  placeholder="Last name"
                  value={updateUser.lastName ? updateUser.lastName : ""}
                  name="lastName"
                  onChange={handleChange}
                />
              </FormControl>
              <FormControl mt={4}>
                <FormLabel>Email</FormLabel>
                <Input
                  placeholder="Email"
                  value={updateUser.email ? updateUser.email : ""}
                  name="email"
                  onChange={handleChange}
                />
              </FormControl>
            </ModalBody>

            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={updateBtn}>
                Update
              </Button>
              <Button onClick={onClose}>Cancel</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Box>
    </>
  );
};
export default UserList;
