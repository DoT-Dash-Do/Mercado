import axios from "axios";
import firebase from "firebase/compat/app";
import "firebase/compat/storage";
import React, { useState } from "react";

const ProfilePopup = ({
  popPlaceholder,
  profilePic,
  profilePop,
  setProfilePop,
}) => {
  const profile =
    profilePic === ""
      ? "https://i.pinimg.com/736x/83/bc/8b/83bc8b88cf6bc4b4e04d153a418cde62.jpg"
      : profilePic;
  const [imgUrl, setImgUrl] = useState("");
  const [value, setValue] = useState(false);
  const [error, setError] = useState("");
  const token = window.localStorage.getItem("token");

  const handleFileUpload = (e) => {
    const selectedFile = e.target.files[0];
    setValue(true);
    if (selectedFile) {
      const storageRef = firebase.storage().ref();
      const fileRef = storageRef.child(selectedFile.name);

      fileRef.put(selectedFile).then((snapshot) => {
        snapshot.ref.getDownloadURL().then((downloadURL) => {
          console.log(downloadURL);
          setImgUrl(downloadURL);
          setValue(false);
        });
      });
    } else {
      console.log("No file selected");
    }
  };

  if (value) {
    return (
      <div className="fixed top-0 w-full h-screen z-20 flex justify-center items-center p-4 bg-black bg-opacity-75 backdrop-blur-sm">
        <div className="bg-[#282828] p-2 py-6 md:py-6 md:p-6 text-white w-full md:w-3/4 xl:w-5/12 rounded-lg">
          <div className="w-full flex justify-center items-center text-xl md:text-2xl">
            <h1>Uploading . . . </h1>
          </div>
        </div>
      </div>
    );
  }

  const handleCancel = () => {
    setProfilePop(!profilePop);
  };

  const handleSave = async () => {
    try {
      new URL(imgUrl);
    } catch (err) {
      setError("The url is not valid");
      return;
    }

    try {
      await axios.put("http://localhost:3003/api/user/updateUser/profilePic", {
        token,
        updatedField: imgUrl,
      });

      setProfilePop(!profilePop);
    } catch (err) {
      setError("An error occured");
    }

    console.log("save");
  };
  return (
    <div className="fixed top-0 w-full h-screen z-20 flex justify-center items-center p-4 bg-black bg-opacity-75 backdrop-blur-sm">
      <div className="bg-[#282828] p-2 py-6 md:py-6 md:p-6 text-white w-full md:w-3/4 xl:w-5/12 rounded-lg">
        <div className="w-full flex justify-center items-center text-xl md:text-2xl mb-6">
          <h1>Update {popPlaceholder}</h1>
        </div>

        <div className="text-sm sm:text-base md:text-lg">
          <h1 className="mb-2 pl-1">Upload any image : </h1>
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

        <div className="justify-center flex w-full my-6">
          <div>OR</div>
        </div>

        <div className="text-sm sm:text-base md:text-lg">
          <input
            className="w-full text-gray-300 mb-4 mt-2 outline-none p-2 rounded-md placeholder-gray-400 bg-[#222222] focus:scale-[1.015] transition duration-150"
            id="email"
            type="text"
            placeholder={`Enter image URL`}
            value={imgUrl}
            onChange={(e) => setImgUrl(e.target.value)}
            autoComplete="off"
          />
        </div>

        <div className="w-full flex justify-center items-center mb-4">
          <div className="w-48 h-48 border-2 border-gray-500 rounded-lg">
            {imgUrl !== "" ? (
              <img
                src={imgUrl}
                alt="Loading . . ."
                className="flex justify-center items-center w-full h-full rounded-md object-cover"
              />
            ) : (
              <img
                src={profile}
                alt="Default"
                className="flex justify-center items-center w-full h-full rounded-md object-cover"
              />
            )}
          </div>
        </div>

        <div className="flex justify-between text-base select-none mb-4">
          <div
            onClick={handleCancel}
            className="p-2 w-28 flex justify-center items-center rounded-md bg-[#323232] hover:bg-[#4a4a4a] cursor-pointer"
          >
            Cancel
          </div>
          <div
            onClick={handleSave}
            className="p-2 w-28 flex justify-center items-center rounded-md bg-[#323232] hover:bg-[#4a4a4a] cursor-pointer"
          >
            Save
          </div>
        </div>

        {error && (
          <div className="w-full flex justify-center">
            <div className="p-2 px-4 bg-[#323232] rounded-md">*{error}*</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePopup;
