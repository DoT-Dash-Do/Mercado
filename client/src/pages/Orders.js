import axios from "axios";
import { format } from "date-fns";
import { CurrencyInr } from "phosphor-react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Loading from "../components/Loading";
const Orders = () => {
  const token = window.localStorage.getItem("token");
  const [loading, setLoading] = useState(false);
  const [orders, setOrders] = useState([]);

  const navigate = useNavigate();

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await axios.post(
        "https://mercado-bq2x.onrender.com/api/order/fetch-user-orders",
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

  const handleProductNav = (e) => {
    navigate(`/view-product/${e._id}`);
  };

  const handleRateNav = (e) => {
    navigate(`/rate-product/${e}`);
  };

  if (loading) return <Loading />;

  return (
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
                <div className="image flex-shrink-0 w-32 h-32 md:w-44 md:h-44 xl:w-64 xl:h-64 border-2 rounded-lg border-gray-400">
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
                      <div className="text-lg md:text-2xl break-all sm:truncate">
                        {order.product.ProductName}
                      </div>
                      <div className="text-sm md:text-lg text-center hidden md:flex w-32 ml-4">
                        {format(order.createdAt, "dd-MMM-yyyy")}
                      </div>
                    </div>
                    <div className="w-full text-xs md:text-sm mb-2 sm:truncate">
                      {order.product.type}
                    </div>
                    <div className="text-sm md:text-lg truncate hidden md:block">
                      <p className="truncate">{order.address}</p>
                    </div>
                    <div className="text-sm md:text-lg text-center flex md:hidden w-32">
                      {format(order.createdAt, "dd-MMM-yyyy")}
                    </div>
                  </div>

                  <div className="text-base md:text-2xl text-[#df94ff] hidden md:flex items-center mt-8">
                    <CurrencyInr />
                    <span className="text-xl xl:text-3xl">
                      {order.totalPrice}
                    </span>
                  </div>
                </div>
              </div>

              {/* Hidden card */}
              <div className="px-2 sm:px-4 md:hidden">
                <div>{order.address}</div>
                <div className="text-lg md:text-2xl text-[#df94ff] flex items-center">
                  <CurrencyInr />
                  <span className="text-xl md:text-3xl">
                    {order.totalPrice}
                  </span>
                </div>
              </div>

              {/* right card */}
              <div className="right w-full xl:w-1/4 py-4 xl:py-8 p-2 sm:p-4 md:p-8 text-lg">
                <div className="w-full h-full flex xl:flex-col items-center justify-between sm:justify-around select-none">
                  <div className="text-32 sm:w-44 xl:w-full p-3 text-[#df94ff] text-lg sm:text-xl lg:text-3xl rounded-md flex justify-center items-center">
                    {order.status}
                  </div>
                  <div className="w-32 sm:w-full h-full flex-col sm:flex-row flex xl:flex-col items-center gap-2 lg:gap-4 xl:gap-0 justify-end xl:justify-around">
                    <div
                      onClick={() => {
                        handleProductNav(order.product);
                      }}
                      id={order.product._id}
                      className="w-32 sm:w-auto lg:w-36 xl:w-56 text-sm md:text-base xl:text-lg bg-[#262626] hover:bg-[#1f1f1f] p-3 rounded-md cursor-pointer flex justify-center items-center"
                    >
                      View Product
                    </div>

                    <div
                      onClick={() => handleRateNav(order.product._id)}
                      id={order.product._id}
                      className="w-32 sm:w-auto lg:w-36 xl:w-56 text-sm md:text-base xl:text-lg bg-[#262626] hover:bg-[#1f1f1f] p-3 rounded-md cursor-pointer flex justify-center items-center"
                    >
                      Review
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
        {/* order product card */}
      </div>
    </div>
  );
};

export default Orders;
