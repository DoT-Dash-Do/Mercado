import {
  IdentificationCard,
  MagnifyingGlass,
  Receipt,
  ShoppingCartSimple,
  X,
} from "phosphor-react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Navbar = ({ loggedIn, profilePic, setToken, setProfilePic, type }) => {
  const navigate = useNavigate();
  const [menuBar, setMenuBar] = useState(false);
  const [miniSearch, setMiniSearch] = useState(false);
  const [search, setSearch] = useState("");
  const [displayPP, setDisplayPP] = useState(
    "https://i.pinimg.com/736x/83/bc/8b/83bc8b88cf6bc4b4e04d153a418cde62.jpg"
  );

  useEffect(() => {
    if (profilePic === null || profilePic === undefined || profilePic === "") {
      setDisplayPP(
        "https://i.pinimg.com/736x/83/bc/8b/83bc8b88cf6bc4b4e04d153a418cde62.jpg"
      );
    } else {
      setDisplayPP(profilePic);
    }
  }, [profilePic]);

  const handleLoginNav = () => {
    navigate("/login");
    setMenuBar(false);
  };

  const handleRegisterNav = () => {
    navigate("/register");
    setMenuBar(false);
  };

  const handleProfileNav = () => {
    if (!loggedIn) {
      navigate("login");
    } else {
      navigate("/profile");
    }
    setMenuBar(false);
  };

  const handleHomeNav = () => {
    navigate("/");
    setMenuBar(false);
  };

  const handleMenuBar = () => {
    setMenuBar(!menuBar);
  };

  const handleOrderNav = () => {
    navigate("/view-orders");
    setMenuBar(false);
  };

  const handleLogoutNav = () => {
    setToken("");
    setProfilePic(null);
    window.localStorage.removeItem("token");
    window.localStorage.removeItem("type");
    navigate("/login");
    setMenuBar(false);
  };
  const openCart = () => {
    navigate("/cart");
    setMenuBar(false);
  };

  const dashboradNav = () => {
    navigate("/Dashboard");
    setMenuBar(false);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const query = search.trim().split(" ").join("-");

    if (query === "") {
      return;
    }

    setMiniSearch(false);
    setMenuBar(false);
    navigate(`/search/${query}`);
  };
  return (
    <>
      {/* SEARCH */}
      {miniSearch && (
        <div className="w-full absolute top-16 flex lg:hidden p-2 bg-[#121212]">
          <form
            onSubmit={handleSearch}
            className="h-10 w-full flex items-center justify-center rounded-lg"
          >
            <input
              className="text-sm md:text-base w-full sm:flex-grow h-full text-white outline-none p-2 rounded-l-md placeholder-gray-400 bg-[#222222] focus:scale-[1.005] transition duration-150"
              id="password"
              type="text"
              placeholder="Search products . . ."
              autoComplete="off"
              value={search}
              onClick={() => setMenuBar(false)}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button className="w-20 sm:w-32 h-full text-2xl flex justify-center items-center text-[#df94ff] bg-[#4a4a4a] rounded-r-md">
              <MagnifyingGlass />
            </button>
            <div
              onClick={() => setSearch("")}
              className="absolute right-20 sm:right-36 bg-[#222222] text-2xl rounded-full cursor-pointer text-gray-400"
            >
              <X />
            </div>
          </form>
        </div>
      )}

      {/* NAVBAR */}

      <div className="fixed top-0 z-50 w-full h-16 bg-[#121212] text-white select-none flex justify-between text-base">
        <div className="flex w-3/4 h-full items-center">
          {/* LEFT DIV */}
          <div
            onClick={handleHomeNav}
            className="w-40 shrink-0 sm:w-48 h-full text-2xl sm:text-3xl flex justify-center items-center cursor-pointer "
          >
            <h1>Mercado</h1>
          </div>
          <form
            onSubmit={handleSearch}
            className="h-full flex-grow hidden lg:flex items-center justify-center p-2 py-3 relative"
          >
            <input
              className="text-sm md:text-base w-full h-full text-white outline-none p-2 rounded-l-md placeholder-gray-400 bg-[#222222] focus:scale-[1.005] transition duration-150"
              id="password"
              type="text"
              placeholder="Search products . . ."
              autoComplete="off"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button className="w-28 sm:w-32 h-full text-2xl flex justify-center items-center bg-[#4a4a4a] text-[#df94ff] rounded-r-md">
              <MagnifyingGlass />
            </button>
            <div
              onClick={() => setSearch("")}
              className="absolute right-36 bg-[#222222] text-2xl rounded-full cursor-pointer text-gray-400"
            >
              <X />
            </div>
          </form>
          <div className="h-full flex text-2xl lg:hidden items-center justify-center">
            <button
              onClick={() => setMiniSearch(!miniSearch)}
              className="flex items-center justify-center p-3 hover:bg-[#323232] rounded-full"
            >
              <MagnifyingGlass />
            </button>
          </div>
        </div>
        {/* RIGHT DIV */}
        <div className="md:flex hidden">
          {type === "user" || type === "seller" ? (
            <div
              onClick={handleProfileNav}
              className="w-16 flex items-center justify-center border-gray-400 text-xl cursor-pointer hover:bg-[#323232]"
            >
              <div className="w-10 h-10 sm:w-10 sm:h-10 rounded-full border-gray-400 text-xl">
                <img
                  className="rounded-full w-full h-full object-cover"
                  src={displayPP}
                  alt="Img"
                />
              </div>
            </div>
          ) : (
            <div className="w-16 flex items-center justify-center border-gray-400 text-xl cursor-pointer hover:bg-[#323232]">
              <div className="w-10 h-10 sm:w-10 sm:h-10 rounded-full border-gray-400 text-xl">
                <img
                  className="rounded-full w-full h-full object-cover"
                  src={displayPP}
                  alt="Img"
                />
              </div>
            </div>
          )}

          {loggedIn && (
            <>
              {type === "user" ? (
                <div
                  onClick={handleOrderNav}
                  title="Orders"
                  className="w-16 flex justify-center items-center cursor-pointer hover:bg-[#323232]"
                >
                  <Receipt size={24} />
                </div>
              ) : (
                <></>
              )}

              {type === "user" ? (
                <div
                  title="Cart"
                  className="w-16 flex justify-center items-center cursor-pointer hover:bg-[#323232]"
                  onClick={() => openCart()}
                >
                  <ShoppingCartSimple size={24} />
                </div>
              ) : (
                <div
                  title="Dashboard"
                  className="w-16 flex justify-center items-center cursor-pointer hover:bg-[#323232]"
                  onClick={dashboradNav}
                >
                  <IdentificationCard size={24} />
                </div>
              )}
            </>
          )}

          {!loggedIn && (
            <div className="flex w-48 p-3 rounded-lg">
              <div
                onClick={handleLoginNav}
                className="w-24 flex justify-center items-center cursor-pointer hover:bg-[#323232] rounded-md"
              >
                Login
              </div>
              <div
                onClick={handleRegisterNav}
                className="w-24 flex justify-center items-center cursor-pointer hover:bg-[#323232] rounded-md"
              >
                Register
              </div>
            </div>
          )}
          {loggedIn && (
            <div className="flex w-28 p-3 rounded-lg">
              <div
                onClick={handleLogoutNav}
                className="w-24 flex justify-center items-center cursor-pointer hover:bg-[#323232] rounded-md"
              >
                Logout
              </div>
            </div>
          )}
        </div>

        {/* MENUBAR ICON */}
        <div className="md:hidden flex justify-center items-center select-none">
          <div
            onClick={handleMenuBar}
            className="w-16 h-16 flex justify-center items-center cursor-pointer hover:bg-[#323232] text-white"
          >
            <div className="w-10 h-10 sm:w-10 sm:h-10 rounded-full border-gray-400 text-xl">
              <img
                className="rounded-full w-full h-full object-cover"
                src={displayPP}
                alt="Img"
              />
            </div>
          </div>
        </div>

        {/* MENUBAR */}
      </div>
      {menuBar && (
        <div className="fixed md:hidden right-0 top-16 w-48 bg-[#121212] text-white rounded-bl-lg z-50 shadow-sm shadow-gray-600">
          {" "}
          {!loggedIn && (
            <>
              {" "}
              <div
                onClick={handleLoginNav}
                title="Login"
                className="w-full h-10 flex justify-center items-center cursor-pointer hover:bg-[#323232]"
              >
                Login
              </div>
              <div
                onClick={handleRegisterNav}
                title="Register"
                className="w-full h-10 flex justify-center items-center cursor-pointer hover:bg-[#323232]"
              >
                Register
              </div>{" "}
            </>
          )}
          {loggedIn && (
            <>
              {type === "user" ? (
                <>
                  <div
                    title="Profile"
                    onClick={handleProfileNav}
                    className="w-full h-10 flex justify-center items-center cursor-pointer hover:bg-[#323232]"
                  >
                    Profile
                  </div>
                  <div
                    title="Cart"
                    className="w-full h-10 flex justify-center items-center cursor-pointer hover:bg-[#323232]"
                  >
                    Cart
                  </div>
                  <div
                    title="Orders"
                    className="w-full h-10 flex justify-center items-center cursor-pointer hover:bg-[#323232]"
                  >
                    Orders
                  </div>
                </>
              ) : (
                <>
                  <div
                    title="Dashboard"
                    onClick={dashboradNav}
                    className="w-full h-10 flex justify-center items-center cursor-pointer hover:bg-[#323232]"
                  >
                    Dashboard
                  </div>
                  <div
                    title="Profile"
                    onClick={handleProfileNav}
                    className="w-full h-10 flex justify-center items-center cursor-pointer hover:bg-[#323232]"
                  >
                    Profile
                  </div>
                </>
              )}

              <div
                onClick={handleLogoutNav}
                title="Register"
                className="w-full h-10 flex justify-center items-center cursor-pointer hover:bg-[#323232] rounded-bl-md"
              >
                Logout
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
};

export default Navbar;
