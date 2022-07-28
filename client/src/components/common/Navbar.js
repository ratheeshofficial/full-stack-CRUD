import {
  Box,
  Button,
  ButtonGroup,
  Flex,
  Heading,
  Spacer,
} from "@chakra-ui/react";
import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <Flex pos="sticky">
      <Box p="2">
        <Heading size="md">
          <NavLink to="/">Web App</NavLink>
        </Heading>
      </Box>
      <Spacer />
      <Box mr="3">
        <ButtonGroup gap="2">
          <Button>
            <NavLink pr="3" to="/signup">
              Sign Up
            </NavLink>
          </Button>
          <Button>
            <NavLink pr="3" to="/login">
              Login
            </NavLink>
          </Button>
        </ButtonGroup>
      </Box>
    </Flex>
  );
};

export default Navbar;
