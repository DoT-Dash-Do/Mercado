import axios from "axios";
import { useEffect, useState } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import MaybeShowNav from "./components/MaybeShowNav";
import Navbar from "./components/Navbar";
import AddProduct from "./pages/AddProduct";
import Address from "./pages/Address";
import Cart from "./pages/Cart";
import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import Orders from "./pages/Orders";
import PaymentSuccess from "./pages/PaymentSuccess";
import Profile from "./pages/Profile";
import RateProduct from "./pages/RateProduct";
import Register from "./pages/Register";
import SellerDashoard from "./pages/SellerDashoard";
import UpdateProduct from "./pages/UpdateProduct";
import UpdateSingleProduct from "./pages/UpdateSingleProduct";
import ViewProduct from "./pages/ViewProduct";
function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [type, setType] = useState("");
  const [token, setToken] = useState(window.localStorage.getItem("token"));
  const [profilePic, setProfilePic] = useState(null);
  //checking the validity of the user
  useEffect(() => {
    const fetchValidity = async () => {
      try {
        await axios.post("http://localhost:3003/api/user/user-validity", {
          token,
        });
        setLoggedIn(true);
        setType(window.localStorage.getItem("type"));
      } catch (err) {
        setLoggedIn(false);
      }
    };
    fetchValidity();
  }, [token]);

  useEffect(() => {
    const fetchSellerProfilePic = async () => {
      const response = await axios.post(
        "http://localhost:3003/api/seller/get-profile-pic",
        {
          token,
        }
      );

      setProfilePic(response.data.profilePic);
    };

    if (type === "seller") {
      fetchSellerProfilePic();
    }
  }, [type]);

  //implementation of navbar on selected pages is left.
  //navbar will be loaded only once

  return (
    <div className="App">
      <Router>
        <MaybeShowNav>
          <Navbar
            loggedIn={loggedIn}
            profilePic={profilePic}
            setToken={setToken}
            setProfilePic={setProfilePic}
            type={type}
          />
        </MaybeShowNav>

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login setToken={setToken} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/view-product/:id" element={<ViewProduct />} />
          <Route path="/view-orders" element={<Orders />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/userAddress" element={<Address />} />
          <Route path="/Dashboard" element={<SellerDashoard />} />
          <Route path="/add-product" element={<AddProduct />} />
          <Route
            path="/paymentsuccess/:order_id/:address"
            element={<PaymentSuccess />}
          />
          <Route path="/sellerProducts" element={<UpdateProduct />} />
          <Route path="/rate-product/:id" element={<RateProduct />} />
          <Route path="/update-product/:id" element={<UpdateSingleProduct />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
