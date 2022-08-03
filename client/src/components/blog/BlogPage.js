import { Button, Container, Flex, Text } from "@chakra-ui/react";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

function BlogPage() {
  const location = useLocation();
  //   const { from } = location.state;
  const navigate = useNavigate();
  console.log(location);
  return (
    <>
      <Flex>
        <Button onClick={() => navigate(-1)}>Back</Button>
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
