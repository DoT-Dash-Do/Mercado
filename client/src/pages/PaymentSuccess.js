import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
export default function PaymentSuccess() {
  const [button, setButton] = useState(true);
  const navigate = useNavigate();
  const params = useParams();
  const placeOrder = async () => {
    const { address, order_id } = params;
    const token = window.localStorage.getItem("token");
    try {
      setButton(false);
      const response = await axios.post(
        "http://localhost:3003/api/order/place-order",
        {
          token: token,
          order_id: order_id,
          update_id: address
        }
      );
      navigate("/");
    } catch (error) {}
  };

  useEffect((
    ()=>{
      placeOrder();
    }
  ),[])
  return (
    <div className="pt-16">
      your order has been placed
    </div>
  );
}
