import axios from "axios";
import { Trash } from "phosphor-react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
const Popup = ({ isOpen, onClose }) => {
  return (
    isOpen && (
      <div className="fixed inset-0 bg-[#1f1f1f] bg-opacity-50 flex justify-center items-center">
        <div className=" p-8 bg-[#030101] rounded-lg w-11/12 sm:w-[400px]">
          <p className="text-white">Items have been deleted from your cart</p>
          <button
            className="mt-4 bg-[#df94ff] hover:bg-gray-400 text-white font-bold py-2 px-4 rounded"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    )
  );
};
export default function Cart() {
  const navigate = useNavigate();
  const [items, setItems] = useState();
  const [total, setTotal] = useState();
  const [popupOpen, setPopupOpen] = useState(false);
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
    if (!token) {
      return navigate("/login");
    }
    try {
      var total = 0;
      const response = await axios.post(
        "http://localhost:3003/api/user/populate-cart",
        { token: token }
      );
      setItems(response.data.cart);
      console.log(response.data.cart);
      for (let element of response.data.cart) {
        total =
          total + Number(element.quantity) * Number(element.product.price);
      }
      setTotal(total);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchUserCart();
  }, []);
  useEffect(() => {
    fetchUserCart();
  }, [popupOpen]);
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
                  <div className="flex items-center w-5/12 lg:w-4/12 justify-between overflow-hidden">
                    <div
                      className="lg:h-24 lg:w-24 sm:h-20 sm:w-20 h-12 w-12 object-cover "
                      onClick={() => {
                        navigate(`/view-product/${element.product._id}`);
                      }}
                    >
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
        <div className="bottom-0 fixed w-full flex justify-center p-2">
          <div className="w-11/12 lg:w-3/4 flex p-4 gap-4 items-center justify-end bg-[#121212] rounded-lg">
            <div className="text-white text-lg">
              Total: ₹<span className="text-xl tracking-wider">{total}</span>
            </div>
            <button className="bg-[#df94ff] p-2 rounded-lg">Checkout</button>
          </div>
        </div>
      </div>
      <Popup isOpen={popupOpen} onClose={() => setPopupOpen(false)} />
    </div>
  );
}
