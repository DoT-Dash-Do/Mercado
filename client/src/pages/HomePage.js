import React from "react";
import Navbar from "../components/Navbar";

const HomePage = ({ loggedIn }) => {
  return (
    <div>
      <Navbar loggedIn={loggedIn} />
      HomePage
    </div>
  );
};

export default HomePage;
