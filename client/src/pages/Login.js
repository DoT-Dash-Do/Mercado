import axios from "axios";
import { House } from "phosphor-react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [buyerEmail, setBuyerEmail] = useState("");
  const [sellerEmail, setSellerEmail] = useState("");

  const [buyerPassword, setBuyerPassword] = useState("");
  const [sellerPassword, setSellerPassword] = useState("");

  const [formShift, setFormShift] = useState(false);

  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleRegisterNav = () => {
    navigate("/register");
  };

  const handleSellerLogin = (e) => {
    e.preventDefault();
    console.log("working seller");
  };

  const handleUserLogin = async (e) => {
    e.preventDefault();

    //email
    if (buyerEmail === null || buyerEmail === undefined || buyerEmail === "") {
      setError("Please provide an email");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(buyerEmail)) {
      setError("Enter a valid email");
      return;
    }

    //password
    if (
      buyerPassword === null ||
      buyerPassword === undefined ||
      buyerPassword === ""
    ) {
      setError("Please enter a password");
      return;
    }

    if (buyerPassword.length < 8 || buyerPassword.length > 20) {
      setError("Password must be 8-20 characters long");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:3003/api/user/login",
        {
          email: buyerEmail,
          password: buyerPassword,
        }
      );
      if (response.data.success === false) {
        setError(response.data.message);
        return;
      }
      window.localStorage.setItem("token", response.data.token);
      window.localStorage.setItem("type", response.data.type);
    } catch (err) {
      setError(err.response.data.message);
      return;
    }

    navigate("/");
  };

  const handleValueChangeBuyer = () => {
    setFormShift(false);
  };

  const handleValueChangeSeller = () => {
    setFormShift(true);
  };

  const handleHomeNav = () => {
    navigate("/");
  };

  return (
    <div className="block lg:flex w-full h-screen">
      <div
        onClick={handleHomeNav}
        className="w-full bg-[#121212] h-16 text-white fixed top-0 lg:hidden flex items-center justify-center px-4"
      >
        <div className="text-3xl tracking-widest text-gray-100 select-none cursor-pointer">
          MERCADO
        </div>
      </div>
      <div className="bg-[#121212] w-1/3 h-full text-white hidden lg:flex flex-col items-center justify-center font-semibold select-none">
        <div
          onClick={handleHomeNav}
          className="absolute top-8 left-8 p-2 hover:bg-[#323232] rounded-full cursor-pointer"
        >
          <House size={32} />
        </div>

        <div className="mb-4 text-6xl tracking-widest text-gray-100">
          MERCADO
        </div>

        <div className="text-base tracking-normal absolute bottom-20">
          Do not have an account ?{" "}
          <span
            onClick={handleRegisterNav}
            className="cursor-pointer text-[#df94ff] underline text-lg"
          >
            Register
          </span>
        </div>
      </div>
      <div className="bg-[#1f1f1f] w-full lg:w-2/3 px-4 md:px-0 flex flex-col items-center justify-center text-white h-full">
        <h1 className="select-none text-3xl p-2 rounded-lg">LOGIN</h1>

        <div className="flex flex-col items-center bg-[#282828] rounded-lg border-gray-400 w-full md:w-3/4 xl:w-1/2 p-2 py-4 md:p-4">
          {/* FORM NAVBAR */}
          <div className="flex border-2 border-gray-400 select-none text-sm md:text-base mb-4 rounded-lg">
            <div
              onClick={handleValueChangeBuyer}
              className={`w-24 md:w-32 text-center ${
                !formShift && "bg-[#df94ff] text-black"
              } p-2 hover:bg-[#323232] cursor-pointer font-semibold rounded-l-md hover:text-white`}
            >
              User
            </div>
            <div
              onClick={handleValueChangeSeller}
              className={`w-24 md:w-32 text-center p-2 font-semibold hover:bg-[#323232] ${
                formShift && "bg-[#df94ff] text-black"
              } cursor-pointer rounded-r-md hover:text-white`}
            >
              Seller
            </div>
          </div>
          <div className="text-xs mb-4 md:text-sm block lg:hidden xl:text-base tracking-normal">
            Do not have an account ?{" "}
            <span
              onClick={handleRegisterNav}
              className="cursor-pointer text-[#df94ff] underline text-base md:text-lg"
            >
              Register
            </span>
          </div>
          {/* FORM NUMBER 1 */}
          {!formShift && (
            <form
              className="w-full rounded-lg p-1 md:p-8"
              onSubmit={handleUserLogin}
            >
              <label
                htmlFor="email"
                className="text-base md:text-lg select-none tracking-wider ml-1"
              >
                Email
              </label>
              <input
                className="text-sm md:text-base w-full text-white mb-4 outline-none p-2 rounded-md placeholder-gray-400 bg-[#222222] focus:scale-[1.03] transition duration-150"
                id="email"
                type="text"
                placeholder="Enter your email"
                value={buyerEmail}
                onChange={(e) => {
                  setBuyerEmail(e.target.value);
                }}
                autoComplete="off"
              />
              <label
                htmlFor="password"
                className="text-base md:text-lg select-none tracking-wider ml-1"
              >
                Password
              </label>
              <input
                className="text-sm md:text-base w-full text-white mb-4 outline-none p-2 rounded-md placeholder-gray-400 bg-[#222222] focus:scale-[1.03] transition duration-150"
                id="password"
                type="password"
                placeholder="Enter your password"
                value={buyerPassword}
                onChange={(e) => {
                  setBuyerPassword(e.target.value);
                }}
                autoComplete="off"
              />

              <div className="w-full flex justify-center mt-4">
                <button className="text-sm md:text-base font-semibold text-[#df94ff] border-2 border-[#df94ff] hover:bg-[#df94ff] hover:text-black p-2 px-6 md:px-8 rounded-md tracking-wide">
                  Submit
                </button>
              </div>
            </form>
          )}

          {/* SECOND FORM FOR SELLER */}

          {formShift && (
            <form
              className="w-full rounded-lg p-1 md:p-8"
              onSubmit={handleSellerLogin}
            >
              <label
                htmlFor="email"
                className="text-base md:text-lg select-none tracking-wider ml-1"
              >
                Email
              </label>
              <input
                className="text-sm md:text-base w-full text-white mb-4 outline-none p-2 rounded-md placeholder-gray-400 bg-[#222222] focus:scale-[1.03] transition duration-150"
                id="email"
                type="text"
                placeholder="Enter your email"
                value={sellerEmail}
                onChange={(e) => {
                  setSellerEmail(e.target.value);
                }}
                autoComplete="off"
              />
              <label
                htmlFor="password"
                className="text-base md:text-lg select-none tracking-wider ml-1"
              >
                Password
              </label>
              <input
                className="text-sm md:text-base w-full text-white mb-4 outline-none p-2 rounded-md placeholder-gray-400 bg-[#222222] focus:scale-[1.03] transition duration-150"
                id="password"
                type="password"
                placeholder="Enter your password"
                value={sellerPassword}
                onChange={(e) => {
                  setSellerPassword(e.taSget.value);
                }}
                autoComplete="off"
              />

              <div className="w-full flex justify-center mt-4">
                <button className="text-sm md:text-base font-semibold text-[#df94ff] border-2 border-[#df94ff] hover:bg-[#df94ff] hover:text-black p-2 px-6 md:px-8 rounded-md tracking-wide">
                  Submit
                </button>
              </div>
            </form>
          )}
        </div>

        {error && (
          <div className="fixed bottom-14 bg-gray-200 text-black p-2 text-sm md:text-base font-semibold text-center rounded-lg">
            {error}
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;
