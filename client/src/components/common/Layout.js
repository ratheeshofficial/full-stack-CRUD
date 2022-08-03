import { Box, Flex } from "@chakra-ui/react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

const Layout = ({ children }) => {
  return (
    <>
      <Flex>
        <Box w="15%">
          <Sidebar />
        </Box>
        <Box w="85%">
          <Box my={5}>
            <Navbar />
            {children}
          </Box>
        </Box>
      </Flex>
    </>
  );
};

export default Layout;
