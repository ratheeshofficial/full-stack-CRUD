import { Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { IoMdArrowRoundBack } from "react-icons/io";

export const BackBtn = () => {
  const navigate = useNavigate();

  return (
    <Button bg="blue.100" onClick={() => navigate(-1)}>
      <IoMdArrowRoundBack fontSize="1.5em" />
    </Button>
  );
};
