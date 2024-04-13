import { Receipt, ShoppingCartSimple, User } from "phosphor-react";
import React from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLoginNav = () => {
    navigate("/login");
  };

  const handleRegisterNav = () => {
    navigate("/register");
  };

  const handleProfileNav = () => {
    navigate("/profile");
  };

  const handleHomeNav = () => {
    navigate("/");
  };

  return (
    <div className="fixed top-0 z-50 w-full h-16 bg-[#121212] text-white select-none flex justify-between text-base">
      <div className="flex justify-center h-full items-center">
        <div
          onClick={handleHomeNav}
          className="w-48 h-full text-3xl flex justify-center items-center cursor-pointer"
        >
          <h1>Mercado</h1>
        </div>
        <div className="w-12 h-12 rounded-full border-2 border-gray-400">
          <img
            className="rounded-full w-full h-full object-cover"
            src="https://i.pinimg.com/736x/83/bc/8b/83bc8b88cf6bc4b4e04d153a418cde62.jpg"
            alt="Img"
          />
        </div>
      </div>
      <div className="flex">
        <div
          title="Orders"
          className="w-16 flex justify-center items-center cursor-pointer hover:bg-[#323232]"
        >
          <Receipt size={24} />
        </div>
        <div
          title="Profile"
          onClick={handleProfileNav}
          className="w-16 flex justify-center items-center cursor-pointer hover:bg-[#323232]"
        >
          <User size={24} />
        </div>
        <div
          title="Cart"
          className="w-16 flex justify-center items-center cursor-pointer hover:bg-[#323232]"
        >
          <ShoppingCartSimple size={24} />
        </div>
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
      </div>
    </div>
  );
};

export default Navbar;
