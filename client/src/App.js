import React, { useEffect, useState } from "react";
import Axios from "axios";
import "./App.css";

function App() {
  const [backendData, setBackendData] = useState([]);
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  // console.log(email, password);
  // console.log(backendData);

  const saveData = () => {
    Axios.post("http://localhost:3000/api/user", {
      emailKey: email,
      passwordKey: password,
    });
  };

  useEffect(() => {
    fetch("/api").then((res) =>
      res.json().then((data) => {
        setBackendData(data.users);
      })
    );
  }, []);
  return (
    <div className="App">
      {backendData.length > 0 &&
        backendData.map((user, i) => <p key={i}>{user}</p>)}
      {console.log(backendData)}

      <label>Enter Email</label>
      <input type="text" onChange={(e) => setEmail(e.target.value)} />
      <label>Enter Password</label>
      <input type="password" onChange={(e) => setPassword(e.target.value)} />
      <button onClick={saveData}>Enter</button>
    </div>
  );
}

export default App;
