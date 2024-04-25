import axios from "axios";
import {
  ArrowLineDown,
  At,
  ClockCounterClockwise,
  Headset,
  Money,
  PencilSimple,
} from "phosphor-react";
import React, { useEffect, useState } from "react";
import EditPopup from "../components/EditPopup";
import PasswordPop from "../components/PasswordPopup";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navig = useNavigate();
  const [popVisible, setPopupVisible] = useState(false);
  const [popPlaceholder, setPopPlaceholder] = useState("");
  const [type, setUserType] = useState("");
  const [passPop, setPassPop] = useState("");
  const [fieldType, setType] = useState("");
  const [userData, setUserData] = useState({});
  const token = window.localStorage.getItem("token");
  const handleNavigation = ()=>{
    navig("/userAddress");
  }
  useEffect(() => {
    const fetchUserData = async () => {
      const response = await axios.post(
        "http://localhost:3003/api/user/get-user-data",
        {
          token,
        }
      );

      setUserData(response.data.userData);
    };
    const fetchSellerData = async () => {
      const response = await axios.post(
        "http://localhost:3003/api/seller/get-seller-data",
        {
          token,
        }
      );

      setUserData(response.data.userData);
    };
    setUserType(window.localStorage.getItem("type"));
    if (window.localStorage.getItem("type") === "user") fetchUserData();
    if (window.localStorage.getItem("type") === "seller") fetchSellerData();
  }, []);

  useEffect(() => {
    const fetchUserData = async () => {
      const response = await axios.post(
        "http://localhost:3003/api/user/get-user-data",
        {
          token,
        }
      );
      setUserData(response.data.userData);
    };
    const fetchSellerData = async () => {
      const response = await axios.post(
        "http://localhost:3003/api/seller/get-seller-data",
        {
          token,
        }
      );
      setUserData(response.data.userData);
    };

    if (window.localStorage.getItem("type") === "user") fetchUserData();
    if (window.localStorage.getItem("type") === "seller") fetchSellerData();
  }, [popVisible]);

  const handleUsernamePopup = () => {
    setPopPlaceholder("Username");
    setType("username");
    setPopupVisible(!popVisible);
  };

  const handleFirstNamePopup = () => {
    setPopPlaceholder("First Name");
    setType("firstName");
    setPopupVisible(!popVisible);
  };
  const handleLastNamePopup = () => {
    setPopPlaceholder("Last Name");
    setType("lastName");
    setPopupVisible(!popVisible);
  };

  const handlePasswordPopup = () => {
    setPassPop(!passPop);
  };

  return (
    <div>
      <div className="pt-16 bg-[#1f1f1f] h-screen lg:flex text-white enableScroll">
        {popVisible && (
          <EditPopup
            popVisible={popVisible}
            setPopupVisible={setPopupVisible}
            popPlaceholder={popPlaceholder}
            fieldType={fieldType}
          />
        )}
        {passPop && (
          <PasswordPop
            passPop={passPop}
            setPassPop={setPassPop}
            popPlaceholder={popPlaceholder}
          />
        )}

        <div className="w-full lg:w-2/3 flex lg:mt-0 border-b-2 border-gray-400 pb-8 lg:pb-0 mb-8 lg:mb-0 lg:border-b-0 px-4 lg:p-0">
          <div className="w-full flex flex-col items-center justify-center">
            <div className="left-0 w-full pt-16 flex justify-center">
              <h1 className="text-4xl md:text-5xl p-4 z-10 flex lg:hidden select-none text-[#df94ff]">
                Profile
              </h1>
            </div>
            {/* LEFT INSIDE DIV WITH TEXT */}
            <div className="text-sm sm:text-base lg:text-lg  bg-[#282828] mb-4 lg:mb-0 w-full md:mx-0 md:w-9/12 xl:w-7/12 p-1 sm:p-4 rounded-lg">
              <div className="flex items-center w-full p-2">
                <div className="w-4/12">Email : </div>
                <div className="text-gray-200 w-8/12 border-b-2 flex justify-between items-center p-2">
                  <div className="truncate">{userData.email || "N/A"}</div>
                </div>
              </div>

              <div className="flex items-center w-full p-2">
                <div className="w-4/12">Username : </div>
                <div className="text-gray-200 w-8/12 border-b-2 flex justify-between items-center p-2">
                  <div className="truncate mr-4">
                    {userData.username || "N/A"}
                  </div>
                  <div
                    onClick={handleUsernamePopup}
                    title="Edit"
                    className="cursor-pointer rounded-full"
                  >
                    <PencilSimple className="text-lg sm:text-xl lg:text-2xl" />
                  </div>
                </div>
              </div>

              <div className="flex items-center w-full p-2">
                <div className="w-4/12">First Name : </div>
                <div className="text-gray-200 w-8/12 border-b-2 flex justify-between items-center p-2">
                  <div className="truncate">{userData.firstName || "N/A"}</div>
                  <div
                    onClick={handleFirstNamePopup}
                    title="Edit"
                    className="cursor-pointer rounded-full"
                  >
                    <PencilSimple className="text-lg sm:text-xl lg:text-2xl" />
                  </div>
                </div>
              </div>

              <div className="flex items-center w-full p-2">
                <div className="w-4/12">Last Name : </div>
                <div className="text-gray-200 w-8/12 border-b-2 flex justify-between items-center p-2">
                  <div className="truncate">{userData.lastName || "N/A"}</div>
                  <div
                    onClick={handleLastNamePopup}
                    title="Edit"
                    className="cursor-pointer rounded-full"
                  >
                    <PencilSimple className="text-lg sm:text-xl lg:text-2xl" />
                  </div>
                </div>
              </div>
            </div>

            <div className="flex w-full justify-center items-center p-2">
              <div
                onClick={handlePasswordPopup}
                className="p-2 text-md md:text-lg border-2 rounded-md select-none cursor-pointer text-[#df94ff] border-2 border-[#df94ff] hover:bg-[#df94ff] hover:text-black w-40 text-center"
              >
                Edit password
              </div>
            </div>
          </div>
        </div>
        <div className="w-full lg:w-1/3 border-[#df94ff] lg:shadow-[#df94ff] shadow-lg lg:flex justify-center">
          <div className="w-full flex flex-col items-center pb-10 justify-center px-4 sm:px-0">
            <h1 className="text-5xl p-8 z-10 lg:flex absolute top-24 hidden select-none text-[#df94ff]">
              Profile
            </h1>

            <div className="text-sm sm:text-base lg:text-lg select-none w-full sm:w-3/4 md:w-1/2 lg:w-72 rounded-lg bg-[#282828]">
              <div className="p-3 cursor-pointer hover:bg-[#323232] flex justify-between items-center rounded-t-md">
                <div>Saved Products</div>
                <div>
                  <ArrowLineDown className="text-lg sm:text-xl lg:text-2xl" />
                </div>
              </div>
              <div className="p-3 cursor-pointer hover:bg-[#323232] flex justify-between items-center">
                <div>History</div>
                <div>
                  <ClockCounterClockwise className="text-lg sm:text-xl lg:text-2xl" />
                </div>
              </div>
              <div className="p-3 cursor-pointer hover:bg-[#323232] flex justify-between items-center">
                <div>Payment Methods</div>
                <div>
                  <Money className="text-lg sm:text-xl lg:text-2xl" />
                </div>
              </div>
              <div className="p-3 cursor-pointer hover:bg-[#323232] flex justify-between items-center" onClick={handleNavigation}>
                <div>Address</div>
                <div>
                  <At className="text-lg sm:text-xl lg:text-2xl" />
                </div>
              </div>
              <div className="p-3 cursor-pointer hover:bg-[#323232] flex justify-between items-center rounded-b-md">
                <div>Contact Us</div>
                <div>
                  <Headset className="text-lg sm:text-xl lg:text-2xl" />
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
