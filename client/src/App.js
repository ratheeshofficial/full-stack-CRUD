import React from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import SignupForm from "./components/auth/Signup";
import Navbar from "./components/common/Navbar";
import UserList from "./components/auth/UserList";
import { BrowserRouter as Router } from "react-router-dom";
import Login from "./components/auth/Login";
import { Box, Stack } from "@chakra-ui/react";
import Sidebar from "./components/common/Sidebar";
import BlogForm from "./components/blog/BlogForm";
import BlogList from "./components/blog/BlogList";
import ProtectedRoute from "./components/pages/ProtectedRoute";

function App() {
  return (
    <div className="App">
      <Stack direction={["column", "row"]} spacing="24px">
        <Router>
          <Routes>
            {/* <ProtectedRoute path="/" element={<Login />} auth={true} /> */}
            <Route path="/" element={<Login />} />
            <Route path="/signup" element={<SignupForm />} />
            <Route path="/login" element={<Login />} />
            <Route path="/user" element={<UserList />} />
            <Route path="/home" element={<BlogList />} />
            <Route path="/blogform" element={<BlogForm />} />
          </Routes>
          {/* <Box w="15%">
            <Sidebar />
          </Box>
          <Box w="85%">
            <Box my={5}>
              <Navbar />
            </Box>
            
          </Box> */}
          {/* <SignupForm /> */}
        </Router>
      </Stack>
    </div>
  );
}

export default App;
