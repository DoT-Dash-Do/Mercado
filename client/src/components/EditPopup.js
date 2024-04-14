import React, { useState } from "react";

const EditPopup = ({ popVisible, setPopupVisible, popPlaceholder }) => {
  const [newUsername, setNewUsername] = useState("");

  const handleCross = () => {
    console.log(popVisible);
    setPopupVisible(!popVisible);
  };

  const handleSave = () => {
    console.log(newUsername);
  };

  return (
    <div className="fixed top-0 w-full h-screen z-20 flex justify-center items-center p-4 bg-black bg-opacity-75 backdrop-blur-sm">
      <div className="bg-[#282828] p-2 py-6 md:py-6 md:p-6 text-white w-full md:w-3/4 xl:w-5/12 rounded-lg">
        <div className="w-full flex justify-center items-center text-xl md:text-2xl mb-6">
          <h1>Update {popPlaceholder}</h1>
        </div>

        {/* LABEL */}
        <div className="text-sm sm:text-base md:text-lg">
          <label htmlFor="email" className=" select-none tracking-wider ml-2">
            {popPlaceholder}
          </label>
          <input
            className="w-full text-white mb-4 mt-2 outline-none p-2 rounded-md placeholder-gray-400 bg-[#222222] focus:scale-[1.03] transition duration-150"
            id="email"
            type="text"
            placeholder={`Enter new ${popPlaceholder}`}
            value={newUsername}
            onChange={(e) => {
              setNewUsername(e.target.value);
            }}
            autoComplete="off"
          />
        </div>

        {/* SAVE AND CANCEL */}

        <div className="flex justify-between select-none mt-4 ">
          <div
            className="p-2 w-20 sm:w-28 flex justify-center items-center rounded-lg cursor-pointer border-2 border-[#323232] hover:bg-[#323232]"
            onClick={handleCross}
          >
            Cancel
          </div>
          <div
            onClick={handleSave}
            className="border-2 p-2 w-20 sm:w-28 flex justify-center items-center rounded-lg cursor-pointer text-[#df94ff] border-2 border-[#df94ff] hover:bg-[#df94ff] hover:text-black"
          >
            Save
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditPopup;
