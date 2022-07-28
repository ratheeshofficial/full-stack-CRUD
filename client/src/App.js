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

function App() {
  return (
    <div className="App">
      <Stack direction={["column", "row"]} spacing="24px">
        <Router>
          <Box w="15%">
            <Sidebar />
          </Box>
          <Box w="85%">
            <Box my={5}>
              <Navbar />
            </Box>
            <Routes>
              <Route path="/" element={<SignupForm />} />
              <Route path="/signup" element={<SignupForm />} />
              <Route path="/login" element={<Login />} />
              <Route path="/user" element={<UserList />} />
              <Route path="/home" element={<BlogList />} />
              <Route path="/blogform" element={<BlogForm />} />
            </Routes>
          </Box>
          {/* <SignupForm /> */}
        </Router>
      </Stack>
    </div>
  );
}

export default App;
