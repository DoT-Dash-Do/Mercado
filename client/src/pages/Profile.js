import {
  ArrowLineDown,
  At,
  ClockCounterClockwise,
  Headset,
  Money,
  PencilSimple,
} from "phosphor-react";
import React, { useState } from "react";
import EditPopup from "../components/EditPopup";
import Navbar from "../components/Navbar";
import PasswordPop from "../components/PasswordPopup";

const Profile = () => {
  const [popVisible, setPopupVisible] = useState(false);
  const [popPlaceholder, setPopPlaceholder] = useState("");
  const [passPop, setPassPop] = useState("");

  const handleUsernamePopup = () => {
    setPopPlaceholder("Username");
    setPopupVisible(!popVisible);
  };

  const handlePhonePopup = () => {
    setPopPlaceholder("Phone Number");
    setPopupVisible(!popVisible);
  };

  const handlePasswordPopup = () => {
    setPassPop(!passPop);
  };

  return (
    <div>
      <Navbar />
      <div className="pt-16 bg-[#1f1f1f] h-screen flex text-white">
        {popVisible && (
          <EditPopup
            popVisible={popVisible}
            setPopupVisible={setPopupVisible}
            popPlaceholder={popPlaceholder}
          />
        )}
        {passPop && (
          <PasswordPop
            passPop={passPop}
            setPassPop={setPassPop}
            popPlaceholder={popPlaceholder}
          />
        )}

        <div className="w-2/3 flex">
          <div className="w-full flex flex-col items-center justify-center">
            {/* LEFT INSIDE DIV WITH TEXT */}
            <div className="text-lg bg-[#282828] w-7/12 p-4 rounded-lg">
              <div className="flex items-center w-full p-2">
                <div className="w-4/12">Email : </div>
                <div className="text-gray-200 w-8/12 border-b-2 flex justify-between items-center p-2">
                  <div className="truncate">Demo Text</div>
                </div>
              </div>

              <div className="flex items-center w-full p-2">
                <div className="w-4/12">Username : </div>
                <div className="text-gray-200 w-8/12 border-b-2 flex justify-between items-center p-2">
                  <div className="truncate mr-4">Demo Text</div>
                  <div
                    onClick={handleUsernamePopup}
                    title="Edit"
                    className="cursor-pointer rounded-full"
                  >
                    <PencilSimple size={24} />
                  </div>
                </div>
              </div>

              <div className="flex items-center w-full p-2">
                <div className="w-4/12">Phone Number : </div>
                <div className="text-gray-200 w-8/12 border-b-2 flex justify-between items-center p-2">
                  <div className="truncate">Demo Text</div>
                  <div
                    onClick={handlePhonePopup}
                    title="Edit"
                    className="cursor-pointer rounded-full"
                  >
                    <PencilSimple size={24} />
                  </div>
                </div>
              </div>

              <div className="flex items-center w-full p-2">
                <div className="w-4/12">Age : </div>
                <div className="text-gray-200 w-8/12 border-b-2 flex justify-between items-center p-2">
                  Demo text
                </div>
              </div>

              <div className="flex items-center w-full p-2">
                <div className="w-4/12">Date of Birth : </div>
                <div className="text-gray-200 w-8/12 border-b-2 flex justify-between items-center p-2">
                  <div className="truncate">Demo Text</div>
                  <div title="Edit" className="cursor-pointer rounded-full">
                    <PencilSimple size={24} />
                  </div>
                </div>
              </div>
            </div>

            <div className="flex w-full justify-center items-center p-2">
              <div
                onClick={handlePasswordPopup}
                className="p-2 text-lg border-2 rounded-md select-none cursor-pointer text-[#df94ff] border-2 border-[#df94ff] hover:bg-[#df94ff] hover:text-black w-40 text-center"
              >
                Edit password
              </div>
            </div>
          </div>
        </div>
        <div className="w-1/3 border-[#df94ff] shadow-[#df94ff] shadow-lg flex justify-center">
          <div className="w-full flex flex-col items-center justify-center">
            <h1 className="text-5xl p-8 absolute top-24 z-10 select-none text-[#df94ff]">
              Profile
            </h1>

            <div className="text-lg select-none w-72 rounded-lg bg-[#282828]">
              <div className="p-3 cursor-pointer hover:bg-[#323232] flex justify-between items-center rounded-t-md">
                <div>Saved Products</div>
                <div>
                  <ArrowLineDown size={24} />
                </div>
              </div>
              <div className="p-3 cursor-pointer hover:bg-[#323232] flex justify-between items-center">
                <div>History</div>
                <div>
                  <ClockCounterClockwise size={24} />
                </div>
              </div>
              <div className="p-3 cursor-pointer hover:bg-[#323232] flex justify-between items-center">
                <div>Payment Methods</div>
                <div>
                  <Money size={24} />
                </div>
              </div>
              <div className="p-3 cursor-pointer hover:bg-[#323232] flex justify-between items-center">
                <div>Address</div>
                <div>
                  <At size={24} />
                </div>
              </div>
              <div className="p-3 cursor-pointer hover:bg-[#323232] flex justify-between items-center rounded-b-md">
                <div>Contact Us</div>
                <div>
                  <Headset size={24} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
