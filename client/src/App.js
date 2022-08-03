import React from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import SignupForm from "./components/auth/Signup";
import UserList from "./components/auth/UserList";
import { BrowserRouter as Router } from "react-router-dom";
import Login from "./components/auth/Login";
import BlogForm from "./components/blog/BlogForm";
import BlogList from "./components/blog/BlogList";
import BlogPage from "./components/blog/BlogPage";
import ViewBlog from "./components/pages/viewer/ViewBlog";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<ViewBlog />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignupForm />} />
          <Route path="/user" element={<UserList />} />
          <Route path="/home" element={<BlogList />} />
          <Route path="/blogform" element={<BlogForm />} />
          <Route path="/blogPage" element={<BlogPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
