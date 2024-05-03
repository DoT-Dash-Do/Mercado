import { PieChart } from "@mui/x-charts/PieChart";
import axios from "axios";
import { Bank, CirclesThreePlus } from "phosphor-react";
import { default as React, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function SellerDashoard() {
  const [orders, setOrders] = useState([]);
  const [dashboardDetails, setDetails] = useState({
    username: "seller",
    balance: 0,
    products: 0,
  });
  const [chartData, setChartData] = useState([]);
  const [sale, setSale] = useState(0);
  const navigate = useNavigate();
  const fetchDetails = async () => {
    const seller = window.localStorage.getItem("token");
    const type = window.localStorage.getItem("type");
    if (seller === undefined || type !== "seller" || type === undefined) {
      navigate("/login");
      return;
    }
    try {
      var itemsSold = 0;
      const { data } = await axios.post(
        "http://localhost:3003/api/seller/get-dashboard-details",
        { token: seller }
      );
      setDetails(data.data);
      const response = await axios.post(
        "http://localhost:3003/api/order/fetch-seller-order",
        { token: seller }
      );
      setOrders(response.data.orders);
      let chart = new Map();

      response.data.orders.forEach((element) => {
        var quant = element.quantity;
        itemsSold = itemsSold + quant;
        if (chart.get(element.product.type)) {
          quant = element.quantity + chart.get(element.product.type);
        }
        chart.set(element.product.type, quant);
      });
      const mapEntriesArray = Array.from(chart.entries());

      const arrayOfObjects = mapEntriesArray.map(([label, value], index) => {
        return { index, label, value };
      });
      setSale(itemsSold);
      setChartData(arrayOfObjects);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchDetails();
  }, []);
  return (
    <div className="pt-16 min-h-screen bg-[#1f1f1f] flex flex-col items-center">
      <div className="border-b w-11/12 p-2 flex justify-between select-none items-end">
        <p className="text-[#df94ff] text-3xl lg:text-5xl w-3/4 lg:w-1/2 truncate">
          Welcome, {dashboardDetails.username}
        </p>
        <div className="flex gap-4">
          <button
            className="text-white text-xl p-1 rounded-lg hover:bg-[#484848] flex text-center items-center gap-1"
            title="add product"
          >
            <CirclesThreePlus size={30} />
            <div
              onClick={() => navigate("/add-product")}
              className="hidden lg:block"
            >
              Add Product
            </div>
          </button>
          <button
            className="text-white text-xl p-1  rounded-lg hover:bg-[#484848] flex text-center items-center gap-1"
            title="Withdraw"
          >
            <Bank size={30} />
            <div className="hidden lg:block">Withdraw</div>
          </button>
        </div>
      </div>
      <div className="w-11/12 lg:w-10/12 flex flex-col justify-center p-4">
        <div className="flex flex-col justify-between lg:flex-row">
          <div className="lg:w-4/12 p-2">
            <div className="bg-[#3e3e3e] rounded-lg p-4">
              <div className="flex items-center justify-between">
                <h5 className="text-xl text-white font-bold">Balance</h5>
                <Link
                  to="#"
                  className="text-sm font-medium text-[#df94ff] hover:underline "
                >
                  Withdraw
                </Link>
              </div>
              <div className="p-4 text-5xl text-[#df94ff] select-none truncate">
                {dashboardDetails.balance}
              </div>
            </div>
          </div>
          <div className="lg:w-4/12 p-2">
            <div className=" bg-[#3e3e3e] rounded-lg p-4">
              <div className="flex items-center justify-between">
                <h5 className="text-xl text-white font-bold">Items Sold</h5>
                <Link
                  to="#"
                  className="text-sm font-medium text-[#df94ff] hover:underline "
                >
                  Manage
                </Link>
              </div>
              <div className="p-4 text-5xl text-[#df94ff] select-none truncate">
                {sale}
              </div>
            </div>
          </div>
          <div className="lg:w-4/12 p-2">
            <div className=" bg-[#3e3e3e] rounded-lg p-4">
              <div className="flex items-center justify-between">
                <h5 className="text-xl text-white font-bold">Total Products</h5>
                <Link
                  to="/sellerProducts"
                  className="text-sm font-medium text-[#df94ff] hover:underline "
                >
                  View
                </Link>
              </div>
              <div className="p-4 text-5xl text-[#df94ff] select-none truncate">
                {dashboardDetails.products}
              </div>
            </div>
          </div>
        </div>
        <div className="flex-col lg:flex-row justify-between lg:flex overflow-auto w-full">
          <div className="p-2 lg:w-1/4">
            <button className="text-3xl text-white p-4 bg-[#3e3e3e] rounded-lg hover:bg-black w-full">
              Update Orders
            </button>
          </div>
          <div className="p-2 lg:w-1/4">
            <button className="text-3xl text-white p-4 bg-[#3e3e3e] rounded-lg hover:bg-black w-full">
              Check Orders
            </button>
          </div>
          <div className="p-2 lg:w-1/4">
            <button
              className="text-3xl text-white p-4 bg-[#3e3e3e] rounded-lg hover:bg-black w-full"
              onClick={() => {
                navigate("/sellerProducts");
              }}
            >
              Update Products
            </button>
          </div>
          <div className="p-2 lg:w-1/4">
            <button className="text-3xl text-white p-4 bg-[#3e3e3e] rounded-lg hover:bg-black w-full">
              Deep Analysis
            </button>
          </div>
        </div>
        <div className="flex flex-col justify-between sm:min-h-[20em] lg:flex-row">
          <div className="lg:w-6/12 p-2">
            <div className="p-4 rounded-lg shadow bg-[#3e3e3e] max-h-[20em]">
              <div className="flex items-center justify-between">
                <h5 className="text-xl font-bold leading-none text-white">
                  Latest Orders
                </h5>
                <Link
                  to="#"
                  className="text-sm font-medium text-[#df94ff] hover:underline "
                >
                  View All
                </Link>
              </div>
              <div className="overflow-auto h-[17em]">
                <ul className="divide-y divide-gray-200 h-fill overflow-auto style-3 p-2">
                  {orders.length === 0 && (
                    <div className="text-white p-2">NO ORDERS PLACED YET</div>
                  )}
                  {orders.length > 0 &&
                    orders.map((element, _id) => {
                      return (
                        <li key={_id} className="p-2">
                          <div className="flex items-center" key="_id">
                            <div className="flex-1">
                              <p className="text-xl text-white truncate ">
                                {element.product.ProductName}
                              </p>
                              <p className="text-sm text-[#aeaeae] truncate ">
                                {element.status}
                              </p>
                            </div>
                            <div className="inline-flex items-center text-base font-semibold text-white">
                              ₹ {element.totalPrice}
                            </div>
                          </div>
                        </li>
                      );
                    })}
                </ul>
              </div>
            </div>
          </div>
          <div className="lg:w-6/12 p-2">
            <div className="flex flex-col bg-[#3e3e3e] rounded-lg p-4 h-[30em] sm:h-[20em] justify-center">
              <h1 className="text-white">Orders analysis</h1>

              {orders.length === 0 && (
                <div className="text-white p-2">No Orders placed Yet</div>
              )}
              <PieChart
                className="flex-row"
                series={[
                  {
                    data: chartData,
                    innerRadius: 30,
                    outerRadius: 100,
                    paddingAngle: 5,
                    cornerRadius: 5,
                  },
                ]}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="bg-black w-11/12 bottom-0 mb-2 lg:fixed text-white text-2xl p-4 rounded-lg backdrop-blur-lg">
        You currently have {orders.length} orders to be delivered
      </div>
    </div>
  );
}
