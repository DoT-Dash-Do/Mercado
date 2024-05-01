import firebase from "firebase/compat/app";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

const firebaseConfig = {
  apiKey: "AIzaSyDcY7H-RZrUsBDRfi1ZKvBYWsVH23GxWIU",

  authDomain: "mercado-place.firebaseapp.com",

  projectId: "mercado-place",

  storageBucket: "mercado-place.appspot.com",

  messagingSenderId: "499596340086",

  appId: "1:499596340086:web:c894275974e76bef7ae857",
};

firebase.initializeApp(firebaseConfig);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
