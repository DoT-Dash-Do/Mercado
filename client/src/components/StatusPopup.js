import axios from "axios";
import { X } from "phosphor-react";
import React from "react";

const StatusPopup = ({ status, setStatus, change, setStatusPop }) => {
  const handleStatusChange = async (e) => {
    let changeStatus = "";
    e.currentTarget.id === "1"
      ? (changeStatus = "Order Placed")
      : e.currentTarget.id === "2"
      ? (changeStatus = "In Transit")
      : (changeStatus = "Delivered");

    try {
      const token = window.localStorage.getItem("token");
      const response = await axios.put(
        "http://localhost:3003/api/order/change-order-status",
        {
          token,
          order: change,
          changeStatus,
        }
      );

      setStatusPop(false);
      setStatus(changeStatus);
    } catch (err) {
      console.log("There was an error");
    }
  };

  //change = order id
  //status = current status
  //setStatus = change status after updating
  //setStatusPop = make it false after updating
  return (
    <div className="fixed inset-0 bg-[#1f1f1f] bg-opacity-30 flex justify-center items-center z-40">
      <div className="text-xl p-24 bg-[#030101] rounded-lg text-white text-center relative">
        <button
          onClick={() => setStatusPop(false)}
          className="absolute top-4 right-4 p-2 text-2xl hover:bg-[#323232] rounded-full"
        >
          <X />
        </button>
        <h1 className="text-3xl mb-4 border-b-2 border-gray-400 w-full">
          Select Status
        </h1>
        <div className="w-52 select-none flex flex-col gap-2">
          {status !== "Order Placed" && (
            <button
              id="1"
              onClick={handleStatusChange}
              className="border-2 w-full p-2 rounded-md bg-[#323232] hover:bg-[#4a4a4a]"
            >
              Order Placed
            </button>
          )}
          {status !== "In Transit" && (
            <button
              id="2"
              onClick={handleStatusChange}
              className="border-2 w-full p-2 rounded-md bg-[#323232] hover:bg-[#4a4a4a]"
            >
              In Transit
            </button>
          )}
          {status !== "Delivered" && (
            <button
              id="3"
              onClick={handleStatusChange}
              className="border-2 w-full p-2 rounded-md bg-[#323232] hover:bg-[#4a4a4a]"
            >
              Delivered
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default StatusPopup;
