import React from "react";

const Orders = () => {
  return (
    <div className="pt-16 bg-[#1f1f1f] enableScroll w-full h-screen">
      <div className="w-full flex flex-col justify-center items-center">
        {/* order product card */}
        <div className="w-11/12 flex bg-[#323232] text-white my-4 rounded-xl">
          {/* left card */}
          <div className="left flex p-8 w-3/4">
            {/* image */}
            <div className="image w-64 h-64 border-2 rounded-lg border-gray-400">
              <img
                className="w-full h-full object-cover rounded-md"
                src="https://i.pinimg.com/736x/3c/68/fd/3c68fda30c81e5607f894a724c8e848b.jpg"
                alt="monster"
              />
            </div>
            {/* details */}
            <div className="details px-6 py-4  flex-grow flex flex-col justify-between text-lg">
              <div>
                <div className="w-full flex justify-between items-center border-b-2 border-gray-400 mb-2">
                  <div className="text-2xl flex-grow truncate">
                    Name of the item you ordered
                  </div>
                  <div className="">Order placed time</div>
                </div>
                <div className="w-full text-sm mb-2 truncate">
                  Type of the item
                </div>
                <div className="w-full truncate">
                  Address of the item that can be long
                </div>
              </div>

              <div className="text-3xl text-[#df94ff]">$3999</div>
            </div>
          </div>
          {/* right card */}
          <div className="right w-1/4 p-8 text-lg">
            <div className="w-full h-full flex flex-col items-center justify-around select-none">
              <div className="w-56 p-3 text-[#df94ff] text-3xl rounded-md flex justify-center items-center">
                Delivered
              </div>
              <div className="w-56 bg-[#262626] hover:bg-[#1f1f1f] p-3 rounded-md cursor-pointer flex justify-center items-center">
                View Product
              </div>
              <div className="w-56 bg-[#262626] hover:bg-[#1f1f1f] p-3 rounded-md cursor-pointer flex justify-center items-center">
                Invoice
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Orders;
