import { Box, Button, VStack } from "@chakra-ui/react";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <Box bg="#dfdfdf" h="100%" minH="100vh" p={5} left={0} top={0}>
      <VStack>
        <Button w="100%">
          <NavLink pr="3" to="/home">
            Home
          </NavLink>
        </Button>
        <Button w="100%">
          <NavLink pr="3" to="/user">
            User
          </NavLink>
        </Button>
        <Button w="100%">
          <NavLink pr="3" to="/quill">
            Quill Text
          </NavLink>
        </Button>
      </VStack>
    </Box>
  );
};

export default Sidebar;
