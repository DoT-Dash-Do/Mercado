import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { FaRegStar, FaStar } from "react-icons/fa6";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "../components/Loading";

const RateProduct = () => {
  const params = useParams();

  const [product, setProduct] = useState({});
  const [activeImg, setActiveImage] = useState("");
  const [loading, setLoading] = useState(false);
  const [comment, setComment] = useState("");
  const [error, setError] = useState("");
  const errorRef = useRef();

  const [stars, setStars] = useState(0);

  const navigate = useNavigate();

  const fetchProduct = async () => {
    try {
      setLoading(true);
      const response = await axios.post(
        "https://mercado-bq2x.onrender.com/api/product/fetch-single-product",
        {
          productId: params.id,
        }
      );
      if (response.data.product && response.data.product.images) {
        setProduct(response.data.product);
        setActiveImage(response.data.product.images[0]);
      } else {
        console.error("Product or images not found in the response");
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchProduct();
  }, []);

  const handleCancel = () => {
    navigate("/view-orders");
  };
  const handlePost = async () => {
    if (stars <= 0) {
      setError("Please provide a rating");
      errorRef.current?.scrollIntoView();
      return;
    }

    if (comment === "") {
      setError("Please provide a comment for the review");
      errorRef.current?.scrollIntoView();
      return;
    }

    try {
      const token = window.localStorage.getItem("token");
      const response = await axios.post(
        "https://mercado-bq2x.onrender.com/api/review/add-review",
        {
          comment,
          rating: stars,
          product,
          token,
        }
      );

      console.log(response.data.message);
      navigate("/view-orders");
    } catch (err) {
      setError("Authentication failed");
      console.log(err);
    }
  };

  if (loading) return <Loading />;

  return (
    <div className="pt-16 w-full h-screen bg-[#1f1f1f] enableScroll">
      <div className="w-full p-4">
        {/* Product Details */}
        <div className="w-full bg-[#323232] rounded-lg flex p-4 mb-8">
          <div className="image flex-shrink-0 w-32 h-32 md:w-44 md:h-44 xl:w-64 xl:h-64 border-2 rounded-lg border-gray-400">
            <img
              className="w-full h-full object-contain rounded-md"
              src={activeImg}
              alt="monster"
            />
          </div>
          <div className="m-2 w-full text-white">
            <div className="p-2 border-b-2 border-gray-400 text-xl w-full">
              {product.ProductName}
            </div>
            <div className="p-2 text-base">{product.type}</div>
          </div>
        </div>
        {/* Review */}
        <div className="text-2xl md:text-3xl flex justify-center text-white text-center mb-2">
          <p>Post your review</p>
        </div>
        <div className="w-full flex justify-center">
          {/* Review card */}

          <div className="w-96 bg-[#323232] rounded-lg p-2 md:p-4 text-white">
            {/* STARS */}
            <div className="flex gap-1 mb-4 text-xl md:text-2xl">
              {stars >= 1 ? (
                <div
                  onClick={() => setStars(1)}
                  className=" p-1 text-[#df94ff] hover:text-[#d166ff] rounded-full"
                >
                  <FaStar />
                </div>
              ) : (
                <div
                  onClick={() => setStars(1)}
                  className=" p-1 hover:bg-[#4a4a4a] rounded-full"
                >
                  <FaRegStar />
                </div>
              )}
              {stars >= 2 ? (
                <div
                  onClick={() => setStars(2)}
                  className=" p-1 text-[#df94ff] hover:text-[#d166ff] rounded-full"
                >
                  <FaStar />
                </div>
              ) : (
                <div
                  onClick={() => setStars(2)}
                  className=" p-1 hover:bg-[#4a4a4a] rounded-full"
                >
                  <FaRegStar />
                </div>
              )}
              {stars >= 3 ? (
                <div
                  onClick={() => setStars(3)}
                  className=" p-1 text-[#df94ff] hover:text-[#d166ff] rounded-full"
                >
                  <FaStar />
                </div>
              ) : (
                <div
                  onClick={() => setStars(3)}
                  className=" p-1 hover:bg-[#4a4a4a] rounded-full"
                >
                  <FaRegStar />
                </div>
              )}
              {stars >= 4 ? (
                <div
                  onClick={() => setStars(4)}
                  className=" p-1 text-[#df94ff] hover:text-[#d166ff] rounded-full"
                >
                  <FaStar />
                </div>
              ) : (
                <div
                  onClick={() => setStars(4)}
                  className=" p-1 hover:bg-[#4a4a4a] rounded-full"
                >
                  <FaRegStar />
                </div>
              )}
              {stars >= 5 ? (
                <div
                  onClick={() => setStars(5)}
                  className=" p-1 text-[#df94ff] hover:text-[#d166ff] rounded-full"
                >
                  <FaStar />
                </div>
              ) : (
                <div
                  onClick={() => setStars(5)}
                  className=" p-1 hover:bg-[#4a4a4a] rounded-full"
                >
                  <FaRegStar />
                </div>
              )}
            </div>

            {/* Comment */}
            <div className="text-lg md:text-xl">
              <label htmlFor="comment">Comment</label>
              <textarea
                className="text-sm md:text-base w-full h-40 resize-none text-white mb-4 outline-none p-2 rounded-md placeholder-gray-400 bg-[#222222] focus:scale-[1.01] transition duration-150 style-3"
                id="comment"
                placeholder=".  .  ."
                autoComplete="off"
                value={comment}
                onChange={(e) => {
                  setComment(e.target.value);
                }}
              />
            </div>

            <div className="flex justify-between text-base select-none">
              <div
                onClick={handleCancel}
                className="p-2 w-20 md:w-24 text-sm md:text-base flex justify-center items-center rounded-md bg-[#323232] hover:bg-[#4a4a4a] cursor-pointer"
              >
                Cancel
              </div>
              <div
                onClick={handlePost}
                className="p-2 w-20 md:w-24 text-sm md:text-base flex justify-center items-center rounded-md bg-[#df94ff] text-black hover:bg-[#d166ff] cursor-pointer"
              >
                Post
              </div>
            </div>
          </div>
        </div>
      </div>
      {error && (
        <div ref={errorRef} className=" flex justify-center font-semibold">
          <div className="bg-gray-200 text-black p-2 text-sm md:text-base text-center rounded-lg">
            {error}
          </div>
        </div>
      )}
    </div>
  );
};

export default RateProduct;
