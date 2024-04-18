import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ViewProduct = () => {
  const params = useParams();

  const [product, setProduct] = useState({});

  useEffect(() => {
    const fetchProduct = async () => {
      const response = await axios.post(
        "http://localhost:3003/api/product/fetch-single-product",
        {
          productId: params.id,
        }
      );
      console.log(response.data.product);
      setProduct(response.data.product);
    };

    fetchProduct();
  }, []);

  return <div className="bg-red-200 pt-16 w-full h-screen">ViewProduct</div>;
};

export default ViewProduct;
