import { Receipt, ShoppingCartSimple } from "phosphor-react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Navbar = ({ loggedIn, profilePic, setToken, setProfilePic }) => {
  const navigate = useNavigate();
  const [menuBar, setMenuBar] = useState(false);
  const [displayPP, setDisplayPP] = useState(
    "https://i.pinimg.com/736x/83/bc/8b/83bc8b88cf6bc4b4e04d153a418cde62.jpg"
  );

  useEffect(() => {
    console.log("working");
    if (profilePic !== null) {
      setDisplayPP(profilePic);
    } else {
      setDisplayPP(
        "https://i.pinimg.com/736x/83/bc/8b/83bc8b88cf6bc4b4e04d153a418cde62.jpg"
      );
    }
  }, [profilePic]);

  const handleLoginNav = () => {
    navigate("/login");
  };

  const handleRegisterNav = () => {
    navigate("/register");
  };

  const handleProfileNav = () => {
    if (!loggedIn) {
      navigate("login");
    } else {
      navigate("/profile");
    }
  };

  const handleHomeNav = () => {
    navigate("/");
  };

  const handleMenuBar = () => {
    setMenuBar(!menuBar);
  };

  const handleLogoutNav = () => {
    setToken("");
    setProfilePic(null);
    window.localStorage.removeItem("token");
    window.localStorage.removeItem("type");
    navigate("/login");
  };
  const openCart =()=>{
    navigate("/cart")
  }
  return (
    <>
      <div className="fixed top-0 z-50 w-full h-16 bg-[#121212] text-white select-none flex justify-between text-base">
        <div className="flex justify-center h-full items-center">
          {/* LEFT DIV */}
          <div
            onClick={handleHomeNav}
            className="w-40 sm:w-48 h-full text-2xl sm:text-3xl flex justify-center items-center cursor-pointer"
          >
            <h1>Mercado</h1>
          </div>
        </div>
        {/* RIGHT DIV */}
        <div className="md:flex hidden">
          <div
            onClick={handleProfileNav}
            className="w-16 flex items-center justify-center border-gray-400 text-xl cursor-pointer hover:bg-[#323232]"
          >
            <div className="w-10 h-10 sm:w-10 sm:h-10 rounded-full border-gray-400 text-xl">
              <img
                className="rounded-full w-full h-full object-cover"
                src={displayPP}
                alt="Img"
              />
            </div>
          </div>
          {loggedIn && (
            <>
              <div
                title="Orders"
                className="w-16 flex justify-center items-center cursor-pointer hover:bg-[#323232]"
              >
                <Receipt size={24} />
              </div>

              <div
                title="Cart"
                className="w-16 flex justify-center items-center cursor-pointer hover:bg-[#323232]"
                onClick={()=>openCart()}
              >
                <ShoppingCartSimple size={24} />
              </div>
            </>
          )}

          {!loggedIn && (
            <div className="flex w-48 p-3 rounded-lg">
              <div
                onClick={handleLoginNav}
                className="w-24 flex justify-center items-center cursor-pointer hover:bg-[#323232] rounded-md"
              >
                Login
              </div>
              <div
                onClick={handleRegisterNav}
                className="w-24 flex justify-center items-center cursor-pointer hover:bg-[#323232] rounded-md"
              >
                Register
              </div>
            </div>
          )}
          {loggedIn && (
            <div className="flex w-28 p-3 rounded-lg">
              <div
                onClick={handleLogoutNav}
                className="w-24 flex justify-center items-center cursor-pointer hover:bg-[#323232] rounded-md"
              >
                Logout
              </div>
            </div>
          )}
        </div>

        {/* MENUBAR ICON */}
        <div className="md:hidden flex justify-center items-center select-none">
          <div
            onClick={handleMenuBar}
            className="w-16 h-16 flex justify-center items-center cursor-pointer hover:bg-[#323232] text-white"
          >
            <div className="w-10 h-10 sm:w-10 sm:h-10 rounded-full border-gray-400 text-xl">
              <img
                className="rounded-full w-full h-full object-cover"
                src={displayPP}
                alt="Img"
              />
            </div>
          </div>
        </div>

        {/* MENUBAR */}
      </div>
      {menuBar && (
        <div className="fixed md:hidden right-0 top-16 w-48 bg-[#121212] text-white rounded-bl-lg z-50 shadow-sm shadow-gray-600">
          {" "}
          <div
            title="Profile"
            onClick={handleProfileNav}
            className="w-full h-10 flex justify-center items-center cursor-pointer hover:bg-[#323232]"
          >
            Profile
          </div>
          {!loggedIn && (
            <>
              {" "}
              <div
                onClick={handleLoginNav}
                title="Login"
                className="w-full h-10 flex justify-center items-center cursor-pointer hover:bg-[#323232]"
              >
                Login
              </div>
              <div
                onClick={handleRegisterNav}
                title="Register"
                className="w-full h-10 flex justify-center items-center cursor-pointer hover:bg-[#323232]"
              >
                Register
              </div>{" "}
            </>
          )}
          {loggedIn && (
            <>
              <div
                title="Orders"
                className="w-full h-10 flex justify-center items-center cursor-pointer hover:bg-[#323232]"
              >
                Orders
              </div>
              <div
                title="Cart"
                className="w-full h-10 flex justify-center items-center cursor-pointer hover:bg-[#323232]"
              >
                Cart
              </div>
              <div
                onClick={handleLogoutNav}
                title="Register"
                className="w-full h-10 flex justify-center items-center cursor-pointer hover:bg-[#323232] rounded-bl-md"
              >
                Logout
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
};

export default Navbar;
