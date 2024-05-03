import axios from "axios";
import { Trash, X } from "phosphor-react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Loading from "../components/Loading";
const Popup = ({ isOpen, onClose }) => {
  return (
    isOpen && (
      <div className="fixed inset-0 bg-[#1f1f1f] bg-opacity-50 flex justify-center items-center">
        <div className=" p-8 bg-[#030101] rounded-lg w-11/12 sm:w-[400px]">
          <p className="text-white">Items have been deleted from your cart</p>
          <div className="w-11/12 flex justify-end">
            <button
              className="mt-4 bg-[#df94ff] hover:bg-gray-400 text-white font-bold py-2 px-4 rounded"
              onClick={onClose}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    )
  );
};

const AddressPopup = ({ isOpen, setAddressPopup, allAddress, setAddress }) => {
  const handleAddressClick = (e) => {
    setAddress(e.currentTarget.id);
    setAddressPopup(false);
  };
  return (
    isOpen && (
      <div className="fixed inset-0 bg-[#1f1f1f] bg-opacity-50 flex justify-center items-center">
        <div className=" p-6 bg-[#030101] rounded-lg w-11/12 sm:w-[400px] text-white select-none">
          <div className="text-3xl text-center border-b-2 border-gray-400 mb-4 pb-2 flex items-center relative">
            <div>Select Address</div>
            <div
              onClick={() => setAddressPopup(false)}
              className="absolute right-0 text-2xl p-2 hover:bg-[#323232] rounded-full select-none cursor-pointer"
            >
              <X />
            </div>
          </div>
          <div className="w-full enableScroll h-96">
            {allAddress.map((add) => {
              return (
                <div
                  key={add._id}
                  id={
                    add.houseNo +
                    ", " +
                    add.street +
                    ", " +
                    add.city +
                    ", " +
                    add.state
                  }
                  onClick={handleAddressClick}
                  className="w-full rounded-md bg-[#1f1f1f] hover:bg-[#323232] p-3 cursor-pointer mb-4"
                >
                  {add.houseNo}, {add.street}, {add.city}, {add.state}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    )
  );
};
export default function Cart() {
  const navigate = useNavigate();
  const [items, setItems] = useState();
  const [total, setTotal] = useState(0);
  const [popupOpen, setPopupOpen] = useState(false);
  const [addressPopup, setAddressPopup] = useState(false);
  const [address, setAddress] = useState("Select Address");
  const [allAddress, setAllAddress] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAddressPopup = () => {
    setAddressPopup(true);
  };
  const checkoutHandler = async () => {
    const token = window.localStorage.getItem("token");
    if (total === 0) {
      setError("Cart is empty");
      return;
    }
    if (address === "Select Address") {
      setError("Please select an address");
      return;
    }
    if (!token) {
      navigate("/login");
      return;
    }
    try {
      setLoading(true);
      const randOrder =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);
      const response = await axios.post(
        "http://localhost:3003/api/order/add-order",
        {
          token: token,
          address: address,
          order_id: randOrder,
        }
      );
      const {
        data: { order },
      } = await axios.post("http://localhost:3003/api/payment/checkout", {
        token,
        amount: total,
      });

      var options = {
        key: "rzp_test_a21rZZodDCVb1S",
        amount: order.amount,
        currency: "INR",
        name: "Acme Corp",
        description: "Test Transaction",
        image: "",
        order_id: order.id,
        handler: async (response) => {
          const { data } = await axios.post(
            "http://localhost:3003/api/payment/callBack",
            {
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_signature: response.razorpay_signature,
            }
          );
          navigate(data + "/" + randOrder);
        },
        prefill: {
          name: "Gaurav Kumar",
          email: "gaurav.kumar@example.com",
          contact: "9000090000",
        },
        notes: {
          address: "Razorpay Corporate Office",
        },
        theme: {
          color: "#3399cc",
        },
      };
      setLoading(false);
      var rzp1 = await new window.Razorpay(options);
      const ans = rzp1.open();
      rzp1.on("payment.failed", async (response) => {
        setError("PaymentFailed");
        await axios.post("http://localhost:3003/api/order/order-failed", {
          token: token,
          update_id: randOrder,
        });
        return;
      });
    } catch (error) {
      console.log(error);
    }
  };
  const deleteFromCart = async (product) => {
    try {
      const token = window.localStorage.getItem("token");
      const response = await axios.put(
        "http://localhost:3003/api/user/removefromcart",
        {
          token: token,
          product: product,
        }
      );
      if (response.data.success === true) {
        setPopupOpen(true);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const fetchUserCart = async () => {
    const token = window.localStorage.getItem("token");
    const type = window.localStorage.getItem("type");
    if (!token || type !== "user") {
      return navigate("/login");
    }
    try {
      var total = 0;
      const response = await axios.post(
        "http://localhost:3003/api/user/populate-cart",
        { token: token }
      );
      setItems(response.data.cart);
      for (let element of response.data.cart) {
        total =
          total + Number(element.quantity) * Number(element.product.price);
      }
      setTotal(total);
    } catch (error) {
      console.log("Error");
    }
  };

  const fetchAllAddress = async () => {
    try {
      const token = window.localStorage.getItem("token");

      const response = await axios.post(
        "http://localhost:3003/api/address/display-all-addresses",
        {
          token,
        }
      );

      setAllAddress(response.data.addresses);
      if (!response.data.addresses) {
        setAddress(
          response.data.addresses[0]?.houseNo +
            ", " +
            response.data.addresses[0]?.street +
            ", " +
            response.data.addresses[0]?.city +
            ", " +
            response.data.addresses[0]?.state
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUserCart();
    fetchAllAddress();
  }, []);
  useEffect(() => {
    fetchUserCart();
  }, [popupOpen]);

  if (loading) return <Loading />;

  return (
    <div>
      <div className="py-20 bg-[#1f1f1f] min-h-screen h-fit flex flex-col items-center">
        <h6 className="text-[#df94ff] text-4xl md:text-6xl border-b lg:w-3/4 w-5/6">
          Cart
        </h6>
        {items && items.length === 0 && (
          <div className="text-white mt-4">Your cart looks empty</div>
        )}
        <div className="pb-3 lg:w-3/4 text-white text-center w-5/6 overflow-auto select-none">
          {items &&
            items.map((element, _id) => {
              return (
                <div
                  key={_id}
                  className="flex rounded-lg bg-[#3b3b3b] p-4 mt-2 justify-between items-center "
                >
                  <div
                    onClick={() => {
                      navigate(`/view-product/${element.product._id}`);
                    }}
                    className="flex items-center w-5/12 lg:w-4/12 justify-between overflow-hidden"
                  >
                    <div className="lg:h-24 lg:w-24 sm:h-20 sm:w-20 h-12 w-12 object-cover ">
                      <img
                        className="w-full h-full rounded-lg "
                        src={element.product.images[0]}
                        alt=""
                      />
                    </div>

                    <p className="sm:text-xl sm:text-nowrap text-sm truncate w-6/12">
                      {element.product.ProductName}
                    </p>
                  </div>

                  <p className="sm:text-xl text-sm">{element.quantity}</p>
                  <p className="sm:text-xl text-nowrap">
                    ₹ {Number(element.quantity) * Number(element.product.price)}
                  </p>
                  <button
                    title="delete from cart"
                    className="hover:bg-slate-600 p-2 rounded-full"
                    onClick={() => {
                      deleteFromCart(element.product._id);
                    }}
                  >
                    <Trash className="text-lg sm:text-xl lg:text-2xl" />
                  </button>
                </div>
              );
            })}
        </div>
        <div className="bottom-0 fixed w-full">
          <div className="w-full flex justify-center p-2 pb-0">
            <div
              onClick={handleAddressPopup}
              className="text-white flex justify-end w-11/12 lg:w-3/4 gap-4 p-2 bg-[#121212]  rounded-tr-lg rounded-tl-lg select-none"
            >
              <div className="flex justify-center items-center ">
                Select Address :{" "}
              </div>
              <div className="p-4 select-none cursor-pointer bg-[#1f1f1f] hover:bg-[#323232] rounded-md">
                {address}
              </div>
            </div>
          </div>
          <div className="w-full flex justify-center p-2 pt-0">
            <div className="w-11/12 lg:w-3/4 flex p-4 gap-4 items-center justify-end bg-[#121212] rounded-br-lg rounded-bl-lg">
              <div className="text-red-600">{error}</div>
              <div className="text-white text-lg">
                Total: ₹<span className="text-xl tracking-wider">{total}</span>
              </div>
              <button
                className="bg-[#df94ff] p-2 rounded-lg"
                onClick={checkoutHandler}
              >
                Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
      <Popup isOpen={popupOpen} onClose={() => setPopupOpen(false)} />
      <AddressPopup
        isOpen={addressPopup}
        setAddressPopup={setAddressPopup}
        allAddress={allAddress}
        setAddress={setAddress}
      />
    </div>
  );
}
