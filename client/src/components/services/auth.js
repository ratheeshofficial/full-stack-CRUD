import { useNavigate } from "react-router-dom";

// export const useAuth = () => {
//   const auth = localStorage.getItem("auth");
//   console.log(auth);
// };

export const useLogout = () => {
  const navigate = useNavigate;
  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };
  return logout;
};
