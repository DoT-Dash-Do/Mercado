import axios from "axios";
import { CurrencyInr } from "phosphor-react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Pagination from "../components/Pagination";

const HomePage = () => {
  const [sidebar, setSidebar] = useState(false);
  const [products, setProducts] = useState([]);
  const type = window.localStorage.getItem("type");

  // pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const lastIndex = currentPage * limit;
  const firstIndex = lastIndex - limit;

  const currentProducts = products.slice(firstIndex, lastIndex);

  const navigate = useNavigate();

  useEffect(() => {
    try {
      const fetchProductsOnHomePage = async () => {
        const response = await axios.get(
          "https://mercado-bq2x.onrender.com/api/product/fetch-all-products"
        );
        setProducts(response.data.products);
      };
      fetchProductsOnHomePage();
    } catch (err) {
      console.log("no internet connection");
    }
  }, []);

  const handleSidebarView = () => {
    setSidebar(!sidebar);
  };

  const handleProductNavigate = (e) => {
    navigate(`/view-product/${e.currentTarget.id}`);
  };

  return (
    <>
      <div className="pt-16  w-full h-screen bg-[#1f1f1f] enableScroll">
        <div className="w-full flex flex-wrap justify-center mb-20">
          {/* PRODUCT CARD */}
          {currentProducts.map((product) => {
            return (
              <div
                key={product._id}
                id={product._id}
                onClick={handleProductNavigate}
                className="text-white bg-[#3b3b3b] w-full sm:w-64 h-80 m-8 rounded-lg select-none cursor-pointer"
              >
                <div className="h-56 p-2 rounded-t-lg">
                  <img
                    className="w-full h-full object-contain rounded-md"
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
                  {type === "user" && (
                    <div className="p-1 hover:bg-[#323232] text-[#df94ff] rounded-md">
                      Add to cart
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
        <Pagination
          totalProducts={products}
          limit={limit}
          page={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </div>
    </>
  );
};

export default HomePage;
