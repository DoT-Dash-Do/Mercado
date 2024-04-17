import axios from "axios";
import React, { useState } from "react";

const PasswordPop = ({ passPop, setPassPop }) => {
  const [oldPass, setOldPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const token = window.localStorage.getItem("token");

  const handleCross = () => {
    setPassPop(!passPop);
  };

  const handleSave = async () => {
    try {
      //
      if (newPass === "" || confirmPass === "") {
        console.log("Please enter both new password and old password");
        return;
      }
      if (newPass !== confirmPass) {
        console.log("New password and old password do not match");
        return;
      }
      const response = await axios.put(
        "http://localhost:3003/api/user/updateUser/password",
        {
          token,
          updatedField: newPass,
          oldPassword: oldPass,
        }
      );

      console.log(response.data);

      setPassPop(!passPop);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="fixed top-0 w-full h-screen z-20 flex justify-center items-center p-4 bg-black bg-opacity-75 backdrop-blur-sm">
      <div className="bg-[#282828] p-2 py-6 md:py-6 md:p-6 text-white w-full md:w-3/4 xl:w-5/12 rounded-lg">
        <div className="w-full flex justify-center items-center text-xl md:text-2xl mb-6">
          <h1>Update Password</h1>
        </div>
        {/* LABEL */}
        <div className="text-sm sm:text-base md:text-lg">
          <div className="pb-2 border-b-2 border-[#4a4a4a]">
            <label
              htmlFor="oldPass"
              className="select-none tracking-wider ml-2"
            >
              Enter old password
            </label>
            <input
              className="w-full text-white mb-8 mt-2 outline-none p-2 rounded-md placeholder-gray-400 bg-[#222222] focus:scale-[1.03] transition duration-150"
              id="oldPass"
              type="password"
              value={oldPass}
              onChange={(e) => {
                setOldPass(e.target.value);
              }}
              autoComplete="off"
            />
          </div>

          <div className="pt-8">
            <label
              htmlFor="newPass"
              className="select-none tracking-wider ml-2"
            >
              Enter new password
            </label>
            <input
              className="w-full text-white mb-4 mt-2 outline-none p-2 rounded-md placeholder-gray-400 bg-[#222222] focus:scale-[1.03] transition duration-150"
              id="newPass"
              type="password"
              value={newPass}
              onChange={(e) => {
                setNewPass(e.target.value);
              }}
              autoComplete="off"
            />
            <label
              htmlFor="confirmPass"
              className="select-none tracking-wider ml-2"
            >
              Confirm new password
            </label>
            <input
              className="w-full text-white mb-4 mt-2 outline-none p-2 rounded-md placeholder-gray-400 bg-[#222222] focus:scale-[1.03] transition duration-150"
              id="confirmPass"
              type="password"
              value={confirmPass}
              onChange={(e) => {
                setConfirmPass(e.target.value);
              }}
              autoComplete="off"
            />
          </div>
        </div>

        {/* SAVE AND CANCEL */}

        <div className="flex justify-between select-none mt-4 text-sm md:text-base lg:text-lg">
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

export default PasswordPop;
