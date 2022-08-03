import { useNavigate } from "react-router-dom";

const navigate = useNavigate();

export const BackBtn = () => {
  navigate(-1);
};
