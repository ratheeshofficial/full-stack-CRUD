import { Box, Container, Flex, Text } from "@chakra-ui/react";
import React from "react";
import { useLocation } from "react-router-dom";
import { BackBtn } from "../common/BackBtn";

function BlogPage() {
  const location = useLocation();
  //   const { from } = location.state;
  // console.log(location);
  return (
    <>
      <Flex>
        {/* <Button onClick={() => navigate(-1)}>Back</Button> */}
        <Box ml="5" mt="5">
          <BackBtn />
        </Box>
        <Container my="4">
          <Text textAlign="center" fontWeight="bold" fontSize="5xl">
            {location.state.blogTitle}
          </Text>
          <Text textAlign="center" fontWeight="light" fontSize="2xl">
            {location.state.blogMessage}
          </Text>
        </Container>
      </Flex>
    </>
  );
}

export default BlogPage;
