import {
  Box,
  Button,
  Container,
  Flex,
  Input,
  Text,
  Textarea,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { BackBtn } from "../common/BackBtn";
import { FcLikePlaceholder, FcLike } from "react-icons/fc";
import { HiReply } from "react-icons/hi";

function BlogPage() {
  const location = useLocation();
  const navigate = useNavigate();
  //   const { from } = location.state;
  // console.log(location);
  const [count, setCount] = useState(0);
  const [discussionValue, setDiscussionValue] = useState("");
  // console.log(discussionValue);
  const [discussionPost, setDiscussionPost] = useState([]);
  // console.log(discussionPost);

  const [reply, setReply] = useState(false);

  const [replyBtnName, setReplyBtnName] = useState("");

  const [replyInputText, setReplyInputText] = useState("");
  // console.log(replyInputText);

  const [replyInputPost, setReplyInputPost] = useState([]);
  // console.log(replyInputPost);

  const [heartIcon, setHeartIcon] = useState(false);
  const [likeKeyvalue, setLikeKeyValue] = useState("");

  // const handleLike = () => {
  //   const token = localStorage.getItem("token");
  //   console.log(token);
  //   if (!token) {
  //     navigate("/login");
  //   } else {
  //     setCount(count + 1);
  //   }
  // };

  const likeButton = (e, key) => {
    setLikeKeyValue(key);

    setHeartIcon(heartIcon ? false : true);
  };

  const postBtn = () => {
    setDiscussionPost([...discussionPost, discussionValue]);
    setDiscussionValue("");
  };

  const handleChange = (e) => {
    const { value } = e.target;
    // console.log(value);
    setDiscussionValue(value);
  };

  const replyBtn = (e, value) => {
    setReplyBtnName(e.target.name);
    if (reply === false && e.target.name === value) {
      console.log("))))))))))))))))))");
      setReply(reply ? false : true);
    } else {
      console.log("CONSOLE");
      setReply(reply ? true : false);
    }
  };

  const replyInputChange = (e) => {
    const { value } = e.target;
    // console.log(value);
    setReplyInputText(value);
  };

  const replyCommentPostBtn = () => {
    setReplyInputPost([...replyInputPost, replyInputText]);
    setReplyInputText("");
  };

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
          {/* <Box>
            {count}
            <Box>
              <BsHandThumbsUpFill cursor="pointer" onClick={handleLike} />
            </Box>
          </Box> */}
        </Container>
      </Flex>
      <Container maxW="container.sm">
        <Text fontWeight="bold" mb="3">
          Discussion
        </Text>
        <Textarea
          name="name"
          type="text"
          value={discussionValue}
          mb="3"
          placeholder="Add to the discussion"
          onChange={handleChange}
        />
        <Box textAlign="right">
          <Button colorScheme="blue" size="sm" onClick={postBtn}>
            Post
          </Button>
        </Box>
        <Box>
          {discussionPost.length > 0 &&
            discussionPost.map((value, key) => (
              <Box boxShadow="md" p="5">
                <Text key={key}>{value}</Text>
                <Flex>
                  <Box style={{ display: "flex", justifyContent: "center" }}>
                    {key === likeKeyvalue && heartIcon ? (
                      <FcLike key={key} size={20} />
                    ) : (
                      <FcLikePlaceholder key={key} size={20} />
                    )}
                    <Button
                      h="25"
                      p="2"
                      ml="1"
                      fontSize="xs"
                      mr="3"
                      name={key}
                      cursor="pointer"
                      onClick={(e) => likeButton(e, key)}
                    >
                      {key === likeKeyvalue && heartIcon ? "unLike" : "Like"}
                    </Button>
                  </Box>
                  <Box style={{ display: "flex", justifyContent: "center" }}>
                    <HiReply size={20} />
                    <Button
                      // value={replyBtnName}
                      h="25"
                      p="2"
                      ml="1"
                      name={value}
                      fontSize="xs"
                      mr="3"
                      cursor="pointer"
                      onClick={(e) => replyBtn(e, value)}
                    >
                      Reply
                    </Button>
                  </Box>
                </Flex>
                <Box>
                  {value === replyBtnName && reply ? (
                    <Box>
                      <Input
                        type="text"
                        value={replyInputText}
                        name={key}
                        ml="5"
                        mt="2"
                        mr="2"
                        w="50"
                        onChange={replyInputChange}
                      />
                      <Button fontSize="xs" onClick={replyCommentPostBtn}>
                        post
                      </Button>
                      <Box>
                        {replyInputPost.length > 0 &&
                          value === replyBtnName &&
                          replyInputPost.map((inputValue, key) => {
                            return <Text key={key}>{inputValue}</Text>;
                          })}
                      </Box>
                    </Box>
                  ) : (
                    ""
                  )}
                </Box>
              </Box>
            ))}
        </Box>
      </Container>
    </>
  );
}

export default BlogPage;
