import React from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import SignupForm from "./components/auth/Signup";
import UserList from "./components/auth/UserList";
import Login from "./components/auth/Login";
import BlogForm from "./components/blog/BlogForm";
import BlogList from "./components/blog/BlogList";
import BlogPage from "./components/blog/BlogPage";
import ViewBlog from "./components/pages/viewer/ViewBlog";
import QuillTextEditor from "./components/common/QuillTextEditor";

function App() {
  // useEffect(() => {
  //   if (!window.localStorage.getItem("token")) {
  //     navigate("/");
  //   }
  // }, []);

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<ViewBlog />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignupForm />} />
        <Route path="/user" element={<UserList />} />
        <Route path="/home" element={<BlogList />} />
        <Route path="/blogform" element={<BlogForm />} />
        <Route path="/blogPage" element={<BlogPage />} />
        <Route path="/quill" element={<QuillTextEditor />} />
      </Routes>
    </div>
  );
}

export default App;
