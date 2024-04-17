import axios from "axios";
import { useEffect, useState } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Register from "./pages/Register";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const token = window.localStorage.getItem("token");

  //checking the validity of the user
  useEffect(() => {
    const fetchValidity = async () => {
      try {
        await axios.post("http://localhost:3003/api/user/user-validity", {
          token,
        });
        setLoggedIn(true);
      } catch (err) {
        setLoggedIn(false);
      }
    };
    fetchValidity();
  }, []);

  //implementation of navbar on selected pages is left.
  //navbar will be loaded only once

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<HomePage loggedIn={loggedIn} />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
