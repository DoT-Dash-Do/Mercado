import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
export default function Address() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({});
  const [allAddress, setallAddress] = useState();
  const [error, setError] = useState("");

  const deleteAddress = async()=>{
    
  }
  const handleSubmit = async () => {
    const token = window.localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
    if (
      !(
        formData.houseNo &&
        formData.street &&
        formData.pincode &&
        formData.city &&
        formData.state
      )
    ) {
      return setError("please check all the fields");
    }
    try {
      const response = await axios.post(
        "http://localhost:3003/api/address/save-address",
        { token, ...formData }
      );
      console.log(response);
      setError("");
    } catch (error) {
      console.log(error);
    }
  };
  const fetchAddress = async () => {
    const token = window.localStorage.getItem("token");

    try {
      const response = await axios.post(
        "http://localhost:3003/api/address/display-all-addresses",
        {
          token,
        }
      );
      setallAddress(response.data.addresses);
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
    <div className="min-h-screen bg-[#1f1f1f]">
    <div className="flex items-center flex-col gap-2">
      <div className=" pt-16 w-3/4 lg:w-6/12 flex flex-col gap-3 mt-4">
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
          <button
            className="text-white bg-[#df94ff] p-2 w-full rounded-lg hover:bg-slate-600"
            onClick={handleSubmit}
          >
            add address
          </button>
          <p className="text-red-600">{error}</p>
        </div>
      </div>
      <div className="flex flex-col w-3/4 gap-2 lg:w-6/12">
        <p className="text-[#df94ff] text-xl">All address</p>
        {allAddress &&
          allAddress.map((element, _id) => {
            return (
              <div key={_id} className="flex bg-[#3b3b3b] p-2 rounded-lg justify-between">
                <p className="text-white truncate">
                  {element.houseNo},{element.street},{element.city},{element.state},{element.pincode}
                </p>
                <button onClick={deleteAddress()}>
                  delete
                </button>
              </div>
            )
          })}
      </div>
    </div>
    </div>
  );
}
