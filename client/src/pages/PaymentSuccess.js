import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "../components/Loading";
import OrderFailed from "../components/OrderFailed";
import OrderPlaced from "../components/OrderPlaced";

export default function PaymentSuccess() {
  const [orderStatus, setOrderStatus] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const params = useParams();
  const placeOrder = async () => {
    const { address, order_id } = params;
    const token = window.localStorage.getItem("token");
    try {
      setLoading(true);
      const response = await axios.post(
        "http://localhost:3003/api/order/place-order",
        {
          token: token,
          order_id: order_id,
          update_id: address,
        }
      );
      setLoading(false);
      setOrderStatus(true);
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (error) {
      setLoading(false);
      setOrderStatus(false);
    }
  };

  useEffect(() => {
    placeOrder();
  }, []);

  if (loading) return <Loading />;

  return <>{orderStatus ? <OrderPlaced /> : <OrderFailed />} </>;
}
