import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const MaybeShowNav = ({ children }) => {
  const location = useLocation();

  const [showNavbar, setShowNavbar] = useState(true);

  useEffect(() => {
    if (location.pathname.startsWith("/login") || location.pathname === "/register") {
      setShowNavbar(false);
    } else {
      setShowNavbar(true);
    }
  }, [location]);
  return <div>{showNavbar && children}</div>;
};

export default MaybeShowNav;
