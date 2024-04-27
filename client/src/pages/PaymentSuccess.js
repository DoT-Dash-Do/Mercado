import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
export default function PaymentSuccess() {
  const navigate = useNavigate();
  const params = useParams();
  const placeOrder = async () => {
    const { address, order_id } = params;
    const token = window.localStorage.getItem("token");
    try {
      const response = await axios.post(
        "http://localhost:3003/api/order/add-order",
        {
          token: token,
          address: address,
          order_id: order_id,
        }
      );
      navigate("/");
    } catch (error) {
      
    }
  };
  return (
    <div className="pt-16">
      <button className="bg-black p-2 text white" onClick={placeOrder}>
          continue
      </button>
      your order has been placed
    </div>
  );
}