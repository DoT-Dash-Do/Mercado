import axios from "axios";
import { format } from "date-fns";
import React, { useEffect, useState } from "react";
import { FaRegStar, FaStar } from "react-icons/fa6";
import { useNavigate, useParams } from "react-router-dom";

const Popup = ({ isOpen, onClose }) => {
  return (
    isOpen && (
      <div className="fixed inset-0 bg-[#1f1f1f] bg-opacity-50 flex justify-center items-center">
        <div className=" p-8 bg-[#030101] rounded-lg">
          <p className="text-white">Items have been added to your cart</p>
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

const ViewProduct = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [product, setProduct] = useState({});
  const [amount, setAmount] = useState(1);
  const [activeImg, setActiveImage] = useState("");
  const [type, setType] = useState("");
  const [reviews, setReviews] = useState([]);
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
        "https://mercado-bq2x.onrender.com/api/product/fetch-single-product",
        {
          productId: params.id,
        }
      );
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

  const fetchReviews = async () => {
    try {
      const response = await axios.get(
        `https://mercado-bq2x.onrender.com/api/review/fetch-reviews/${params.id}`
      );
      setReviews(response.data.reviews);
    } catch (err) {
      console.log("Authentication failed");
    }
  };
  useEffect(() => {
    fetchProduct();
    fetchReviews();
  }, []);

  const addToCart = async () => {
    const token = window.localStorage.getItem("token");
    if (token === undefined) {
      navigate("/");
      return;
    }
    try {
      const response = await axios.put(
        "https://mercado-bq2x.onrender.com/api/user/addtocart",
        {
          token: token,
          product: params.id,
          quantity: amount,
        }
      );
      if (response.data.success === true) {
        setPopupOpen(true);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="h-fit min-h-screen bg-[#1f1f1f] pt-16">
      {/* parent-div */}
      <div className="flex flex-col justify-between mt-20 md:mt-36 lg:flex-row gap-16 lg:justify-items-center mb-12">
        <div className="flex flex-col gap-6 lg:w-2/4 items-center justify-center">
          <div className=" h-[320px] w-[320px] sm:h-[450px] sm:w-[450px]">
            <img
              src={activeImg}
              alt="loading"
              className="h-full w-full self-center rounded-xl object-contain"
            />
          </div>

          <div className="flex flex-row justify-between h-24 items-center gap-4 select-none">
            {product.images &&
              product.images.map((element, _id) => {
                return (
                  <img
                    key={_id}
                    src={element}
                    alt="loading"
                    className="w-16 h-16 sm:w-20 sm:h-20 rounded-md cursor-pointer object-contain border-2 border-gray-400"
                    onClick={() => setActiveImage(element)}
                  />
                );
              })}
          </div>
        </div>
        <div className="flex flex-col gap-4 lg:w-1/2 lg:m-0 m-auto sm:w-96 w-72 lg:min-h-[450px] justify-between">
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
            <p className="text-xs text-white sm:max-w-[450px] max-h-40 overflow-auto items-center max-w-[450px] style-3">
              {product.description}
            </p>
          </div>
          {product.stock > 0 ? (
            <div className="flex flex-row items-center gap-12">
              <div className="flex flex-row items-center">
                <button
                  className="bg-gray-200 py-2 px-2 rounded-lg text-[#df94ff] text-sm sm:px-3"
                  onClick={() => changeAmount(-1, amount)}
                >
                  -
                </button>
                <span className="text-white w-10 py-4 px-6 rounded-lg text-center sm:w-20">
                  {amount}
                </span>
                <button
                  className="bg-gray-200 py-2 px-2 rounded-lg text-[#df94ff] text-sm sm:px-3"
                  onClick={() => changeAmount(1, amount)}
                >
                  +
                </button>
              </div>
              {type === "user" && (
                <button
                  className="bg-[#df94ff] hover:bg-[#a995b2] text-black font-semibold py-2 px-6 rounded-xl text-sm"
                  onClick={() => addToCart()}
                >
                  Add to Cart
                </button>
              )}
              {(type === undefined || type !== "user") && (
                <button
                  className="bg-[#df94ff] text-black font-semibold py-2 px-6 rounded-xl text-sm disabled:bg-[#7e5b8e]"
                  onClick={() => addToCart()}
                  disabled
                >
                  Add to Cart
                </button>
              )}
            </div>
          ) : (
            <div className="text-2xl text-white flex">
              <p className="border-b-2 border-[#df94ff] mb-4 ">
                *Out of stock*
              </p>
            </div>
          )}
        </div>
      </div>
      <Popup isOpen={popupOpen} onClose={() => setPopupOpen(false)} />

      <div className="w-full text-white p-4 flex flex-col items-center">
        <h1 className="border-b-2 border-gray-400 text-3xl mb-4 w-full xl:w-3/4">
          Reviews
        </h1>
        {/* Review Card */}
        {reviews.length === 0 && <div>No Reviews found</div>}
        {reviews.map((review) => {
          return (
            <div
              key={review._id}
              className="bg-[#323232] p-2 rounded-lg mb-2 w-3/4 w-full xl:w-3/4"
            >
              <div className="flex justify-between items-center mb-2">
                {/* Stars */}
                <div className="flex gap-1 text-lg md:text-2xl">
                  {review.rating >= 1 ? (
                    <div className=" p-1 text-[#df94ff]  rounded-full">
                      <FaStar />
                    </div>
                  ) : (
                    <div className=" p-1  rounded-full">
                      <FaRegStar />
                    </div>
                  )}
                  {review.rating >= 2 ? (
                    <div className=" p-1 text-[#df94ff]  rounded-full">
                      <FaStar />
                    </div>
                  ) : (
                    <div className=" p-1  rounded-full">
                      <FaRegStar />
                    </div>
                  )}
                  {review.rating >= 3 ? (
                    <div className=" p-1 text-[#df94ff]  rounded-full">
                      <FaStar />
                    </div>
                  ) : (
                    <div className=" p-1  rounded-full">
                      <FaRegStar />
                    </div>
                  )}
                  {review.rating >= 4 ? (
                    <div className=" p-1 text-[#df94ff]  rounded-full">
                      <FaStar />
                    </div>
                  ) : (
                    <div className=" p-1  rounded-full">
                      <FaRegStar />
                    </div>
                  )}
                  {review.rating >= 5 ? (
                    <div className=" p-1 text-[#df94ff]  rounded-full">
                      <FaStar />
                    </div>
                  ) : (
                    <div className=" p-1  rounded-full">
                      <FaRegStar />
                    </div>
                  )}
                </div>
                <div className="text-sm md:text-lg flex">
                  {format(review.createdAt, "dd-MMM-yyyy")}
                </div>
              </div>

              <div>{review.comment}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ViewProduct;
