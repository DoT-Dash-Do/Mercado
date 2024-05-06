import React from "react";
import { useNavigate } from "react-router-dom";

const PageNotFound = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate("/");
  };

  return (
    <div className="w-full h-screen bg-[#1f1f1f] p-8 text-white flex flex-col justify-center items-center select-none">
      <h1 className="text-9xl text-[#df94ff] mb-4 text-center border-b-4 border-[#df94ff] rounded-lg font-light">
        ERROR 404
      </h1>
      <h1 className="text-4xl text-center mb-4 rounded-md p-2 font-semibold tracking-wider">
        Page Not Found
      </h1>

      <p className="text-lg text-center mb-8">
        Slow down howdy boy, you are trespassing to unknown pages.
      </p>

      <div
        onClick={handleBack}
        className="p-2 text-lg font-semibold text-[#df94ff] border-2 border-[#df94ff] hover:bg-[#df94ff] hover:text-black rounded-md cursor-pointer"
      >
        Move Back
      </div>
    </div>
  );
};

export default PageNotFound;
