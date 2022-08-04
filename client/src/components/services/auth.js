import { useNavigate } from "react-router-dom";

const navigate = useNavigate;

export const useLogin = () => {
  // const login = localStorage.getItem("token");
  // console.log(login);
  navigate("/login");
};

export const useLogout = () => {
  const logout = () => {
    // localStorage.removeItem("token");
    localStorage.clear();
    navigate("/login");
  };
  return logout;
};
