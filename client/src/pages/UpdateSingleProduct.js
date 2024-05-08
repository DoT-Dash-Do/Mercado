import axios from "axios";
import firebase from "firebase/compat/app";
import "firebase/compat/storage";
import { ArrowLeft, Trash } from "phosphor-react";
import { default as React, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "../components/Loading";

const UpdateSingleProduct = () => {
  const params = useParams();
  const [loading, setLoading] = useState(false);

  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [type, setType] = useState("");
  const [price, setPrice] = useState(0);
  const [stock, setStock] = useState(0);
  const [images, setImages] = useState([]);

  const [error, setError] = useState(false);
  const errorRef = useRef();

  const navigate = useNavigate();

  const fetchProduct = async () => {
    const token = window.localStorage.getItem("token");

    try {
      setLoading(true);
      const response = await axios.post(
        "https://mercado-bq2x.onrender.com/api/product/fetch-single-product",
        {
          token,
          productId: params.id,
        }
      );
      setName(response.data.product.ProductName);
      setDesc(response.data.product.description);
      setType(response.data.product.type);
      setPrice(response.data.product.price);
      setStock(response.data.product.stock);
      setImages(response.data.product.images);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      console.log("Authentication failed");
    }
  };

  useEffect(() => {
    fetchProduct();
  }, []);

  const handleImageDel = async (e) => {
    setLoading(true);
    await images.splice(e.currentTarget.id, 1);
    setImages(images);
    setLoading(false);
  };

  const handleFileUpload = (e) => {
    const selectedFile = e.target.files[0];
    setLoading(true);
    if (selectedFile) {
      const storageRef = firebase.storage().ref();
      const fileRef = storageRef.child(selectedFile.name);

      fileRef.put(selectedFile).then((snapshot) => {
        snapshot.ref.getDownloadURL().then((downloadURL) => {
          images.push(downloadURL);
          setLoading(false);
        });
      });
    } else {
      console.log("No file selected");
    }
  };

  const handleCancel = (e) => {
    navigate("/sellerProducts");
  };

  const handleSave = async (e) => {
    e.preventDefault();

    if (name.length < 3) {
      setError("Product name cannot be less than 3 characters");
      errorRef.current?.scrollIntoView();
      return;
    }

    if (desc.length < 40) {
      setError("Product description cannot be less than 40 characters");
      errorRef.current?.scrollIntoView();
      return;
    }

    if (type.length < 3) {
      setError("Product Type cannot be less than 3 characters");
      errorRef.current?.scrollIntoView();
      return;
    }

    if (price === 0) {
      setError("Please provide a price");
      errorRef.current?.scrollIntoView();
      return;
    }

    if (images.length < 2) {
      setError("Please provide atleast 2 images");
      errorRef.current?.scrollIntoView();
      return;
    }
    try {
      const token = window.localStorage.getItem("token");
      const response = await axios.put(
        "https://mercado-bq2x.onrender.com/api/product/update-product",
        {
          ProductName: name,
          type,
          description: desc,
          price,
          stock,
          images,
          productId: params.id,
          token,
        }
      );

      navigate("/sellerProducts");
    } catch (err) {
      console.log("Invalid Authentication");
    }
  };

  if (loading) return <Loading />;

  return (
    <div className="pt-16 w-full bg-[#1f1f1f] h-screen enableScroll">
      <div
        onClick={() => navigate("/sellerProducts")}
        className="fixed left-4 top-20 text-2xl z-50 text-white p-2 rounded-full select-none cursor-pointer bg-[#121212] hover:bg-[#323232] shadow-sm shadow-white"
      >
        <ArrowLeft />
      </div>

      <div className="w-full p-4 md:p-8 flex flex-col items-center text-white">
        <h1 className="text-2xl md:text-4xl select-none mb-4">
          Update product
        </h1>
        {/* PRODUCT CARD */}
        <div className="w-full lg:w-3/4 bg-[#282828] p-4 md:p-8 rounded-lg">
          <div className="w-full">
            <label
              htmlFor="name"
              className="text-base md:text-lg select-none tracking-wider ml-1"
            >
              Name
            </label>
            <input
              className="text-sm md:text-base w-full text-white mb-4 outline-none p-2 rounded-md placeholder-gray-400 bg-[#222222] focus:scale-[1.01] transition duration-150"
              id="name"
              type="text"
              placeholder=".  .  ."
              autoComplete="off"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
          </div>

          <div className="w-full">
            <label
              htmlFor="desc"
              className="text-base md:text-lg select-none tracking-wider ml-1"
            >
              Description
            </label>
            <textarea
              className="text-sm md:text-base w-full h-40 resize-none text-white mb-4 outline-none p-2 rounded-md placeholder-gray-400 bg-[#222222] focus:scale-[1.01] transition duration-150"
              id="desc"
              type="text"
              placeholder=".  .  ."
              autoComplete="off"
              value={desc}
              onChange={(e) => {
                setDesc(e.target.value);
              }}
            />
          </div>

          <div className="w-full flex gap-4 md:gap-8">
            <div className="w-1/3">
              <div className="w-full">
                <label
                  htmlFor="type"
                  className="text-base md:text-lg select-none tracking-wider ml-1"
                >
                  Type
                </label>
                <input
                  className="text-sm md:text-base w-full text-white mb-4 outline-none p-2 rounded-md placeholder-gray-400 bg-[#222222] focus:scale-[1.01] transition duration-150"
                  id="type"
                  type="text"
                  placeholder=".  .  ."
                  autoComplete="off"
                  value={type}
                  onChange={(e) => {
                    setType(e.target.value);
                  }}
                />
              </div>
            </div>
            <div className="w-1/3">
              <div className="w-full">
                <label
                  htmlFor="price"
                  className="text-base md:text-lg select-none tracking-wider ml-1"
                >
                  Price
                </label>
                <input
                  className="text-sm md:text-base w-full text-white mb-4 outline-none p-2 rounded-md placeholder-gray-400 bg-[#222222] focus:scale-[1.01] transition duration-150"
                  id="price"
                  type="number"
                  placeholder=".  .  ."
                  autoComplete="off"
                  value={price}
                  onChange={(e) => {
                    console.log(typeof e.target.value);
                    setPrice(e.target.value);
                  }}
                />
              </div>
            </div>
            <div className="w-1/3">
              <div className="w-full">
                <label
                  htmlFor="stock"
                  className="text-base md:text-lg select-none tracking-wider ml-1"
                >
                  Stock
                </label>
                <input
                  className="text-sm md:text-base w-full text-white mb-4 outline-none p-2 rounded-md placeholder-gray-400 bg-[#222222] focus:scale-[1.01] transition duration-150"
                  id="stock"
                  type="number"
                  placeholder=".  .  ."
                  autoComplete="off"
                  value={stock}
                  onChange={(e) => {
                    setStock(e.target.value);
                  }}
                />
              </div>
            </div>
          </div>

          {/* IMAGES SECTION */}

          <div className="text-sm sm:text-base md:text-lg mb-8">
            <h1 className="mb-2 pl-1">Add image : </h1>
            <input
              type="file"
              className="text-stone-500
          file:mr-5 file:py-1 file:px-3 file:font-medium
          file:bg-[#323232] file:text-white
          hover:file:cursor-pointer hover:file:bg-[#4a4a4a]
           file:rounded-l-md file:outline-none file:border-none file:py-2 w-full"
              onChange={handleFileUpload}
              accept="image/*"
            />
          </div>

          <h1 className="pl-1 text-sm sm:text-base md:text-lg">Images :</h1>

          <div className="flex flex-wrap p-4 gap-4 bg-[#323232] rounded-md justify-around mb-8">
            {images.map((img, i) => {
              return (
                <div key={i} id={i} className="border-2 relative rounded-lg">
                  <div className="flex justify-end absolute right-0">
                    <div
                      id={i}
                      onClick={handleImageDel}
                      className="p-2 text-2xl bg-[#df94ff] text-black select-none cursor-pointer rounded-tr-md"
                    >
                      <Trash />
                    </div>
                  </div>
                  <div className="w-36 md:w-48 h-36 md:h-48 border-2 border-gray-500 rounded-md">
                    <img
                      src={img}
                      alt="Loading . . ."
                      className="flex justify-center items-center w-full h-full rounded-md object-contain"
                    />
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex justify-between text-base select-none mb-4">
            <div
              onClick={handleCancel}
              className="p-2 w-20 md:w-28 text-sm md:text-base flex justify-center items-center rounded-md bg-[#323232] hover:bg-[#4a4a4a] cursor-pointer"
            >
              Cancel
            </div>
            <div
              onClick={handleSave}
              className="p-2 w-20 md:w-28 text-sm md:text-base flex justify-center items-center rounded-md bg-[#df94ff] text-black hover:bg-[#d166ff] cursor-pointer"
            >
              Update
            </div>
          </div>
        </div>
        {error && (
          <div
            ref={errorRef}
            className="bg-gray-200 text-black p-2 text-sm md:text-base font-semibold text-center rounded-lg mt-8"
          >
            {error}
          </div>
        )}
      </div>
    </div>
  );
};

export default UpdateSingleProduct;
