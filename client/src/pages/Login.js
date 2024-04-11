import { House } from "phosphor-react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [buyerUsername, setBuyerUsername] = useState("");
  const [supplierUsername, setSupplierUsername] = useState("");

  const [buyerPassword, setBuyerPassword] = useState("");
  const [supplierPassword, setSupplierPassword] = useState("");

  const [formShift, setFormShift] = useState(false);

  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleRegisterNav = () => {
    navigate("/register");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("working");
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
    <div className="flex w-full h-screen">
      <div className="bg-[#121212] w-1/3 h-full text-white flex flex-col items-center justify-center font-semibold select-none">
        <div
          onClick={handleHomeNav}
          className="absolute top-8 left-8 p-2 hover:bg-gray-700 rounded-full cursor-pointer"
        >
          <House size={32} />
        </div>

        <div className="mb-4 text-6xl tracking-widest text-gray-100">
          MERCADO
        </div>

        <div className="text-base tracking-normal absolute bottom-20">
          Donot have an account ?{" "}
          <span
            onClick={handleRegisterNav}
            className="cursor-pointer text-[#df94ff] underline text-lg"
          >
            Register
          </span>
        </div>
      </div>
      <div className="bg-[#1f1f1f] w-2/3 flex flex-col items-center justify-center text-white h-full">
        <h1 className="select-none absolute top-24 text-3xl p-2 rounded-lg">
          LOGIN
        </h1>

        <div className="flex flex-col items-center border-2 rounded-lg border-gray-400 w-1/2 p-4">
          {/* FORM NAVBAR */}
          <div className="flex border-2 border-gray-400 select-none text-base mb-4 rounded-lg">
            <div
              onClick={handleValueChangeBuyer}
              // className="w-32 text-center p-2 hover:bg-gray-700 cursor-pointer rounded-l-lg
              className={`w-32 text-center ${
                !formShift && "bg-[#df94ff] text-black"
              } p-2 hover:bg-gray-700 cursor-pointer font-semibold rounded-l-md hover:text-white`}
            >
              User
            </div>
            <div
              onClick={handleValueChangeSeller}
              className={`w-32 text-center p-2 font-semibold hover:bg-gray-700 ${
                formShift && "bg-[#df94ff] text-black"
              } cursor-pointer rounded-r-md hover:text-white`}
            >
              Supplier
            </div>
          </div>
          {/* FORM NUMBER 1 */}
          {!formShift && (
            <form className="w-full rounded-lg p-8" onSubmit={handleSubmit}>
              {/* <h1 className="text-center text-lg mb-6 rounded-md select-none">
                Login as{" "}
                <span className="font-semibold text-xl text-[#df94ff]">
                  USER
                </span>
              </h1> */}
              <label
                htmlFor="username"
                className="text-lg select-none tracking-wider"
              >
                Username
              </label>
              <input
                className="w-full text-white mb-4 outline-none p-2 rounded-md placeholder-gray-400 bg-[#2e2e2e] focus:scale-[1.03] transition duration-150"
                id="username"
                type="text"
                placeholder="Enter your username"
                value={buyerUsername}
                onChange={(e) => {
                  setBuyerUsername(e.target.value);
                }}
                autoComplete="off"
              />
              <label
                htmlFor="password"
                className="text-lg select-none tracking-wider"
              >
                Password
              </label>
              <input
                className="w-full text-white mb-4 outline-none p-2 rounded-md placeholder-gray-400 bg-[#2e2e2e] focus:scale-[1.03] transition duration-150"
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
                <button className="text-base font-semibold text-[#df94ff] border-2 border-[#df94ff] hover:bg-[#df94ff] hover:text-black p-2 px-8 rounded-md tracking-wide">
                  Submit
                </button>
              </div>
            </form>
          )}

          {/* SECOND FORM FOR SUPPLIER */}

          {formShift && (
            <form className="w-full rounded-lg p-8" onSubmit={handleSubmit}>
              {/* <h1 className="text-center text-lg mb-6 rounded-md select-none">
                Login as{" "}
                <span className="font-semibold text-xl text-[#df94ff]">
                  SUPPLIER
                </span>
              </h1> */}
              <label
                htmlFor="username"
                className="text-lg select-none tracking-wider"
              >
                Username
              </label>
              <input
                className="w-full text-white mb-4 outline-none p-2 rounded-md placeholder-gray-400 bg-[#2e2e2e] focus:scale-[1.03] transition duration-150"
                id="username"
                type="text"
                placeholder="Enter your username"
                value={supplierUsername}
                onChange={(e) => {
                  setSupplierUsername(e.target.value);
                }}
                autoComplete="off"
              />
              <label
                htmlFor="password"
                className="text-lg select-none tracking-wider"
              >
                Password
              </label>
              <input
                className="w-full text-white mb-4 outline-none p-2 rounded-md placeholder-gray-400 bg-[#2e2e2e] focus:scale-[1.03] transition duration-150"
                id="password"
                type="password"
                placeholder="Enter your password"
                value={supplierPassword}
                onChange={(e) => {
                  setSupplierPassword(e.target.value);
                }}
                autoComplete="off"
              />

              <div className="w-full flex justify-center mt-4">
                <button className="text-base font-semibold text-[#df94ff] border-2 border-[#df94ff] hover:bg-[#df94ff] hover:text-black p-2 px-8 rounded-md tracking-wide">
                  Submit
                </button>
              </div>
            </form>
          )}
        </div>

        {error && (
          <div className="fixed bottom-16 bg-gray-200 text-black p-2 text-base font-semibold text-center rounded-lg">
            {error}
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;
