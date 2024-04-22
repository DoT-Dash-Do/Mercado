import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const Popup = ({ isOpen, onClose }) => {
  return (
    isOpen && (
      <div className="fixed inset-0 bg-[#1f1f1f] bg-opacity-50 flex justify-center items-center">
        <div className=" p-8 bg-[#030101] rounded-lg">
          <p className="text-white">Items have been added to your cart</p>
          <button className="mt-4 bg-[#df94ff] hover:bg-gray-400 text-white font-bold py-2 px-4 rounded" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    )
  );
};

const ViewProduct = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [product, setProduct] = useState({});
  const [amount, setAmount] = useState(1);
  const [activeImg, setActiveImage] = useState("");
  const [type, setType] = useState("");
  const [popupOpen, setPopupOpen] = useState(false);
  const changeAmount = (val, amt) => {
    if (val === -1 && amount > 0) {
      setAmount(amt - 1);
    }
    if (val === 1 && amount < product.stock) {
      setAmount(amt + 1);
    }
  };
  const fetchProduct = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3003/api/product/fetch-single-product",
        {
          productId: params.id,
        }
      );
      console.log(response.data.product);
      if (response.data.product && response.data.product.images) {
        setProduct(response.data.product);
        setActiveImage(response.data.product.images[0]);
        setType(window.localStorage.getItem("type"));
      } else {
        console.error("Product or images not found in the response");
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchProduct();
  }, []);

  const addToCart = async () => {
    const token = window.localStorage.getItem("token");
    if (token === undefined) {
      navigate("/");
      return;
    }
    try {
      const response = await axios.put("http://localhost:3003/api/user/addtocart", {
        token: token,
        product: params.id,
        quantity: amount,
      });
      if(response.data.success === true)
      {
        setPopupOpen(true);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="h-fit min-h-screen bg-[#1f1f1f] pt-16">
      {/* parent-div */}
      <div className="flex flex-col justify-between mt-20 md:mt-36 lg:flex-row gap-16 lg:justify-items-center">
        <div className="flex flex-col gap-6 lg:w-2/4 items-center justify-center">
          <div className=" h-[320px] w-[320px] sm:h-[450px] sm:w-[450px]">
            <img
              src={activeImg}
              alt=""
              className="h-full w-full self-center rounded-xl object-cover"
            />
          </div>

          <div className="flex flex-row justify-between h-24 items-center gap-4">
            {product.images &&
              product.images.map((element, _id) => {
                return (
                  <img
                    key={_id}
                    src={element}
                    alt="bhup"
                    className="w-16 h-16 sm:w-20 sm:h-20 rounded-md cursor-pointer"
                    onClick={() => setActiveImage(element)}
                  />
                );
              })}
          </div>
        </div>
        <div className="flex flex-col gap-4 lg:w-2/4 lg:m-0 m-auto sm:w-96 w-72 lg:min-h-[450px] justify-between">
          <span className=" text-[#df94ff] text-6xl font-semibold">
            {product.ProductName}
          </span>
          <h1 className="text-white font-bold text-lg">{product.type}</h1>
          <h1 className="text-5xl text-white font-semibold">
            ₹ {product.price}
          </h1>
          <h1 className="text-2xl text-white font-semibold">
            Stock:{product.stock}
          </h1>
          <div className="h-44">
            <h1 className="text-sm text-white font-semibold">Description</h1>
            <p className="text-xs text-white sm:max-w-[450px] max-h-40 overflow-auto items-center max-w-[450px]">
              {product.description}
            </p>
          </div>
          <div className="flex flex-row items-center gap-12">
            <div className="flex flex-row items-center">
              <button
                className="bg-gray-200 py-1 px-2 rounded-lg text-[#df94ff] text-sm sm:px-3"
                onClick={() => changeAmount(-1, amount)}
              >
                -
              </button>
              <span className="text-white w-10 py-4 px-6 rounded-lg text-center sm:w-20">
                {amount}
              </span>
              <button
                className="bg-gray-200 py-1 px-2 rounded-lg text-[#df94ff] text-sm sm:px-3"
                onClick={() => changeAmount(1, amount)}
              >
                +
              </button>
            </div>
            {
              type == "user" && (<button
              className="bg-[#df94ff] hover:bg-[#a995b2] text-white font-semibold py-1 px-6 rounded-xl text-sm"
              onClick={() => addToCart()}
            >
              Add to Cart
            </button>)
            }
            {
              (type==undefined || type != "user") && (<button
                className="bg-[#df94ff] text-white font-semibold py-1 px-6 rounded-xl text-sm disabled:bg-[#7e5b8e]"
                onClick={() => addToCart()}
               disabled>
                Add to Cart
              </button>)
            }
          </div>
        </div>
      </div>
      <Popup isOpen={popupOpen} onClose={() => setPopupOpen(false)} />
    </div>
  );
};

export default ViewProduct;
