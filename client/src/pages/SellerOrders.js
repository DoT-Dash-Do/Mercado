import axios from "axios";
import { format } from "date-fns";
import { CurrencyInr } from "phosphor-react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Loading from "../components/Loading";
import StatusPopup from "../components/StatusPopup";

const SellerOrders = () => {
  const token = window.localStorage.getItem("token");
  const [loading, setLoading] = useState(false);
  const [orders, setOrders] = useState([]);
  const [statusPop, setStatusPop] = useState(false);

  const [status, setStatus] = useState("");
  const [change, setChange] = useState("");

  const navigate = useNavigate();

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await axios.post(
        "https://mercado-bq2x.onrender.com/api/order/fetch-seller-order",
        {
          token,
        }
      );
      setLoading(false);

      setOrders(response.data.orders);
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);
  useEffect(() => {
    fetchOrders();
  }, [status]);

  const handleStatusChange = (e) => {
    setChange(e.currentTarget.id);
    setStatus(e.currentTarget.title);

    setStatusPop(true);
  };

  if (loading) return <Loading />;
  return (
    <>
      <div className="pt-16 bg-[#1f1f1f] enableScroll w-full h-screen">
        <div className="w-full flex flex-col justify-center items-center">
          {orders.map((order, ind) => {
            return (
              <div
                key={order._id}
                className="w-11/12 xl:flex bg-[#323232] text-white my-4 rounded-xl"
              >
                {/* left card */}
                <div className="left flex items-center py-4 xl:py-8 p-2 sm:p-4 md:p-8 w-full xl:w-3/4">
                  {/* image */}
                  <div className="image flex-shrink-0 w-28 h-28 md:w-32 md:h-32 xl:w-44 xl:h-44 border-2 rounded-lg border-gray-400">
                    <img
                      className="w-full h-full object-contain rounded-md"
                      src={order.product.images[0]}
                      alt="monster"
                    />
                  </div>
                  {/* details */}
                  <div className="details h-full px-4 xl:py-4 flex-grow flex flex-col justify-between text-lg">
                    <div className="w-full">
                      <div className="w-full flex justify-between items-center border-b-2 border-gray-400 mb-2">
                        <div className="text-base md:text-xl break-all sm:truncate">
                          {order.product.ProductName}
                        </div>
                        <div className="text-sm md:text-lg text-center hidden md:flex w-32 ml-4">
                          {format(order.createdAt, "dd-MMM-yyyy")}
                        </div>
                      </div>
                      <div className="w-full text-xs md:text-sm mb-2 sm:truncate">
                        {order.product.type}
                      </div>
                      <div className="text-sm md:text-base truncate hidden md:block">
                        <p className="truncate">{order.address}</p>
                      </div>
                      <div className="text-sm md:text-lg text-center flex md:hidden w-32">
                        {format(order.createdAt, "dd-MMM-yyyy")}
                      </div>
                    </div>

                    <div className="text-base md:text-lg text-[#df94ff] hidden md:flex items-center mt-2">
                      <CurrencyInr />
                      <span className="text-xl xl:text-xl">
                        {order.totalPrice}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Hidden card */}
                <div className="px-2 sm:px-4 md:hidden">
                  <div>{order.address}</div>
                  <div className="text-base md:text-xl text-[#df94ff] flex items-center text-[#df94ff]">
                    <CurrencyInr />
                    <span className="text-lg md:text-2xl">
                      {order.totalPrice}
                    </span>
                  </div>
                </div>

                {/* right card */}
                <div className="right w-full xl:w-1/4 py-2 xl:py-4 p-2 sm:p-2 md:p-4 text-lg">
                  <div className="w-full h-full flex xl:justify-center items-center select-none">
                    {order.status === "payment failed" ? (
                      <div className="sm:w-auto xl:w-full p-3 text-[#df94ff] text-lg sm:text-xl xl:text-xl rounded-md flex justify-center items-center">
                        {order.status}
                      </div>
                    ) : (
                      <div className="sm:w-auto xl:w-full p-3 text-lg sm:text-xl xl:text-xl rounded-md flex flex-col gap-4 justify-center items-center">
                        <div className="w-44 flex justify-center items-center text-[#df94ff] p-2 rounded-md">
                          {order.status}
                        </div>
                        <button
                          id={order._id}
                          title={order.status}
                          onClick={handleStatusChange}
                          className="border-2 w-44 flex justify-center items-center text-white bg-[#4a4a4a] p-2 rounded-md"
                        >
                          Change Status
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
          {/* order product card */}
        </div>
      </div>
      {statusPop && (
        <StatusPopup
          status={status}
          setStatus={setStatus}
          change={change}
          setStatusPop={setStatusPop}
        />
      )}
    </>
  );
};

export default SellerOrders;
