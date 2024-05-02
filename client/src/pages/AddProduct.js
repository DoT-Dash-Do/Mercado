import firebase from "firebase/compat/app";
import "firebase/compat/storage";
import { Trash } from "phosphor-react";
import React, { useState } from "react";

const AddProduct = () => {
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [type, setType] = useState("");
  const [price, setPrice] = useState(null);
  const [stock, setStock] = useState(null);
  const [images, setImages] = useState([]);

  const [value, setValue] = useState(false);

  const handleFileUpload = (e) => {
    const selectedFile = e.target.files[0];
    setValue(true);
    if (selectedFile) {
      const storageRef = firebase.storage().ref();
      const fileRef = storageRef.child(selectedFile.name);

      fileRef.put(selectedFile).then((snapshot) => {
        snapshot.ref.getDownloadURL().then((downloadURL) => {
          images.push(downloadURL);
          setValue(false);
        });
      });
    } else {
      console.log("No file selected");
    }
  };

  const handleImageDel = async (e) => {
    setValue(true);
    await images.splice(e.currentTarget.id, 1);
    setImages(images);
    setValue(false);
  };

  if (value) {
    return (
      <div className="fixed top-0 w-full h-screen z-20 flex justify-center items-center p-4 bg-black bg-opacity-75 backdrop-blur-sm">
        <div className="bg-[#282828] p-2 py-6 md:py-6 md:p-6 text-white w-full md:w-3/4 xl:w-5/12 rounded-lg">
          <div className="w-full flex justify-center items-center text-xl md:text-2xl">
            <h1>Loading . . . </h1>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-16 w-full bg-[#1f1f1f] h-screen enableScroll">
      <div className="w-full p-8 flex flex-col items-center text-white">
        <h1 className="text-4xl select-none">Add product</h1>
        {/* PRODUCT CARD */}
        <div className="w-3/4 bg-[#282828] p-8 rounded-lg">
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
            />
          </div>

          <div className="w-full flex gap-8">
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
                  <div className="w-48 h-48 border-2 border-gray-500 rounded-md">
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
            <div className="p-2 w-28 flex justify-center items-center rounded-md bg-[#323232] hover:bg-[#4a4a4a] cursor-pointer">
              Cancel
            </div>
            <div className="p-2 w-28 flex justify-center items-center rounded-md bg-[#323232] hover:bg-[#4a4a4a] cursor-pointer">
              Save
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
