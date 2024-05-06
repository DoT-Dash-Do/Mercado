import axios from "axios";
import { CurrencyInr } from "phosphor-react";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Pagination from "../components/Pagination";
const SearchPage = () => {
  const [sidebar, setSidebar] = useState(false);
  const [products, setProducts] = useState([]);

  const { query } = useParams();

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
          `http://localhost:3003/api/product/search-products/${query}`
        );
        setProducts(response.data.result);
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
      {/* {sidebar && (
    <div className="fixed pt-16 top-0 left-0 w-80 h-screen bg-[#121212] text-white enableScroll select-none z-40 transition duration-500 ease-in-out">
      <div className="w-full pt-4 flex p-4">
        <div
          onClick={handleSidebarView}
          className="p-2 rounded-full cursor-pointer hover:bg-[#323232]"
        >
          <X size={28} />
        </div>
      </div>
      <div className="text-lg p-4">
        <h1 className="text-xl">Filter</h1>
      </div>
    </div>
  )} */}

      <div className="pt-16  w-full h-screen bg-[#1f1f1f] enableScroll">
        {/* <div className="w-full flex justify-center p-4">
      <div className="w-full flex justify-between items-center text-white select-none">
        <div
          onClick={handleSidebarView}
          className="p-2 flex justify-center items-center rounded-full cursor-pointer hover:bg-[#323232]"
        >
          <List size={28} />
        </div>
        <div className="p-2 border-2 w-24 flex justify-center items-center rounded-md cursor-pointer">
          Sort by
        </div>
      </div>
    </div> */}
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
                  <div className="p-1 hover:bg-[#323232] text-[#df94ff] rounded-md">
                    Add to cart
                  </div>
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

export default SearchPage;
