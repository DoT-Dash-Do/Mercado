import axios from "axios";
import { CurrencyInr } from "phosphor-react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function UpdateProduct() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchProductsOnHomePage = async () => {
      try {
        const token = window.localStorage.getItem("token");
        const response = await axios.post(
          "https://mercado-bq2x.onrender.com/api/product/fetch-seller-products",
          {
            token,
          }
        );
        setProducts(response.data.products);
      } catch (error) {
        console.log(error.response.data);
      }
    };
    fetchProductsOnHomePage();
  }, []);

  const handleUpdate = (e) => {
    navigate(`/update-product/${e.currentTarget.id}`);
  };

  return (
    <div className="pt-16  w-full h-screen bg-[#1f1f1f] enableScroll">
      <div className="w-full flex flex-wrap justify-center">
        {/* PRODUCT CARD */}
        {products.map((product) => {
          return (
            <div
              key={product._id}
              className="text-white bg-[#3b3b3b] w-64 h-80 m-8 rounded-lg select-none cursor-pointer"
            >
              <div className="h-56 p-2 rounded-t-lg">
                <img
                  className="w-full h-full object-cover rounded-md"
                  src={
                    product.images[0] ||
                    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQuKaWgRjHVDbkzxYfB5AYZHOmlvl-p2VoIUKlapKWM5A&s"
                  }
                  alt="Product"
                />
              </div>
              <div className=" h-12 px-2">
                <div className="text-xs flex items-center w-1/3">
                  {product.type}
                </div>
                <div className="text-lg flex items-center w-11/12 truncate">
                  {product.ProductName}
                </div>
              </div>

              <div className="flex justify-between items-center h-12 px-2 ">
                <div className="flex items-center">
                  <CurrencyInr size={16} />
                  {product.price}
                </div>
                <div
                  onClick={handleUpdate}
                  id={product._id}
                  className="p-1 px-3 hover:bg-[#323232] text-[#df94ff] rounded-md"
                >
                  Edit
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
