import React, { useEffect, useState } from "react";
import axios from "axios";
export default function Address() {
  const [formData, setFormData] = useState({});
  const [allAddress, setallAddress] = useState([]);

  const handleSubmit = async () => {{/*start*/}};
  const fetchAddress = async () => {
    const token = window.localStorage.getItem("token");

    try {
      const response = await axios.post(
        "http://localhost:3003/api/address/display-all-addresses",
        {
          token,
        }
      );
      console.log(response.data);
    } catch (error) {
      console.log(error.message);
    }
  };
  const handlechange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };
  useEffect(() => {
    fetchAddress();
  }, []);
  return (
    <div className="flex h-screen bg-[#1f1f1f] justify-center">
      <div className="h-screen pt-16 w-3/4 flex flex-col gap-3 mt-4">
        <h6 className="text-[#df94ff] text-2xl">Add a new address</h6>
        <div>
          <input
            className="text-sm md:text-base w-full text-white mb-4 outline-none p-2 rounded-md placeholder-gray-400 bg-[#222222] focus:scale-[1.03] transition duration-150 remove-arrow"
            id="houseNo"
            type="number"
            placeholder="House number"
            onChange={handlechange}
            autoComplete="off"
          />
          <input
            className="text-sm md:text-base w-full text-white mb-4 outline-none p-2 rounded-md placeholder-gray-400 bg-[#222222] focus:scale-[1.03] transition duration-150 "
            id="street"
            type="text"
            placeholder="Street"
            onChange={handlechange}
            autoComplete="off"
          />
          <input
            className="text-sm md:text-base w-full text-white mb-4 outline-none p-2 rounded-md placeholder-gray-400 bg-[#222222] focus:scale-[1.03] transition duration-150 remove-arrow"
            id="pincode"
            type="number"
            placeholder="pincode"
            onChange={handlechange}
            autoComplete="off"
          />
          <input
            className="text-sm md:text-base w-full text-white mb-4 outline-none p-2 rounded-md placeholder-gray-400 bg-[#222222] focus:scale-[1.03] transition duration-150"
            id="city"
            type="text"
            placeholder="city"
            onChange={handlechange}
            autoComplete="off"
          />
          <input
            className="text-sm md:text-base w-full text-white mb-4 outline-none p-2 rounded-md placeholder-gray-400 bg-[#222222] focus:scale-[1.03] transition duration-150"
            id="state"
            type="text"
            placeholder="state"
            onChange={handlechange}
            autoComplete="off"
          />
          <button className="text-white bg-[#df94ff] p-2 w-full rounded-lg hover:bg-slate-600">
            add address
          </button>
        </div>
      </div>
    </div>
  );
}
