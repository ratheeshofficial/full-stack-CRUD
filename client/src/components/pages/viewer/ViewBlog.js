import {
  Button,
  Flex,
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
import { GrView } from "react-icons/gr";
import { React, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Layout from "../../common/Layout";

const ViewBlog = () => {
  const [blogdetails, setBlogDetails] = useState([]);
  // console.log(blogdetails);

  const navigate = useNavigate();

  useEffect(() => {
    if (blogdetails) {
      axios.get("http://localhost:3000/api/blog/get").then((res) => {
        setBlogDetails(res.data);
      });
    }
  }, []);
  return (
    <Layout>
      <Text
        textAlign="center"
        fontSize="4xl"
        mb={5}
        textDecoration="underline"
        fontWeight="extrabold"
      >
        Articles
      </Text>

      <Flex justifyContent="center">
        {/* <Button onClick={() => navigate(-1)}>Back</Button> */}
        <TableContainer w="50%">
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>Title</Th>

                <Th>View</Th>
              </Tr>
            </Thead>
            <Tbody>
              {blogdetails.map((data, key) => {
                return (
                  <Tr key={key + 1}>
                    {/* <Link to="/blogPage" state={{ from: blogData }}>
                      {data.blogTitle}
                    </Link> */}
                    <Td>{data.blogTitle}</Td>

                    <Td>
                      <Link to="/blogPage" state={data}>
                        <GrView color="#b50505de" cursor="pointer" />
                      </Link>
                    </Td>
                  </Tr>
                );
              })}
            </Tbody>
          </Table>
        </TableContainer>
      </Flex>
    </Layout>
  );
};

export default ViewBlog;
