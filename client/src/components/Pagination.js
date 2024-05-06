import { ArrowFatLineLeft, ArrowFatLineRight } from "phosphor-react";
import React from "react";

const Pagination = ({ totalProducts, limit, page, setCurrentPage }) => {
  const totalPages = Math.ceil(totalProducts.length / limit);

  // if (totalPages === 1) return;
  return (
    <div className="select-none fixed bottom-2 flex justify-center items-center w-full text-white text-sm sm:text-lg z-50">
      <div className="flex items-center p-2 bg-[#323232] rounded-lg">
        <div
          onClick={() => {
            if (page - 1 <= 0) {
              return;
            }
            setCurrentPage(page - 1);
          }}
          className="cursor-pointer p-2 w-12 sm:w-20 flex justify-center items-center text-2xl hover:bg-[#4a4a4a] rounded-md"
        >
          <ArrowFatLineLeft />
        </div>
        <div className="p-2 px-4">
          Page {page} of {totalPages}
        </div>
        <div
          onClick={() => {
            if (page >= totalPages) {
              return;
            }
            setCurrentPage(page + 1);
          }}
          className="cursor-pointer p-2 w-12 sm:w-20 flex justify-center items-center text-2xl hover:bg-[#4a4a4a] rounded-md"
        >
          <ArrowFatLineRight />
        </div>
      </div>
    </div>
  );
};

export default Pagination;
