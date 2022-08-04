import { Box, Button, Flex, Heading, Spacer } from "@chakra-ui/react";
import React from "react";
import { NavLink, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  // console.log(token);

  const login = () => {
    navigate("/login");
  };

  const logout = () => {
    const logout = localStorage.clear();
    console.log(logout, "logout");
    navigate("/login");
  };

  return (
    <Flex pos="sticky">
      <Box p="2">
        <Heading size="md">
          <NavLink to="#">Web App</NavLink>
        </Heading>
      </Box>
      <Spacer />
      <Box mr="3">
        {token !== null ? (
          <Button onClick={() => logout()}>Logout</Button>
        ) : (
          <Button onClick={() => login()}>Login</Button>
        )}
      </Box>
    </Flex>
  );
};

export default Navbar;
