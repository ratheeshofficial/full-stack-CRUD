import React from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import SignupForm from "./components/auth/Signup";
import Navbar from "./components/common/Navbar";
import UserList from "./components/auth/UserList";
import { BrowserRouter as Router } from "react-router-dom";
import Login from "./components/auth/Login";

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<SignupForm />} />
          <Route path="/signup" element={<SignupForm />} />
          <Route path="/login" element={<Login />} />
          <Route path="/user" element={<UserList />} />
        </Routes>
        {/* <SignupForm /> */}
      </Router>
    </div>
  );
}

export default App;
